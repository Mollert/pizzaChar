
let places = [];

const organizePizzerias = () => {
	pizzerias.forEach(item => {
		places.push(item.name);
	});
	places.sort();
};

/*const loadPizzerias = () => {
	organizePizzerias();

	places.forEach(item => {
		let liName = document.createElement("li");
		liName.setAttribute("class", "places");
		let nameText = document.createTextNode(item);
		liName.appendChild(nameText);
//		console.log(liName);
		document.getElementById("pulldownList").appendChild(liName);
	});

	let liNew = document.createElement("li");
	liNew.setAttribute("class", "places");
	let newAnchor = document.createElement("a");
	newAnchor.setAttribute("href", "indexNew.html");
	let newText = document.createTextNode("I don't see it listed.");
	newAnchor.appendChild(newText);
	liNew.appendChild(newAnchor);
//	console.log(liNew);
	document.getElementById("pulldownList").appendChild(liNew);
};
*/
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
	noAnchor.setAttribute("href", "indexNew.html");
	let noText = document.createTextNode("I don't see it listed.");
	noAnchor.appendChild(noText);
	noDiv.appendChild(noAnchor);
//	console.log(noDiv);
	document.getElementById("pizzaPlace").appendChild(noDiv);

};

window.onload = () => {
	loadPizzerias();
};

document.getElementsByClassName("place").addEventListener("click", (event) => {
	let where = event.target.innerText;
	console.log(where);
	document.getElementById("yourChoice").innerHTML = where;
});



/*
document.getElementById("pizzaPlace").addEventListener("click", (event) => {
	let where = event.target.innerText;
//	console.log(where);
	document.getElementById("yourChoice").innerHTML = where;
});
*/

/*
document.querySelector("ul").addEventListener("click", (event) => {
	let where = event.target.innerText;
	document.getElementById("pizzaPlace").innerHTML = where;
});
*/