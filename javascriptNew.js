
// When button is clicked frist check if there is something there
// if there is not display message.  If there is something, capturing the new pizzeria
// and sending a message that I've got it.  Also setting height of brick wall
document.getElementById("newSubmit").addEventListener("click", () => {
	event.preventDefault();
	document.getElementById("didNotGetIt").style.display = "none";	
	let newPizzeria = document.getElementById("newPizzeria").value.trim();
//	console.log(newPizzeria);
	if (newPizzeria === "") {
		document.getElementById("requestNew").reset();
		document.getElementById("didNotGetIt").style.display = "block";
		document.getElementById("brickWall").style.height = "74rem";				
	} else {
		document.getElementById("requestNew").reset();
		document.getElementById("showNew").style.display = "block";
		document.getElementById("addPizzeria").textContent = newPizzeria;
		document.getElementById("brickWall").style.height = "78rem";
	}
	
});
