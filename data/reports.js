
const reports = [
	{
		"id": 0,
		"pizzeria id": 2,
		"Crust: Thin center/Thin crust": 0,
		"Crust: Thin center/Thick crust": 1,
		"Crust: Thick center/Thick crust": 0,
		"Crust: Chewy": 1,
		"Crust: Crisp": 0,
		"Crust: Tasty all by itself": 1,
		"Crust: No taste at all": 0,
		"Sauce: Chuncky": 0,
		"Sauce: Liquid": 1,
		"Sauce: Heavy": 0,
		"Sauce: Light": 1,
		"Cheese: Light": 0,
		"Cheese: Moderate": 1,
		"Cheese: Heavy": 0,
		"Oven: Wood": 1,
		"Oven: Gas flame": 0,
		"Oven: Electric": 0,
		"Oven: Grill": 0,
		"By the slice": 0,
		"date": "2/20/2019",
		"comment": "For me, the very best pizza in Charlotte."
	},{
		"id": 1,
		"pizzeria id": 4,
		"Crust: Thin center/Thin crust": 1,
		"Crust: Thin center/Thick crust": 0,
		"Crust: Thick center/Thick crust": 0,
		"Crust: Chewy": 0,
		"Crust: Crisp": 1,
		"Crust: Tasty all by itself": 0,
		"Crust: No taste at all": 0,
		"Sauce: Chuncky": 0,
		"Sauce: Liquid": 1,
		"Sauce: Heavy": 0,
		"Sauce: Light": 1,
		"Cheese: Light": 1,
		"Cheese: Moderate": 0,
		"Cheese: Heavy": 0,
		"Oven: Wood": 0,
		"Oven: Gas flame": 0,
		"Oven: Electric": 1,
		"Oven: Grill": 0,
		"By the slice": 0,
		"date": "2/20/2019",
		"comment": "What a surprise here.  Good pizza!"
//		"comments": ""
	},{
		"id": 2,
		"pizzeria id": 0,
		"Crust: Thin center/Thin crust": 0,
		"Crust: Thin center/Thick crust": 0,
		"Crust: Thick center/Thick crust": 1,
		"Crust: Chewy": 1,
		"Crust: Crisp": 0,
		"Crust: Tasty all by itself": 0,
		"Crust: No taste at all": 1,
		"Sauce: Chuncky": 1,
		"Sauce: Liquid": 0,
		"Sauce: Heavy": 1,
		"Sauce: Light": 0,
		"Cheese: Light": 0,
		"Cheese: Moderate": 1,
		"Cheese: Heavy": 0,
		"Oven: Wood": 0,
		"Oven: Gas flame": 1,
		"Oven: Electric": 0,
		"Oven: Grill": 0,
		"By the slice": 0,
		"date": "2/20/2019",
		"comment": "Small family feel along with the pizza."
	},{
		"id": 3,
		"pizzeria id": 3,
		"Crust: Thin center/Thin crust": 0,
		"Crust: Thin center/Thick crust": 0,
		"Crust: Thick center/Thick crust": 1,
		"Crust: Chewy": 0,
		"Crust: Crisp": 1,
		"Crust: Tasty all by itself": 1,
		"Crust: No taste at all": 0,
		"Sauce: Chuncky": 0,
		"Sauce: Liquid": 1,
		"Sauce: Heavy": 0,
		"Sauce: Light": 1,
		"Cheese: Light": 0,
		"Cheese: Moderate": 0,
		"Cheese: Heavy": 1,
		"Oven: Wood": 0,
		"Oven: Gas flame": 0,
		"Oven: Electric": 1,
		"Oven: Grill": 0,
		"By the slice": 0,
		"date": "2/20/2019",
		"comment": "What can I say, tasting that pizza I'll be back."
	},{
		"id": 4,
		"pizzeria id": 1,
		"Crust: Thin center/Thin crust": 1,
		"Crust: Thin center/Thick crust": 0,
		"Crust: Thick center/Thick crust": 0,
		"Crust: Chewy": 0,
		"Crust: Crisp": 1,
		"Crust: Tasty all by itself": 0,
		"Crust: No taste at all": 1,
		"Sauce: Chuncky": 1,
		"Sauce: Liquid": 0,
		"Sauce: Heavy": 0,
		"Sauce: Light": 1,
		"Cheese: Light": 1,
		"Cheese: Moderate": 0,
		"Cheese: Heavy": 0,
		"Oven: Wood": 0,
		"Oven: Gas flame": 1,
		"Oven: Electric": 0,
		"Oven: Grill": 0,
		"By the slice": 0,
		"date": "2/20/2019",
		"comment": "Great fresh ingredients."
	},{
		"id": 5,
		"pizzeria id": 0,
		"Crust: Thin center/Thin crust": 0,
		"Crust: Thin center/Thick crust": 0,
		"Crust: Thick center/Thick crust": 1,
		"Crust: Chewy": 1,
		"Crust: Crisp": 0,
		"Crust: Tasty all by itself": 1,
		"Crust: No taste at all": 0,
		"Sauce: Chuncky": 1,
		"Sauce: Liquid": 0,
		"Sauce: Heavy": 0,
		"Sauce: Light": 1,
		"Cheese: Light": 1,
		"Cheese: Moderate": 0,
		"Cheese: Heavy": 0,
		"Oven: Wood": 0,
		"Oven: Gas flame": 1,
		"Oven: Electric": 0,
		"Oven: Grill": 0,
		"By the slice": 0,
		"date": "2/20/2019",
		"comment": "Found this years ago and still great."
	},{
		"id": 6,
		"pizzeria id": 2,
		"Crust: Thin center/Thin crust": 0,
		"Crust: Thin center/Thick crust": 0,
		"Crust: Thick center/Thick crust": 1,
		"Crust: Chewy": 1,
		"Crust: Crisp": 0,
		"Crust: Tasty all by itself": 1,
		"Crust: No taste at all": 0,
		"Sauce: Chuncky": 1,
		"Sauce: Liquid": 0,
		"Sauce: Heavy": 0,
		"Sauce: Light": 1,
		"Cheese: Light": 1,
		"Cheese: Moderate": 0,
		"Cheese: Heavy": 0,
		"Oven: Wood": 0,
		"Oven: Gas flame": 1,
		"Oven: Electric": 0,
		"Oven: Grill": 0,
		"By the slice": 0,
		"date": "2/20/2019",
		"comment": "They even have a lunch buffet of pizza."
	},{
		"id": 7,
		"pizzeria id": 0,
		"Crust: Thin center/Thin crust": 0,
		"Crust: Thin center/Thick crust": 0,
		"Crust: Thick center/Thick crust": 1,
		"Crust: Chewy": 1,
		"Crust: Crisp": 0,
		"Crust: Tasty all by itself": 1,
		"Crust: No taste at all": 0,
		"Sauce: Chuncky": 1,
		"Sauce: Liquid": 0,
		"Sauce: Heavy": 0,
		"Sauce: Light": 1,
		"Cheese: Light": 1,
		"Cheese: Moderate": 0,
		"Cheese: Heavy": 0,
		"Oven: Wood": 0,
		"Oven: Gas flame": 1,
		"Oven: Electric": 0,
		"Oven: Grill": 0,
		"By the slice": 0,
		"date": "2/20/2019",
		"comment": "Pizza's are huge and full."
	},{
		"id": 8,
		"pizzeria id": 4,
		"Crust: Thin center/Thin crust": 0,
		"Crust: Thin center/Thick crust": 0,
		"Crust: Thick center/Thick crust": 1,
		"Crust: Chewy": 1,
		"Crust: Crisp": 0,
		"Crust: Tasty all by itself": 1,
		"Crust: No taste at all": 0,
		"Sauce: Chuncky": 1,
		"Sauce: Liquid": 0,
		"Sauce: Heavy": 0,
		"Sauce: Light": 1,
		"Cheese: Light": 1,
		"Cheese: Moderate": 0,
		"Cheese: Heavy": 0,
		"Oven: Wood": 0,
		"Oven: Gas flame": 1,
		"Oven: Electric": 0,
		"Oven: Grill": 0,
		"By the slice": 0,
		"date": "2/20/2019",
		"comment": "Try the garlic knots."
	},{
		"id": 9,
		"pizzeria id": 2,
		"Crust: Thin center/Thin crust": 0,
		"Crust: Thin center/Thick crust": 0,
		"Crust: Thick center/Thick crust": 1,
		"Crust: Chewy": 1,
		"Crust: Crisp": 0,
		"Crust: Tasty all by itself": 1,
		"Crust: No taste at all": 0,
		"Sauce: Chuncky": 1,
		"Sauce: Liquid": 0,
		"Sauce: Heavy": 0,
		"Sauce: Light": 1,
		"Cheese: Light": 1,
		"Cheese: Moderate": 0,
		"Cheese: Heavy": 0,
		"Oven: Wood": 0,
		"Oven: Gas flame": 1,
		"Oven: Electric": 0,
		"Oven: Grill": 0,
		"By the slice": 0,
		"date": "2/20/2019",
		"comment": "Wish I could make one like this at home."
	},{
		"id": 10,
		"pizzeria id": 0,
		"Crust: Thin center/Thin crust": 0,
		"Crust: Thin center/Thick crust": 0,
		"Crust: Thick center/Thick crust": 1,
		"Crust: Chewy": 1,
		"Crust: Crisp": 0,
		"Crust: Tasty all by itself": 1,
		"Crust: No taste at all": 0,
		"Sauce: Chuncky": 1,
		"Sauce: Liquid": 0,
		"Sauce: Heavy": 0,
		"Sauce: Light": 1,
		"Cheese: Light": 1,
		"Cheese: Moderate": 0,
		"Cheese: Heavy": 0,
		"Oven: Wood": 0,
		"Oven: Gas flame": 1,
		"Oven: Electric": 0,
		"Oven: Grill": 0,
		"By the slice": 0,
		"date": "2/20/2019",
		"comment": "Our personal go to place."
	},{
		"id": 11,
		"pizzeria id": 4,
		"Crust: Thin center/Thin crust": 0,
		"Crust: Thin center/Thick crust": 0,
		"Crust: Thick center/Thick crust": 1,
		"Crust: Chewy": 0,
		"Crust: Crisp": 1,
		"Crust: Tasty all by itself": 0,
		"Crust: No taste at all": 1,
		"Sauce: Chuncky": 1,
		"Sauce: Liquid": 0,
		"Sauce: Heavy": 0,
		"Sauce: Light": 1,
		"Cheese: Light": 0,
		"Cheese: Moderate": 0,
		"Cheese: Heavy": 1,
		"Oven: Wood": 0,
		"Oven: Gas flame": 0,
		"Oven: Electric": 1,
		"Oven: Grill": 0,
		"By the slice": 0,
		"date": "2/20/2019",
		"comment": "Wish you could get it by the slice."
	}
];

module.exports = reports;