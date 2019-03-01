
let firstRemoval = [];
let secondRemoval = [];
let thirdRemoval = [];

const loadOptions = (remove, where) => {	
	selections.forEach(item => {
		if (!(remove.includes(item.choice))) {
			let choiceOption = document.createElement("option");
			let optionText = document.createTextNode(item.choice);
			choiceOption.appendChild(optionText);
//			console.log(choiceOption);
			document.getElementById(where).appendChild(choiceOption);
		}
	});
};

const removeGroup = (remove, whichArray) => {
	switch (remove) {
		case "Crust: Thin center/Thin crust":
		case "Crust: Thin center/Thick crust":
		case "Crust: Thick center/Thick crust":
			whichArray.push("Crust: Thin center/Thin crust", "Crust: Thin center/Thick crust", "Crust: Thick center/Thick crust");
			break;
		case "Crust: Chewy":
		case "Crust: Crisp":
			whichArray.push("Crust: Chewy", "Crust: Crisp");
			break;
		case "Crust: Tasty all by itself":
		case "Crust: No taste at all":
			whichArray.push("Crust: Tasty all by itself", "Crust: No taste at all");
			break;
		case "Sauce: Chuncky":
		case "Sauce: Liquid":
			whichArray.push("Sauce: Chuncky", "Sauce: Liquid");
			break;
		case "Sauce: Heavy":
		case "Sauce: Light":
			whichArray.push("Sauce: Heavy", "Sauce: Light");
			break;
		case "Cheese: Light":
		case "Cheese: Moderate":
		case "Cheese: Heavy":
			whichArray.push("Cheese: Light", "Cheese: Moderate", "Cheese: Heavy");
			break;
		case "Oven: Wood":
		case "Oven: Gas flame":
		case "Oven: Electric":
		case "Oven: Grill":		
			whichArray.push("Oven: Wood", "Oven: Gas flame", "Oven: Electric", "Oven: Grill");
			break;
		case "By the slice":
			whichArray.push("By the slice");
			break;							
		default:
			break;
	}
	return whichArray;
};

window.onload = () => {
	loadOptions(firstRemoval, "firstChoice");
//	console.log(document.body.scrollHeight);
};

document.getElementById("firstChoice").addEventListener("click", () => {
//	console.log(event);
//	console.log(event.target.value);
//	console.log(event.detail);

	if(!(event.detail)) {
		firstRemoval = [];
		secondRemoval = [];
		thirdRemoval = [];
		document.getElementById("secondChoice").options.length = 1;
		document.getElementById("thirdChoice").options.length = 1;

		removeGroup(event.target.value, firstRemoval);
//		console.log(firstRemoval);
		loadOptions(firstRemoval, "secondChoice");
	}
});

document.getElementById("secondChoice").addEventListener("click", () => {

	if(!(event.detail)) {
		secondRemoval = [];
		thirdRemoval = [];
		document.getElementById("thirdChoice").options.length = 1;

		removeGroup(event.target.value, secondRemoval);
//		console.log(secondRemoval);
		thirdRemoval = firstRemoval.concat(secondRemoval);
//		console.log(thirdRemoval);		
		loadOptions(thirdRemoval, "thirdChoice");
	}
});


let resultsMessage = "";
let recordChoices = [];
let allPizzerias = [];
let placesWebsitesComments = [];
let commonTwo = [];
let commonThree = [];

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

const postSolutions = (solutionArray) => {
	for (let i = 0 ; i < solutionArray.length ; i+=3 ) {
		let venueDiv = document.createElement("div");
		venueDiv.setAttribute("class", "venue");
		let venueText = document.createTextNode(solutionArray[i] + ": ");
		venueDiv.appendChild(venueText);
		let venueA = document.createElement("a");
		venueA.href = solutionArray[i+1];
		venueA.textContent = solutionArray[i+1];
		venueDiv.appendChild(venueA);
//		console.log(venueDiv);
		let commentDiv = document.createElement("div");
		commentDiv.setAttribute("class", "allComments");
		for (let j = 0 ; j < solutionArray[i+2].length ; j+=2) {

			let oneCommentDiv = document.createElement("div");
			oneCommentDiv.setAttribute("class", "oneComment");

			let dateCommentDiv = document.createElement("div");
			dateCommentDiv.setAttribute("class", "dateComment");
			let dateCommentText = document.createTextNode("Comment:");
			dateCommentDiv.appendChild(dateCommentText);

			let dateCommentSpan = document.createElement("span");
			dateCommentSpan.setAttribute("class", "date");
			let spanText = document.createTextNode(solutionArray[i+2][j]);
			dateCommentSpan.appendChild(spanText);
			dateCommentDiv.appendChild(dateCommentSpan);

			oneCommentDiv.appendChild(dateCommentDiv);				
		
			let commentOnlyDiv = document.createElement("div");
			commentOnlyDiv.setAttribute("class", "comment");
			let commentText = document.createTextNode(solutionArray[i+2][j+1]);
			commentOnlyDiv.appendChild(commentText);

			oneCommentDiv.appendChild(commentOnlyDiv);

			commentDiv.appendChild(oneCommentDiv);			
		};
		venueDiv.appendChild(commentDiv);

		document.getElementById("searchResults").appendChild(venueDiv);
	};
	let heightDiff = (document.body.scrollHeight) - 768;
	let newHeight = parseInt(48 + (heightDiff / 16) + 3);	
	let updatedHeight = newHeight + "rem";
	document.getElementById("brickWall").style.height = updatedHeight;
};

const gatherDataForDisplay = (dataArray) => {
	dataArray.forEach(equal => {
		let addDateComments = [];			
		placesWebsitesComments.push(pizzerias[equal]["name"]);
		placesWebsitesComments.push(pizzerias[equal]["website"]);
		reports.forEach(entry => {				
			if (entry["pizzeria id"] === equal && addDateComments.length < 3) {
				addDateComments.push(entry["date"]);									
				addDateComments.push(entry["comments"]);
			}	
		});
		placesWebsitesComments.push(addDateComments);			
	});
	return placesWebsitesComments;
};

const orgAndSend = (num) => {
	allPizzerias[num] = reorderSolutions(allPizzerias[num]);
	postSolutions(gatherDataForDisplay(allPizzerias[num]));
};


document.getElementById("findPizzaButton").addEventListener("click", () => {
	event.preventDefault();
	let grabChoices = document.getElementById("requestFind").elements;
//	console.log(grabChoices);
	for (let i = 0 ; i < 3 ; i++) {
		if (!(grabChoices[i].value.includes("preference"))) {
			recordChoices.push(grabChoices[i].value);
		}		
	};
//	console.log(recordChoices);
	if (recordChoices.length === 0) {
		document.getElementById("explainSearch").textContent = outputMessage[0]["message"];		
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

	console.log(allPizzerias);
//	allPizzerias[0] = reorderSolutions(allPizzerias[0]);
//	console.log(allPizzerias[0]);
	console.log(recordChoices);

	if (recordChoices.length === 1) {
		if (allPizzerias[0].length === 0) {
			document.getElementById("explainSearch").textContent = outputMessage[1]["message"];
		} else {
			if (allPizzerias[0].length === 1) {
				document.getElementById("explainSearch").textContent = outputMessage[3]["message"];
			} else {
				document.getElementById("explainSearch").textContent = outputMessage[4]["message"];
			}
		}
		if (allPizzerias[0].length > 0) {
			orgAndSend(0);
		}
	};

	if (recordChoices.length === 2) {

		if (allPizzerias[0].length === 0 && allPizzerias[1].length === 0) {
			document.getElementById("explainSearch").textContent = outputMessage[2]["message"];
		} else {
			if (allPizzerias[0].length === 0) {
				if (allPizzerias[1].length === 1) {
					document.getElementById("explainSearch").textContent = outputMessage[7]["message"];
				} else {
					document.getElementById("explainSearch").textContent = outputMessage[8]["message"];
				}
				orgAndSend(1);
			} else {			
				if (allPizzerias[1].length === 0) {
					if (allPizzerias[0].length === 1) {
						document.getElementById("explainSearch").textContent = outputMessage[5]["message"];
					} else {
						document.getElementById("explainSearch").textContent = outputMessage[6]["message"];
					}
					orgAndSend(0);
				} else {
					for (let i = 0 ; i < allPizzerias[0].length ; i++) {
						for (let j = 0 ; j < allPizzerias[1].length ; j++) {
							if (allPizzerias[0][i] === allPizzerias[1][j]) {
								commonTwo.push(allPizzerias[0][i]);
							}
						}
					}
					if (commonTwo.length === 0) {			
						if (allPizzerias[0].length) {
							if (allPizzerias[0].length === 1) {
								document.getElementById("explainSearch").textContent = outputMessage[5]["message"];
							} else {
								document.getElementById("explainSearch").textContent = outputMessage[6]["message"];
							}
							orgAndSend(0);
						} else {
							if (allPizzerias[1].length === 1) {
								document.getElementById("explainSearch").textContent = outputMessage[7]["message"];
							} else {
								document.getElementById("explainSearch").textContent = outputMessage[8]["message"];
							}
							orgAndSend(1);
						}
					}
					if (commonTwo.length === 1) {
						document.getElementById("explainSearch").textContent = outputMessage[9]["message"];
						commonTwo = reorderSolutions(commonTwo);
						postSolutions(gatherDataForDisplay(commonTwo));
					} else {
						document.getElementById("explainSearch").textContent = outputMessage[10]["message"];
						commonTwo = reorderSolutions(commonTwo);
						postSolutions(gatherDataForDisplay(commonTwo));								
					}
				}
			}
		}
//		console.log(commonTwo);
	};

	if (recordChoices.length === 3) {

		if (allPizzerias[0].length === 0 && allPizzerias[1].length === 0 && allPizzerias[2].length === 0) {
			document.getElementById("explainSearch").textContent = outputMessage[2]["message"];
		} else {
			if (allPizzerias[1].length === 0 && allPizzerias[2].length === 0) {
				if (allPizzerias[0].length === 1) {
					document.getElementById("explainSearch").textContent = outputMessage[17]["message"];
				} else {
					document.getElementById("explainSearch").textContent = outputMessage[18]["message"];
				}
				orgAndSend(0);
			}
			if (allPizzerias[0].length === 0 && allPizzerias[2].length === 0) {
				if (allPizzerias[1].length === 1) {
					document.getElementById("explainSearch").textContent = outputMessage[19]["message"];
				} else {
					document.getElementById("explainSearch").textContent = outputMessage[20]["message"];
				}
				orgAndSend(1);
			}
			if (allPizzerias[0].length === 0 && allPizzerias[1].length === 0) {
				if (allPizzerias[2].length === 1) {
					document.getElementById("explainSearch").textContent = outputMessage[21]["message"];
				} else {
					document.getElementById("explainSearch").textContent = outputMessage[22]["message"];
				}
				orgAndSend(2);
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
					if (allPizzerias[0].length) {
						if (allPizzerias[0].length === 1) {
							document.getElementById("explainSearch").textContent = outputMessage[17]["message"];
						} else {
							document.getElementById("explainSearch").textContent = outputMessage[18]["message"];
						}
						orgAndSend(0);
					} else {
						if (allPizzerias[1].length === 1) {
							document.getElementById("explainSearch").textContent = outputMessage[19]["message"];
						} else {
							document.getElementById("explainSearch").textContent = outputMessage[20]["message"];
						}
						orgAndSend(1);
					}
				} else {
					if (commonTwo.length === 1) {
						document.getElementById("explainSearch").textContent = outputMessage[11]["message"];
						commonTwo = reorderSolutions(commonTwo);
						postSolutions(gatherDataForDisplay(commonTwo));
					} else {
						document.getElementById("explainSearch").textContent = outputMessage[12]["message"];
						commonTwo = reorderSolutions(commonTwo);
						postSolutions(gatherDataForDisplay(commonTwo));								
					}
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
					if (allPizzerias[0].length) {
						if (allPizzerias[0].length === 1) {
							document.getElementById("explainSearch").textContent = outputMessage[17]["message"];
						} else {
							document.getElementById("explainSearch").textContent = outputMessage[18]["message"];
						}
						orgAndSend(0);
					} else {
						if (allPizzerias[2].length === 1) {
							document.getElementById("explainSearch").textContent = outputMessage[21]["message"];
						} else {
							document.getElementById("explainSearch").textContent = outputMessage[22]["message"];
						}
						orgAndSend(2);
					}
				} else {
					if (commonTwo.length === 1) {
						document.getElementById("explainSearch").textContent = outputMessage[13]["message"];
						commonTwo = reorderSolutions(commonTwo);
						postSolutions(gatherDataForDisplay(commonTwo));
					} else {
						document.getElementById("explainSearch").textContent = outputMessage[14]["message"];
						commonTwo = reorderSolutions(commonTwo);
						postSolutions(gatherDataForDisplay(commonTwo));								
					}
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
					if (allPizzerias[1].length) {
						if (allPizzerias[1].length === 1) {
							document.getElementById("explainSearch").textContent = outputMessage[19]["message"];
						} else {
							document.getElementById("explainSearch").textContent = outputMessage[20]["message"];
						}
						orgAndSend(1);
					} else {
						if (allPizzerias[2].length === 1) {
							document.getElementById("explainSearch").textContent = outputMessage[21]["message"];
						} else {
							document.getElementById("explainSearch").textContent = outputMessage[22]["message"];
						}
						orgAndSend(2);
					}
				} else {
					if (commonTwo.length === 1) {
						document.getElementById("explainSearch").textContent = outputMessage[15]["message"];
						commonTwo = reorderSolutions(commonTwo);
						postSolutions(gatherDataForDisplay(commonTwo));
					} else {
						document.getElementById("explainSearch").textContent = outputMessage[16]["message"];
						commonTwo = reorderSolutions(commonTwo);
						postSolutions(gatherDataForDisplay(commonTwo));								
					}
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
								commonTwo.push(allPizzerias[0][i]);
							}
						}
					}
					if (commonTwo.length) {
						if (commonTwo.length === 1) {
							document.getElementById("explainSearch").textContent = outputMessage[11]["message"];
							commonTwo = reorderSolutions(commonTwo);
							postSolutions(gatherDataForDisplay(commonTwo));
						} else {
							document.getElementById("explainSearch").textContent = outputMessage[12]["message"];
							commonTwo = reorderSolutions(commonTwo);
							postSolutions(gatherDataForDisplay(commonTwo));								
						}
					}
					for (let i = 0 ; i < allPizzerias[0].length ; i++) {
						for (let j = 0 ; j < allPizzerias[2].length ; j++) {
							if (allPizzerias[0][i] === allPizzerias[2][j]) {
								commonTwo.push(allPizzerias[0][i]);
							}
						}
					}
					if (commonTwo.length) {
						if (commonTwo.length === 1) {
							document.getElementById("explainSearch").textContent = outputMessage[13]["message"];
							commonTwo = reorderSolutions(commonTwo);
							postSolutions(gatherDataForDisplay(commonTwo));
						} else {
							document.getElementById("explainSearch").textContent = outputMessage[14]["message"];
							commonTwo = reorderSolutions(commonTwo);
							postSolutions(gatherDataForDisplay(commonTwo));								
						}
					}
					for (let i = 0 ; i < allPizzerias[1].length ; i++) {
						for (let j = 0 ; j < allPizzerias[2].length ; j++) {
							if (allPizzerias[1][i] === allPizzerias[2][j]) {
								commonTwo.push(allPizzerias[1][i]);
							}
						}
					}
					if (commonTwo.length) {
						if (commonTwo.length === 1) {
							document.getElementById("explainSearch").textContent = outputMessage[15]["message"];
							commonTwo = reorderSolutions(commonTwo);
							postSolutions(gatherDataForDisplay(commonTwo));
						} else {
							document.getElementById("explainSearch").textContent = outputMessage[16]["message"];
							commonTwo = reorderSolutions(commonTwo);
							postSolutions(gatherDataForDisplay(commonTwo));								
						}
					}
					if (commonTwo.length === 0) {
						if (allPizzerias[0].length) {
							if (allPizzerias[0].length === 1) {
								document.getElementById("explainSearch").textContent = outputMessage[17]["message"];
							} else {
								document.getElementById("explainSearch").textContent = outputMessage[18]["message"];
							}
							orgAndSend(1);
						}
					}
				} else {
					if (commonThree.length === 1) {
						document.getElementById("explainSearch").textContent = outputMessage[23]["message"];
						commonThree = reorderSolutions(commonThree);
						postSolutions(gatherDataForDisplay(commonThree));
					} else {
						document.getElementById("explainSearch").textContent = outputMessage[24]["message"];
						commonThree = reorderSolutions(commonThree);
						postSolutions(gatherDataForDisplay(commonThree));								
					}
				}
			}
		}
	};
});

