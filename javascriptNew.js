
document.getElementById("newSubmit").addEventListener("click", () => {
	event.preventDefault();
	document.getElementById("didNotGetIt").style.display = "none";	
	let newPizzeria = document.getElementById("newPizzeria").value.trim();
//	console.log(newPizzeria);
	if (newPizzeria === "") {
		document.getElementById("requestNew").reset();
		document.getElementById("didNotGetIt").style.display = "block";
	} else {
		document.getElementById("requestNew").reset();
		document.getElementById("showNew").style.display = "block";
		document.getElementById("addPizzeria").textContent = newPizzeria;
	}
});
