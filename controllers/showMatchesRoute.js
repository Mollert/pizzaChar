
const express = require("express");
const request = require("request");
const router = express.Router();
const connection = require("../config/connection.js");


let outputMessage = ['First pick your preferences before clicking "Find your pizza!".', "Sorry, no match to your only preference.", "Sorry, no match to either of your preferences.", "Your single preference came up with this one match.", "Your single preference came up with these matches.", "Sorry, no match to your two preferences, but this match came up when using only your first preference.", "Sorry, no match to your two preferences, but these matches came up when using only your first preference.", "Sorry, no match to your two preferences, but this match came up when using only your second preference.", "Sorry, no match to your two preferences, but these matches came up when using only your second preference.", "Your two preferences came up with this match.", "Your two preferences came up with these matches.", "Sorry, no match to any of your preferences.", "Sorry, no match to your three preferences, but this match came up when using just your first two preference.", "Sorry, no match to your three preferences, but these matches came up when using just your first two preference.", "Sorry, no match to your three preferences, but this match came up when using your first and third preference.", "Sorry, no match to your three preferences, but these matches came up when using your first and third preference.", "Sorry, no match to your three preferences, but this match came up when using your second and third preference.", "Sorry, no match to your three preferences, but these matches came up when using your second and third preference.", "Sorry, no match to your three preferences, but this match came up when using only your first preference.", "Sorry, no match to your three preferences, but these matches came up when using only your first preference.", "Sorry, no match to your three preferences, but this match came up when using only your second preference.", "Sorry, no match to your three preferences, but these matches came up when using only your second preference.", "Sorry, no match to your three preferences, but this match came up when using only your third preference.", "Sorry, no match to your three preferences, but these matches came up when using only your third preference.", "Your three preferences came up with this match.", "Your three preferences came up with these matches."];

let recordChoices = [];
let resultsMessage = "";
let	oneChoice = "";
let	twoChoice = "";
let	threeChoice = "";
let allPizzerias = [];
let comments = [];
let outcome = [];


const translateChoice = (preference) => {
	switch (preference) {
		case "Crust: Thin center/Thin crust":
			translated = "thinThin";
			break;
		case "Crust: Thin center/Thick crust":
			translated = "thinThick";
			break;					
		case "Crust: Thick center/Thick crust":
			translated = "thickThick";
			break;
		case "Crust: Chewy":
			translated = "chewy";
			break;		
		case "Crust: Crisp":
			translated = "crisp";
			break;
		case "Crust: Tasty all by itself":
			translated = "tasty";
			break;		
		case "Crust: No taste at all":
			translated = "noTaste";
			break;
		case "Sauce: Chunky":
			translated = "sChunky";
			break;			
		case "Sauce: Liquid":
			translated = "sLiquid";
			break;
		case "Sauce: Heavy":
			translated = "sHeavy";
			break;
		case "Sauce: Light":
			translated = "sLight";
			break;
		case "Cheese: Light":
			translated = "cLight";
			break;		
		case "Cheese: Moderate":
			translated = "cModerate";
			break;
		case "Cheese: Heavy":
			translated = "cHeavy";
			break;
		case "Oven: Wood":
			translated = "oWood";
			break;
		case "Oven: Gas flame":
			translated = "oGas";
			break;
		case "Oven: Electric":
			translated = "oElectric";
			break;
		case "Oven: Grill":		
			translated = "oGrill";
			break;
		case "By the slice":
			translated = "slice";
			break;
		default:
			break;
	}
	return translated;
};

const removeDuplicates = (places, details) => {
	for ( let i = 1 ; i < details.length ; i++ ) {
		let match = true;
		for ( let j = 0 ; j < places.length ; j++ ) {						
			if (details[i]["pizzeriaId"] === places[j]) {
				match = false;
			}						
		}
		if (match) {
			places.push(details[i]["pizzeriaId"]);						
		}
	}

	return places;
};

const randomizeSolutions = (defaultArray) => {
	if (defaultArray.length === 0 || defaultArray.length === 1) {
		return defaultArray;
	}
			
	let randomizedArray = [];
	let originalLength = defaultArray.length;

	for ( let i = 1 ; i < originalLength ; i++ ) {
		let subtracter = Math.floor((Math.random() * defaultArray.length));
		randomizedArray.push(defaultArray[subtracter]);
		defaultArray.splice(subtracter, 1);
	}
	randomizedArray.push(defaultArray[0]);

	return randomizedArray;
};

const orgDataForDisplay = (places, details, biz) => {
	places.forEach(step => {
		comments = [];
		details.forEach(slot => {
			if (slot["pizzeriaId"] === step && slot["comment"] !== null && comments.length < 3) {
				comments.push( {
					date: slot["date"],
					comment: slot["comment"]
				});							
			}
		});
		biz.forEach(event => {
			if (event["placeId"] === step) {
				outcome.push( {
					name: event["name"],
					website: event["website"],
					comments: comments
				});
			}			
		});
	});

	return outcome;
};

// Shows pizzerias that match preferences
router.post("/", function(req, res) {

	res.locals.metaTag = {
		title: "Here are the pizzerias that match your chosen preferences",
		content: "The listed pizzerias match your preferences and reading the comments from others may also help in finding a local pizzeria.",
		link: "/css/findPizzeria.css"
	};

	recordChoices = [];
	resultsMessage = "";
	oneChoice = "";
	twoChoice = "";
	threeChoice = "";
	allPizzerias = [];
	comments = [];	
	outcome = [];

	let userChoices = JSON.parse(JSON.stringify(req.body));

	let tag = ["first", "second", "third"];
	for ( let i = 0 ; i < 3 ; i++ ) {
		if (((req.body[tag[i]]).indexOf("preference")) === -1) {
			recordChoices.push(req.body[tag[i]]);		
		}
	}

//console.log(userChoices);	
//console.log(recordChoices);

	if (recordChoices.length === 0) {
		resultsMessage = outputMessage[0];
		res.render("findPizzeria", {resultsMessage, userChoices});	
	}

	if (recordChoices.length === 1) {

		oneChoice = translateChoice(recordChoices[0]);
//		console.log(oneChoice);

		let queryString = `SELECT pizzeriaId, date, comment FROM reports WHERE ${oneChoice} = 1`;
		connection.query(queryString, (error, product, fields) => {
			if (error) {
				console.log(error);	
			}
			if (product.length === 0) {
				resultsMessage = outputMessage[1];
				res.render("findPizzeria", {resultsMessage, userChoices});					
			}
			if (product.length > 0) {
				allPizzerias.push(product[0]["pizzeriaId"]);
				removeDuplicates(allPizzerias, product);
				if (allPizzerias.length === 1) {
					resultsMessage = outputMessage[3];
				} else {
					resultsMessage = outputMessage[4];
				}							
//	console.log(allPizzerias);
				allPizzerias = randomizeSolutions(allPizzerias);
//	console.log(allPizzerias);
//	console.log(resultsMessage);
				let queryString = "SELECT placeId, name, website FROM pizzerias WHERE placeId IN (?)";
				connection.query(queryString, [allPizzerias], (error, reaction, fields) => {
					if (error) {
						console.log(error);	
					}
//					console.log(reaction);
//					console.log(product);
					orgDataForDisplay(allPizzerias, product, reaction);
					res.render("findPizzeria", {resultsMessage, outcome, userChoices});						
				});
			}
		});
	}

	if (recordChoices.length === 2) {

		oneChoice = translateChoice(recordChoices[0]);
		twoChoice = translateChoice(recordChoices[1]);

		let queryString = `SELECT pizzeriaId, date, comment FROM reports WHERE ${oneChoice} = 1 AND ${twoChoice} = 1`;
		connection.query(queryString, (error, product, fields) => {
			if (error) {
				console.log(error);	
			}
			if (product.length === 0) {					
				let queryString = `SELECT pizzeriaId, date, comment FROM reports WHERE ${oneChoice} = 1`;
				connection.query(queryString, (error, productt, fields) => {
					if (error) {
						console.log(error);
					}			
					if (productt.length === 0) {
						let queryString = `SELECT pizzeriaId, date, comment FROM reports WHERE ${twoChoice} = 1`;
						connection.query(queryString, (error, producttt, fields) => {
							if (error) {
								console.log(error);
							}
							if (producttt.length === 0) {
								resultsMessage = outputMessage[2];
								res.render("findPizzeria", {resultsMessage, userChoices});									
							}
							if (producttt.length > 0) {	
								allPizzerias.push(producttt[0]["pizzeriaId"]);
								removeDuplicates(allPizzerias, producttt);
								if (allPizzerias.length === 1) {
									resultsMessage = outputMessage[7];
								} else {
									resultsMessage = outputMessage[8];
								}
								allPizzerias = randomizeSolutions(allPizzerias);
								let queryString = "SELECT placeId, name, website FROM pizzerias WHERE placeId IN (?)";	
								connection.query(queryString, [allPizzerias], (error, reaction, fields) => {
									if (error) {
										console.log(error);	
									}
									orgDataForDisplay(allPizzerias, producttt, reaction);
									res.render("findPizzeria", {resultsMessage, outcome, userChoices});											
								});
							}
						});
					}
					if (productt.length > 0) {
						allPizzerias.push(productt[0]["pizzeriaId"]);
						removeDuplicates(allPizzerias, productt);
						if (allPizzerias.length === 1) {
							resultsMessage = outputMessage[5];
						} else {
							resultsMessage = outputMessage[6];
						}
						allPizzerias = randomizeSolutions(allPizzerias);				
						let queryString = "SELECT placeId, name, website FROM pizzerias WHERE placeId IN (?)";					
						connection.query(queryString, [allPizzerias], (error, reaction, fields) => {
							if (error) {
								console.log(error);	
							}
							orgDataForDisplay(allPizzerias, productt, reaction);
							res.render("findPizzeria", {resultsMessage, outcome, userChoices});								
						});						
					}
				});
			}
			if (product.length > 0) {
				allPizzerias.push(product[0]["pizzeriaId"]);
				removeDuplicates(allPizzerias, product);
				if (allPizzerias.length === 1) {
					resultsMessage = outputMessage[9];
					let queryString = "SELECT placeId, name, website FROM pizzerias WHERE placeId IN (?)";					
					connection.query(queryString, [allPizzerias], (error, reaction, fields) => {
						if (error) {
							console.log(error);	
						}
						orgDataForDisplay(allPizzerias, product, reaction);
						res.render("findPizzeria", {resultsMessage, outcome, userChoices});								
					});
				} else {
					resultsMessage = outputMessage[10];
					allPizzerias = randomizeSolutions(allPizzerias);
					let queryString = "SELECT placeId, name, website FROM pizzerias WHERE placeId IN (?)";	
					connection.query(queryString, [allPizzerias], (error, reaction, fields) => {
						if (error) {
							console.log(error);	
						}
						orgDataForDisplay(allPizzerias, product, reaction);
						res.render("findPizzeria", {resultsMessage, outcome, userChoices});								
					});
				}
			}
		});		
	}

	if (recordChoices.length === 3) {

		oneChoice = translateChoice(recordChoices[0]);
		twoChoice = translateChoice(recordChoices[1]);
		threeChoice = translateChoice(recordChoices[2]);		

		let queryString = `SELECT pizzeriaId, date, comment FROM reports WHERE ${oneChoice} = 1 AND ${twoChoice} = 1 AND ${threeChoice} = 1`;
		connection.query(queryString, (error, product, fields) => {
			if (error) {
				console.log(error);	
			}
			if (product.length === 0) {				
				let queryString = `SELECT pizzeriaId, date, comment FROM reports WHERE ${oneChoice} = 1 AND ${twoChoice} = 1`;
				connection.query(queryString, (error, productt, fields) => {
					if (error) {
						console.log(error);	
					}
					if (productt.length === 0) {					
						let queryString = `SELECT pizzeriaId, date, comment FROM reports WHERE ${oneChoice} = 1 AND ${threeChoice} = 1`;
						connection.query(queryString, (error, producttt, fields) => {
							if (error) {
								console.log(error);
							}
							if (producttt.length === 0) {
								let queryString = `SELECT pizzeriaId, date, comment FROM reports WHERE ${twoChoice} = 1 AND ${threeChoice} = 1`;
								connection.query(queryString, (error, productttt, fields) => {
									if (error) {
										console.log(error);
									}
									if (productttt.length === 0) {
										let queryString = `SELECT pizzeriaId, date, comment FROM reports WHERE ${oneChoice} = 1`;
										connection.query(queryString, (error, producttttt, fields) => {
											if (error) {
												console.log(error);
											}
											if (producttttt.length === 0) {					
												let queryString = `SELECT pizzeriaId, date, comment FROM reports WHERE ${twoChoice} = 1`;
												connection.query(queryString, (error, productttttt, fields) => {
													if (error) {
														console.log(error);
													}			
													if (productttttt.length === 0) {
														let queryString = `SELECT pizzeriaId, date, comment FROM reports WHERE ${threeChoice} = 1`;
														connection.query(queryString, (error, producttttttt, fields) => {
															if (error) {
																console.log(error);
															}
															if (producttttttt.length === 0) {
																resultsMessage = outputMessage[11];
																res.render("findPizzeria", {resultsMessage, userChoices});									
															}
															if (producttttttt.length > 0) {	
																allPizzerias.push(producttttttt[0]["pizzeriaId"]);
																removeDuplicates(allPizzerias, producttttttt);
																if (allPizzerias.length === 1) {
																	resultsMessage = outputMessage[22];
																} else {
																	resultsMessage = outputMessage[23];
																}
																allPizzerias = randomizeSolutions(allPizzerias);
																let queryString = "SELECT placeId, name, website FROM pizzerias WHERE placeId IN (?)";	
																connection.query(queryString, [allPizzerias], (error, reaction, fields) => {
																	if (error) {
																		console.log(error);	
																	}
																	orgDataForDisplay(allPizzerias, producttttttt, reaction);
																	res.render("findPizzeria", {resultsMessage, outcome, userChoices});											
																});
															}
														});
													}
													if (productttttt.length > 0) {	
														allPizzerias.push(productttttt[0]["pizzeriaId"]);
														removeDuplicates(allPizzerias, productttttt);
														if (allPizzerias.length === 1) {
															resultsMessage = outputMessage[20];
														} else {
															resultsMessage = outputMessage[21];
														}
														allPizzerias = randomizeSolutions(allPizzerias);
														let queryString = "SELECT placeId, name, website FROM pizzerias WHERE placeId IN (?)";	
														connection.query(queryString, [allPizzerias], (error, reaction, fields) => {
															if (error) {
																console.log(error);	
															}
															orgDataForDisplay(allPizzerias, productttttt, reaction);
															res.render("findPizzeria", {resultsMessage, outcome, userChoices});											
														});
													}
												});
											}
											if (producttttt.length > 0) {	
												allPizzerias.push(producttttt[0]["pizzeriaId"]);
												removeDuplicates(allPizzerias, producttttt);
												if (allPizzerias.length === 1) {
													resultsMessage = outputMessage[18];
												} else {
													resultsMessage = outputMessage[19];
												}
												allPizzerias = randomizeSolutions(allPizzerias);
												let queryString = "SELECT placeId, name, website FROM pizzerias WHERE placeId IN (?)";	
												connection.query(queryString, [allPizzerias], (error, reaction, fields) => {
													if (error) {
														console.log(error);	
													}
													orgDataForDisplay(allPizzerias, producttttt, reaction);
													res.render("findPizzeria", {resultsMessage, outcome, userChoices});											
												});
											}
										});
									}
									if (productttt.length > 0) {	
										allPizzerias.push(productttt[0]["pizzeriaId"]);
										removeDuplicates(allPizzerias, productttt);
										if (allPizzerias.length === 1) {
											resultsMessage = outputMessage[16];
										} else {
											resultsMessage = outputMessage[17];
										}
										allPizzerias = randomizeSolutions(allPizzerias);
										let queryString = "SELECT placeId, name, website FROM pizzerias WHERE placeId IN (?)";	
										connection.query(queryString, [allPizzerias], (error, reaction, fields) => {
											if (error) {
												console.log(error);	
											}
											orgDataForDisplay(allPizzerias, productttt, reaction);
											res.render("findPizzeria", {resultsMessage, outcome, userChoices});											
										});
									}
								});
							}
							if (producttt.length > 0) {	
								allPizzerias.push(producttt[0]["pizzeriaId"]);
								removeDuplicates(allPizzerias, producttt);
								if (allPizzerias.length === 1) {
									resultsMessage = outputMessage[14];
								} else {
									resultsMessage = outputMessage[15];
								}
								allPizzerias = randomizeSolutions(allPizzerias);
								let queryString = "SELECT placeId, name, website FROM pizzerias WHERE placeId IN (?)";	
								connection.query(queryString, [allPizzerias], (error, reaction, fields) => {
									if (error) {
										console.log(error);	
									}
									orgDataForDisplay(allPizzerias, producttt, reaction);
									res.render("findPizzeria", {resultsMessage, outcome, userChoices});											
								});
							}
						});
					}
					if (productt.length > 0) {	
						allPizzerias.push(productt[0]["pizzeriaId"]);
						removeDuplicates(allPizzerias, productt);
						if (allPizzerias.length === 1) {
							resultsMessage = outputMessage[12];
						} else {
							resultsMessage = outputMessage[13];
						}
						allPizzerias = randomizeSolutions(allPizzerias);
						let queryString = "SELECT placeId, name, website FROM pizzerias WHERE placeId IN (?)";	
						connection.query(queryString, [allPizzerias], (error, reaction, fields) => {
							if (error) {
								console.log(error);	
							}
							orgDataForDisplay(allPizzerias, productt, reaction);
							res.render("findPizzeria", {resultsMessage, outcome, userChoices});											
						});
					}
				});
			}
			if (product.length > 0) {	
				allPizzerias.push(product[0]["pizzeriaId"]);
				removeDuplicates(allPizzerias, product);
				if (allPizzerias.length === 1) {
					resultsMessage = outputMessage[24];
				} else {
					resultsMessage = outputMessage[25];
				}
				allPizzerias = randomizeSolutions(allPizzerias);
				let queryString = "SELECT placeId, name, website FROM pizzerias WHERE placeId IN (?)";	
				connection.query(queryString, [allPizzerias], (error, reaction, fields) => {
					if (error) {
						console.log(error);	
					}
					orgDataForDisplay(allPizzerias, product, reaction);
					res.render("findPizzeria", {resultsMessage, outcome, userChoices});											
				});
			}
		});
	}
});


module.exports = router;