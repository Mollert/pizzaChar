
const express = require("express");
const request = require("request");
const router = express.Router();

const connection = require("../config/connection.js");

// collects the users description
router.post("/", function(req, res, next) {

	res.locals.metaTag = {
		title: "I've received your input describing a local Charlotte NC pizza",
		content: "Thanks for describing your pizza from a local Charlotte, NC pizzeria. We’ll add them and your comments so they can be of some help to others.",
		link: "/css/reportPizza.css"
	};

	let input = req.body;
//console.log(input);

	let pizzeria = input.pizzeria;
	let comment = input.comment;
	delete input.pizzeria;
	delete input.comment;

	let userPicks = {pizzeriaId: 0};
	let howMany = 1;
	let inputMessage = "";

	Object.keys(input).forEach(function(key) {
		if (input[key] !== "noOpinion") {
			userPicks[input[key]] = 1;
			howMany++;
		}
	});

	if (howMany > 1) {
		let todayDate = new Date();
		let savedDate = todayDate.toLocaleDateString();
		userPicks["date"] = savedDate;
		if (comment !== "") {
			userPicks["comment"] = comment;		
		}
	}

	if (howMany > 1) {

		let queryString = "SELECT placeId FROM pizzerias WHERE name = (?)";
		//  to the database		
		connection.query(queryString, [pizzeria], (error, row, fields) => {
			if (error) { return next(error); }

			userPicks.pizzeriaId = row[0]["placeId"];

			let queryString = "INSERT INTO reports SET ?";
			//  to the database		
			connection.query(queryString, userPicks, (error, row, fields) => {
				if (error) { return next(error); }

				inputMessage = "I got your inputs.  I'll add them with the others for " + pizzeria + ".  Thanks for participating.";

				res.render("collectedInput", {inputMessage});
			});
		});
	} else {
		inputMessage = 'All I got was "No opinions".  So maybe try again.';

		res.render("collectedInput", {inputMessage});
	}
});


module.exports = router;