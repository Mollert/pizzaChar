
const express = require("express");
const request = require("request");
const router = express.Router();

const pizzerias = require("../data/pizzerias.js");


// To suggest a new pizzeria main page
router.get("/", (req, res) => {

	res.locals.metaTag = {
		title: "Submit a pizzeria you'd like added to the group from Charlotte, NC",
		content: "You can submit a local Charlotte, NC pizzeria so we all can discover their pizza. When you come back, you can describe and comment on their pizza.",
		link: "/css/suggestPizzeria.css",
		data: '<script type="application/ld+json">{"@context": "http://schema.org","@type": "AddAction","targetCollection": "pizzeria","agent": {"@type": "Person","name": "user"},"instrument": "input text box and submit button","participant": "other users to site","result": "submittal of favorite pizzeria","target": "https://www.pizzaChar.com/suggestPizzeria","alternateName": "add a pizza maker","description": "add to the list of pizzerias","disambiguatingDescription": "allows users to add favorite pizzeria not shown","image": "https://www.pizzaChar.com/public/image/pieButton.png","mainEntityOfPage": "https://www.pizzaChar.com/suggestPizzeria","potentialAction": "fill in the text box with pizzeria name"}</script>'
	};

	res.render("suggestPizzeria");
});


// Receives a suggestion of a new pizzeria
router.post("/receivedSuggestion", function(req, res) {

	let addPizzeria = JSON.parse(JSON.stringify(req.body));
	let placeName = addPizzeria.newPizzeria;

	if (placeName !== "") {
		pizzerias.push( {
			id: pizzerias.length,
			name: placeName,
			website: "https://www.google.com"
		});
	}

	let message = {
		received: false,
		none: true,
		business: ""
	}

	if (placeName !== "") {
		message.received = true;
		message.none = false;		
		message.business = placeName;
	}

	res.locals.metaTag = {
		title: "If we did not receive your suggestion, please try again",
		content: "We will tell you if we did not receive your pizzeria suggestion.  But if we did, thanks for sharing your pizza discovery so we all can enjoy.",	
		link: "/css/suggestPizzeria.css"
	};

	res.render("suggestPizzeria", {message})
});


module.exports = router;