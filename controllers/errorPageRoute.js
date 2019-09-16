
const errorHandling = (err, req, res, next) => {

	const connection = require("../config/connection.js");

	res.locals.metaTag = {
		title: "Sorry to see you here. Click home to start fresh again",
		content: "Something did not go as planned and you were directed to this page. I hope you still wish to continue so click home to start anew.",
		link: "/css/errorPage.css",
		data: '<script type="application/ld+json">{"@context": "http://schema.org","@type": "ResumeAction","targetCollection": "error","actionStatus": {"@type": "FailedActionStatus"},"agent": {"@type": "Person","name": "user},"error": {"@type": "Thing","description": "error occurred on webpage"},"participant": "users to site","result": "present path to home page","potentialAction": "click to return to home page"}</script>'
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