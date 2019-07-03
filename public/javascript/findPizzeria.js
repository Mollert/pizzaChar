
let collection = [];
let firstRemoval = [];
let secondRemoval = [];
let thirdRemoval = [];



const loadOptions = (remove, where) => {
	collection.forEach(item => {	
		if (!(remove.includes(item))) {
			let choiceOption = document.createElement("option");
			let optionText = document.createTextNode(item);
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
			whichArray.push("Sauce: Chunky", "Sauce: Liquid");
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

// Capturing options from the 1st preferences list coming from the server as soon as the page loads 
let capture = document.getElementById("firstChoice").options;
for ( i = 1 ; i < capture.length ; i++ ) {
	collection.push(capture[i]["value"]);
}


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



let heightDiff = (document.body.scrollHeight);
let newHeight = parseInt(heightDiff / 16);
//console.log(newHeight);
if (newHeight > 70) {
	newHeight = newHeight + 5 + 3;
	let updatedHeight = newHeight + "rem";
	document.getElementById("brickWall").style.height = updatedHeight;
}
//console.log(newHeight);
