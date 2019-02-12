
const loadOptions = (whichOne, ident) => {

	let whichOption = document.createElement("option");
	let whichText = document.createTextNode(whichOne + " preference");
	whichOption.appendChild(whichText);
//	console.log(whichOption);
	document.getElementById(ident).appendChild(whichOption);

	selections.forEach(item => {
		let choiceOption = document.createElement("option");
		let optionText = document.createTextNode(item.choice);
		choiceOption.appendChild(optionText);
//		console.log(choiceOption);
		document.getElementById(ident).appendChild(choiceOption);
	});
};

window.onload = () => {
	loadOptions("1st", "firstChoice");
	loadOptions("2nd", "secondChoice");
	loadOptions("3rd", "thirdChoice");
};