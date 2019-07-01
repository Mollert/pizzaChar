
const express = require("express");
const request = require("request");
const router = express.Router();

const outputMessage = require("../data/outputMessage.js");
const reports = require("../data/reports.js");
const pizzerias = require("../data/pizzerias.js");

let recordChoices = [];
let allPizzerias = [];
let outcome = [];
let comments = [];
let resultsMessage = "";
let commonTwo = [];
let commonThree = [];
let commonTwo01 = [];
let commonTwo02 = [];
let commonTwo12 = [];



const reorderSolutions = (unorderedArray) => {
	if (unorderedArray.length === 0 || unorderedArray.length === 1) {
		return unorderedArray;
	}
	let addedTogether = "";
	let capLetters = [];
	let orderedArray = [];
	unorderedArray.forEach (idNum => {
		pizzerias.forEach(entry => {
			if (entry.id === idNum) {
				addedTogether = entry.name;
				addedTogether += "#";
				addedTogether += idNum;
				capLetters.push(addedTogether);				
			}
		});
	});
	capLetters.sort();
	capLetters.forEach (toID => {
		orderedArray.push(Number(toID.substring(toID.indexOf("#")+1)));
	});
//	console.log(orderedArray);
	return orderedArray;		
};

const gatherDataForDisplay = (dataArray) => {
	dataArray.forEach(step => {
		comments = [];
		reports.forEach(slot => {		
			if (slot["pizzeria id"] === step && comments.length < 3) {
				comments.push( {
					date: slot["date"],
					comment: slot["comment"]
				});
			};
		});
//		console.log(comments);
		outcome.push( {
			name: pizzerias[step]["name"],
			website: pizzerias[step]["website"],
			comments: comments
		});
//		console.log(outcome);		
	});
};

const orgAndPackage = (what) => {
	what = reorderSolutions(what);
	gatherDataForDisplay(what);
};


// Shows pizzerias that match preferences
router.post("/", function(req, res) {

	recordChoices = [];
	allPizzerias = [];
	outcome = [];
	comments = [];
	resultsMessage = "";
	commonTwo = [];
	commonThree = [];
	commonTwo01 = [];
	commonTwo02 = [];
	commonTwo12 = [];


	let userChoices = JSON.parse(JSON.stringify(req.body));

	let tag = ["first", "second", "third"];
	for ( let i = 0 ; i < 3 ; i++ ) {
		if (((req.body[tag[i]]).indexOf("preference")) === -1) {
			recordChoices.push(req.body[tag[i]]);		
		}
	}

	if (recordChoices.length === 0) {
		resultsMessage = outputMessage[0]["message"];
	}

	recordChoices.forEach(choice => {
		let interimArray = [];
		reports.forEach(item => {
			if (item[choice]) {
				if (interimArray.length === 0) {
					interimArray.push(item["pizzeria id"]);
				} else {
					if (interimArray.length === 1) {
						if (!(interimArray[0] === item["pizzeria id"])) {
							interimArray.push(item["pizzeria id"]);
						}
					} else {
						for (let i = 0 ; i < interimArray.length ; i++) {
							if (interimArray[i] === item["pizzeria id"]) {
								i = interimArray.length;
							} else {
								if ((i+1) === interimArray.length) {							
									interimArray.push(item["pizzeria id"]);
								}
							}
						}
					}
				}
			}
		});
		allPizzerias.push(interimArray);
	});
/*
	console.log(allPizzerias);
	allPizzerias[0] = reorderSolutions(allPizzerias[0]);
	console.log(allPizzerias[0]);
	console.log(recordChoices);
*/
	if (recordChoices.length === 1) {

		if (allPizzerias[0].length === 0) {
			resultsMessage = outputMessage[1]["message"];
		} else if (allPizzerias[0].length === 1) {
			resultsMessage = outputMessage[3]["message"];
		} else {
			resultsMessage = outputMessage[4]["message"];
		}
		if (allPizzerias[0].length > 0) {
			orgAndPackage(allPizzerias[0]);		
		}
	};

	if (recordChoices.length === 2) {

		if (allPizzerias[0].length === 0 && allPizzerias[1].length === 0) {
			resultsMessage = outputMessage[2]["message"];
		} else {
			if (allPizzerias[0].length === 0) {
				if (allPizzerias[1].length === 1) {
					resultsMessage = outputMessage[7]["message"];
				} else {
					resultsMessage = outputMessage[8]["message"];
				}
				orgAndPackage(allPizzerias[1]);
			} else {			
				if (allPizzerias[1].length === 0) {
					if (allPizzerias[0].length === 1) {
						resultsMessage = outputMessage[5]["message"];
					} else {
						resultsMessage = outputMessage[6]["message"];
					}
					orgAndPackage(allPizzerias[0]);
				} else {
					for (let i = 0 ; i < allPizzerias[0].length ; i++) {
						for (let j = 0 ; j < allPizzerias[1].length ; j++) {
							if (allPizzerias[0][i] === allPizzerias[1][j]) {
								commonTwo.push(allPizzerias[0][i]);
							}
						}
					}
					if (commonTwo.length === 0) {			
						if (allPizzerias[0].length === 1) {
							resultsMessage = outputMessage[5]["message"];
						} else {
							resultsMessage = outputMessage[6]["message"];
						}
						orgAndPackage(allPizzerias[0]);
					}
					if (commonTwo.length === 1) {
						resultsMessage = outputMessage[9]["message"];
					} else {
						resultsMessage = outputMessage[10]["message"];						
					}
					orgAndPackage(commonTwo);						
				}
			}
		}
//		console.log(commonTwo);
	};

	if (recordChoices.length === 3) {

		if (allPizzerias[0].length === 0 && allPizzerias[1].length === 0 && allPizzerias[2].length === 0) {
			resultsMessage = outputMessage[2]["message"];
		} else {
			if (allPizzerias[1].length === 0 && allPizzerias[2].length === 0) {
				if (allPizzerias[0].length === 1) {
					resultsMessage = outputMessage[17]["message"];
				} else {
					resultsMessage = outputMessage[18]["message"];
				}
				orgAndPackage(allPizzerias[0]);
//				console.log(205);
			}
			if (allPizzerias[0].length === 0 && allPizzerias[2].length === 0) {
				if (allPizzerias[1].length === 1) {
					resultsMessage= outputMessage[19]["message"];
				} else {
					resultsMessage = outputMessage[20]["message"];
				}
				orgAndSend(allPizzerias[1]);
//				console.log(214);
			}
			if (allPizzerias[0].length === 0 && allPizzerias[1].length === 0) {
				if (allPizzerias[2].length === 1) {
					resultsMessage = outputMessage[21]["message"];
				} else {
					resultsMessage = outputMessage[22]["message"];
				}
				orgAndPackage(allPizzerias[2]);
//				console.log(223);
			}
			if (allPizzerias[0].length !== 0 && allPizzerias[1].length !== 0 && allPizzerias[2].length === 0) {
				for (let i = 0 ; i < allPizzerias[0].length ; i++) {
					for (let j = 0 ; j < allPizzerias[1].length ; j++) {
						if (allPizzerias[0][i] === allPizzerias[1][j]) {
							commonTwo.push(allPizzerias[0][i]);
						}
					}
				}
				if (commonTwo.length === 0) {
					if (allPizzerias[0].length === 1) {
						resultsMessage = outputMessage[17]["message"];
					} else {
						resultsMessage = outputMessage[18]["message"];
					}
					orgAndPackage(allPizzerias[0]);
//					console.log(240);
				} else {
					if (commonTwo.length === 1) {
						resultMessage = outputMessage[11]["message"];
					} else {
						resultsMessage = outputMessage[12]["message"];
					}
					orgAndPackage(commonTwo);
//					console.log(248);											
				}
			}
			if (allPizzerias[0].length !== 0 && allPizzerias[1].length === 0 && allPizzerias[2].length !== 0) {
				for (let i = 0 ; i < allPizzerias[0].length ; i++) {
					for (let j = 0 ; j < allPizzerias[2].length ; j++) {
						if (allPizzerias[0][i] === allPizzerias[2][j]) {
							commonTwo.push(allPizzerias[0][i]);
						}
					}
				}
				if (commonTwo.length === 0) {
					if (allPizzerias[0].length === 1) {
						resultsMessage = outputMessage[17]["message"];
					} else {
						resultsMessage = outputMessage[18]["message"];
					}
					orgAndPackage(allPizzerias[0]);
//					console.log(266);
				} else {
					if (commonTwo.length === 1) {
						resultsMessage = outputMessage[13]["message"];
					} else {
						resultsMessage = outputMessage[14]["message"];
					}
					orgAndPackage(commonTwo);
//					console.log(274);
				}
			}
			if (allPizzerias[0].length === 0 && allPizzerias[1].length !== 0 && allPizzerias[2].length !== 0) {
				for (let i = 0 ; i < allPizzerias[1].length ; i++) {
					for (let j = 0 ; j < allPizzerias[2].length ; j++) {
						if (allPizzerias[1][i] === allPizzerias[2][j]) {
							commonTwo.push(allPizzerias[1][i]);
						}
					}
				}
				if (commonTwo.length === 0) {
					if (allPizzerias[1].length === 1) {
						resultsMessage = outputMessage[19]["message"];
					} else {
						resultsMessage = outputMessage[20]["message"];
					}
					orgAndPackage(allPizzerias[1]);
//					console.log(292);
				} else {
					if (commonTwo.length === 1) {
						resultsMessage = outputMessage[15]["message"];
					} else {
						resultsMessage = outputMessage[16]["message"];
					}
					orgAndPackage(commonTwo);
//					console.log(300);
				}
			} else {
				for (let i = 0 ; i < allPizzerias[0].length ; i++) {
					for (let j = 0 ; j < allPizzerias[1].length ; j++) {
						for (let k = 0 ; k < allPizzerias[2].length ; k++) {					
							if (allPizzerias[0][i] === allPizzerias[1][j] && allPizzerias[0][i] === allPizzerias[2][k]) {
								commonThree.push(allPizzerias[0][i]);
							}
						}
					}
				}
				if (commonThree.length === 0) {
					for (let i = 0 ; i < allPizzerias[0].length ; i++) {
						for (let j = 0 ; j < allPizzerias[1].length ; j++) {
							if (allPizzerias[0][i] === allPizzerias[1][j]) {
								commonTwo01.push(allPizzerias[0][i]);
							}
						}
					}
					if (commonTwo01.length) {
						if (commonTwo01.length === 1) {
							resultsMessage = outputMessage[11]["message"];
						} else {
							resultsMessage = outputMessage[12]["message"];
						}
						orgAndPackage(commonTwo01);
	//					console.log(327);						
					}
					for (let i = 0 ; i < allPizzerias[0].length ; i++) {
						for (let j = 0 ; j < allPizzerias[2].length ; j++) {
							if (allPizzerias[0][i] === allPizzerias[2][j]) {
								commonTwo02.push(allPizzerias[0][i]);
							}
						}
					}
					if (commonTwo02.length && commonTwo01.length === 0) {
						if (commonTwo.length02 === 1) {
							resultsMessage = outputMessage[13]["message"];
						} else {
							resultsMessage = outputMessage[14]["message"];
						}
						orgAndPackage(commonTwo02);
//						console.log(343);
					}
					for (let i = 0 ; i < allPizzerias[1].length ; i++) {
						for (let j = 0 ; j < allPizzerias[2].length ; j++) {
							if (allPizzerias[1][i] === allPizzerias[2][j]) {
								commonTwo12.push(allPizzerias[1][i]);
							}
						}
					}
					if (commonTwo12.length && commonTwo01.length === 0 && commonTwo02.length === 0) {
						if (commonTwo12.length === 1) {
							resultsMessage = outputMessage[15]["message"];
						} else {
							resultsMessage = outputMessage[16]["message"];
						}
						orgAndPackage(commonTwo12);
//						console.log(359);
					}
					if (commonTwo01.length === 0 && commonTwo02.length === 0 && commonTwo12.length === 0) {
						if (allPizzerias[0].length === 1) {
							resultsMessage = outputMessage[17]["message"];
						} else {
							resultsMessage = outputMessage[18]["message"];
						}
						orgAndPackage(allPizzerias[0]);
//						console.log(368);
					}
				} else {
					if (commonThree.length === 1) {
						resultsMessage = outputMessage[23]["message"];
					} else {
						resultsMessage = outputMessage[24]["message"];
					}
					orgAndPackage(commonThree);
//					console.log(377);
				}
			}
		}
	};

	res.locals.metaTag = {
		title: "Here are the pizzerias that match your chosen preferences",
		content: "The listed pizzerias match your preferences and reading the comments from others may also help in finding a local pizzeria.",
		link: "/css/findPizzeria.css"
	};


	res.render("findPizzeria", {resultsMessage, outcome, userChoices});
});


module.exports = router;