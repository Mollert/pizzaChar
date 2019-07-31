
const errorHandling = (err, req, res, next) => {

	const connection = require("../config/connection.js");

	res.locals.metaTag = {
		title: "Sorry to see you here. Click home to start fresh again",
		content: "Something did not go as planned and you were directed to this page. I hope you still wish to continue so click home to start anew.",
		link: "/css/errorPage.css",
		data: '<script type="application/ld+json">{"@context": "http://schema.org","@type": "CheckAction","agent": {"@type": "Person","name": "user"},"instrument": "user preferences","object": "database search","participant": "other users to site","result": "list of pizzerias","target": "http://www.pizzaChar.com/findPizzeria","description": "pizza","disambiguatingDescription": "pizza made to your preference","image": "https://www.pizzaChar.com/public/image/pieButton.png","mainEntityOfPage": "http://www.pizzaChar.com/findPizzeria","potentialAction": "find pizza according to user preferences"}</script>'
	};

	let what = "Error listed as: " + err.message;
	let errorSlice = (err.stack).split("at");
	let where = "Location of error is at:" + errorSlice[1];

	let queryString = "INSERT INTO errors (error, location) VALUES (?, ?)";
	// Add to the database		
	connection.query(queryString, [what, where], (error, row, fields) => {
		if (error) { return next(error); }
	});

//	console.log(err);
//	console.log(err.stack);

	res.render("errorPage");
 };


module.exports = { errorHandling };