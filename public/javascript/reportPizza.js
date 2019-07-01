
// grab pizzeria that was selected and then diplaying name and buttons for user to choose
// set proper height for brick wall and then remove the other pizzeria selections
document.querySelector("#pizzaPlace").addEventListener("click", (event) => {
	let clicked = event.target;
	let where = clicked.innerText;
//	console.log(event.target.childElementCount);
//	console.log(event.target.className);

	if (clicked.className == "place" && clicked.childElementCount === 0) { 
		document.getElementById("yourChoice").textContent = where;
		document.getElementById("recordIntro").style.display = "block";
		document.getElementById("allButtons").style.display = "block";

		document.getElementById("hidePlace").value = where;

		let heightDiff = (document.body.scrollHeight);
		let newHeight = parseInt(heightDiff / 16);
		let updatedHeight = newHeight + "rem";
		document.getElementById("brickWall").style.height = updatedHeight;

		let group = document.querySelectorAll(".place");
		for ( let i = 0 ; i < group.length ; i++ ) {
			group[i].style.display = "none";
		}
	}
});
