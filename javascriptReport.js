
let places = [];

const organizePizzerias = () => {
	pizzerias.forEach(item => {
		places.push(item.name);
	});
	places.sort();
};

const loadPizzerias = () => {
	organizePizzerias();

	places.forEach(item => {
		let placeDiv = document.createElement("div");
		placeDiv.setAttribute("class", "place");
		let placeText = document.createTextNode(item);
		placeDiv.appendChild(placeText);
//		console.log(placeDiv);
		document.getElementById("pizzaPlace").appendChild(placeDiv);
	});

	let noDiv = document.createElement("div");
	noDiv.setAttribute("class", "place");
	let noAnchor = document.createElement("a");
	noAnchor.setAttribute("href", "./htmlNew.html");
	let noText = document.createTextNode("I don't see it listed.");
	noAnchor.appendChild(noText);
	noDiv.appendChild(noAnchor);
//	console.log(noDiv);
	document.getElementById("pizzaPlace").appendChild(noDiv);

};

window.onload = () => {
	loadPizzerias();
};

document.querySelector("#pizzaPlace").addEventListener("click", (event) => {
	let clicked = event.target;
	let where = clicked.innerText;
//	console.log(event.target.childElementCount);
//	console.log(event.target.className);
	if (clicked.className == "place" && clicked.childElementCount === 0) { 
		document.getElementById("yourChoice").textContent = where;
		document.getElementById("recordIntro").style.display = "block";
		document.getElementById("allButtons").style.display = "block";
		document.getElementById("brickWall").style.height = "140rem";

		let group = document.querySelectorAll(".place");
		for ( let i = 0 ; i < group.length ; i++ ) {
			group[i].style.display = "none";
		}
	}
});

let recordData = [];

document.getElementById("recordPizzaButton").addEventListener("click", () => {
	event.preventDefault();
	document.getElementById("noInfo").style.display = "none";
	let grabData = document.getElementById("allButtons").elements;
//	console.log(grabData);
	for ( let i = 0 ; i < grabData.length ; i++ ) {
		if (grabData[i].checked && !(grabData[i].value === "noOpinion") && !(grabData[i].value === "sliceNo")) {
			recordData.push(grabData[i].value);
		}		
	}
	if (grabData[27].value) {
		recordData.push(grabData[27].value);
	}		
//	console.log(recordData);
	document.getElementById("aboutInfo").style.display = "block";		
	if (recordData.length == 0) {
		document.getElementById("noInfo").style.display = "block";
	} else {
		document.getElementById("gotInfo").style.display = "block";
	}
});
