
const express = require("express");
const request = require("request");
const router = express.Router();

// To main page
router.get("/", (req, res) => {

	res.locals.metaTag = {
		title: "You can choose to list or find the tastiest pizza in Charlotte, NC",
		content: "Either choose a pizza according to your preferences or add your favorite pizzerias style of pizza to our list. These are all home grown in Charlotte, NC.",
		data: '<script type="application/ld+json">{"@context": "http://schema.org","@type": "ChooseAction","agent": {"@type": "Person","name": "user"},"instrument": "questionnaire","participant": "other users to site","description": "pizza","disambiguatingDescription": "pizza made to your preference","image": "https://www.pizzaChar.com/public/image/pieButton.png","mainEntityOfPage": "https://www.pizzaChar.com","potentialAction": "locate or report on the best local pizza"}</script>'
	};

 	res.render("mainPage");
 });


module.exports = router;