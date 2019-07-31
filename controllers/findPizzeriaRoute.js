
const express = require("express");
const request = require("request");
const router = express.Router();

const selections = ["Crust: Thin center/Thin crust", "Crust: Thin center/Thick crust", "Crust: Thick center/Thick crust", "Crust: Chewy", "Crust: Crisp", "Crust: Tasty all by itself", "Crust: No taste at all", "Sauce: Chunky", "Sauce: Liquid", "Sauce: Heavy", "Sauce: Light", "Cheese: Light", "Cheese: Moderate", "Cheese: Heavy", "Oven: Wood", "Oven: Gas flame", "Oven: Electric", "Oven: Grill", "By the slice"];


// To find a pizzeria main page
router.get("/", (req, res) => {

	let options = [];

	selections.forEach(type => {
		options.push( {
			option: type
		});
	});

	res.locals.metaTag = {
		title: "Pick your pizza preferences to find a local Charlotte, NC pizzeria",
		content: "You can pick up to three preferences which are used to discover a local Charlotte, NC pizzeria. Check the comments to help with your decision.",
		link: "/css/findPizzeria.css",
		data: '<script type="application/ld+json">{"@context": "http://schema.org","@type": "CheckAction","agent": {"@type": "Person","name": "user"},"instrument": "user preferences","object": "database search","participant": "other users to site","result": "list of pizzerias","target": "http://www.pizzaChar.com/findPizzeria","description": "pizza","disambiguatingDescription": "pizza made to your preference","image": "https://www.pizzaChar.com/public/image/pieButton.png","mainEntityOfPage": "http://www.pizzaChar.com/findPizzeria","potentialAction": "find pizza according to user preferences"}</script>'
	};

 	res.render("findPizzeria", {options});

});


module.exports = router;