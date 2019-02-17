
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



let recordChoices = [];
let firstPreference = [];
let secondPreference = [];
let thirdPreference = [];
let finalPreference = [];

document.getElementById("findPizzaButton").addEventListener("click", () => {
	event.preventDefault();
	let grabChoices = document.getElementById("requestFind").elements;
//	console.log(grabChoices);
	for ( let i = 0 ; i < 3 ; i++ ) {
		if (!(grabChoices[i].value.includes("preference"))) {
			recordChoices.push(grabChoices[i].value);
		}		
	}
//	console.log(recordChoices);

	if (recordChoices.length == 0) {
		document.getElementById("noSearch").style.display = "block";
		document.getElementById("headHome").style.display = "block";		
	}

	recordChoices.forEach(choice => {
		let createArray = [];
		reports.forEach(item => {
			if (item[choice]) {
				createArray.push(item["pizzeria id"]);
			}
		});
		finalPreference.push(createArray);		
	});

	console.log(finalPreference);

	finalPreference[0].forEach(match => {
		finalPreference[1].forEach(same => {
			if (match == same) {
				console.log("Here is a match");
			}
		});		
	});

//(remove.includes(item.choice))

//	console.log(finalPreference);
//	console.log(finalPreference[2]);




});
