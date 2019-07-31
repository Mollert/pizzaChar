
const express = require("express");
const request = require("request");
const router = express.Router();

const connection = require("../config/connection.js");


// To report on a pizza main page
router.get("/", (req, res, next) => {

	let queryString = "SELECT name FROM pizzerias";
	//  to the database		
	connection.query(queryString, (error, row, fields) => {
		if (error) { return next(error); }

		let places = [];

		row.forEach(type => {
			places.push( {
				place: type["name"]
			});
		});

		res.locals.metaTag = {
			title: "Describe an unforgettable pizza from a local Charlotte NC pizzeria",
			content: "You click through the specifics that make up your remarkable pizza then submit it to be added to our list of other's from pizzerias in Charlotte, NC.",
			link: "/css/reportPizza.css",
			data: '<script type="application/ld+json">{"@context": "http://schema.org","@type": "CommentAction","resultComment": "add pizza type to database","about": "pizzeria and pizza","recipient": "other users to site","agent": {"@type": "Person","name": "user"},"instrument": "checklist","object": "survey","participant": "other users to site","result": "list of pizzerias","target": "https://www.pizzaChar.com/reportPizza","alternateName": "user pizza description","description": "submittal of user selected pizza ingredients","disambiguatingDescription": "recording users favorite pizza","image": "https://www.pizzaChar.com/public/image/pieButton.png","mainEntityOfPage": "https://www.pizzaChar.com/reportPizza","potentialAction": "choose from options and leave comment"}</script>'
		};

		res.render("reportPizza", {places});
	});
});


module.exports = router;