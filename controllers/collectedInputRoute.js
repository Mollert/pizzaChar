
const express = require("express");
const request = require("request");
const router = express.Router();


// collects the users description
router.post("/", function(req, res) {


	let input = JSON.parse(JSON.stringify(req.body));
	let pizzeria = input.pizzeria;
	let comment = input.comment;

	delete input.pizzeria;
	delete input.comment;	

//	console.log(pizzeria);
//	console.log(input);

	let entry = false;
	Object.keys(input).forEach(function(key) {
		if (input[key] !== "noOpinion") {
			entry = true;
		}
	});

	if ( comment !== "") {
		entry = true;
	}

	let inputMessage = "I got your inputs.  I'll add them with the others for " + pizzeria + ".  Thanks for participating.";
	if (!entry) {
		inputMessage = 'All I got was "No opinions".  So maybe try again.';
	}


	res.locals.metaTag = {
		title: "I've received your input describing a local Charlotte NC pizza",
		content: "Thanks for describing your pizza from a local Charlotte, NC pizzeria. We’ll add them and your comments so they can be of some help to others.",
		link: "/css/reportPizza.css"
	};

	res.render("collectedInput", {inputMessage});
});






module.exports = router;