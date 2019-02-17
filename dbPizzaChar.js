
const pizzerias = [
	{
		"id": 0,
		"name": "True Crafted Pizza",
		"website": "https://www.truepizza.com",
	},{
		"id": 1,
		"name": "Village Tavern",
		"website": "https://www.villagetavern.com/locations/charlotte-nc/",
	},{
		"id": 2,
		"name": "Portofino's",
		"website": "https://www.portofinocharlotte.com",
	},{
		"id": 3,
		"name": "Giacomo's Pizzeria",
		"website": "http://www.giacomospizzeria.com",
	},{
		"id": 4,
		"name": "Luisa's Brick Oven Pizzeria",
		"website": "https://luisasbrickovenpizza.com",
	}		
];

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
		"comments": "For me, the very best pizza in Charlotte."
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
		"comments": "What a surprise here.  Good pizza!"
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
		"comments": "Small family feel along with the pizza."
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
		"comments": "What can I say, tasting that pizza I'll be back."
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
		"comments": "Great fresh ingredients."
	}
];

const selections= [
	{
		"id": 0,
		"choice": "Crust: Thin center/Thin crust"
	},{
		"id": 1,
		"choice": "Crust: Thin center/Thick crust"
	},{
		"id": 2,
		"choice": "Crust: Thick center/Thick crust"
	},{
		"id": 3,
		"choice": "Crust: Chewy"
	},{
		"id": 4,
		"choice": "Crust: Crisp"
	},{
		"id": 5,
		"choice": "Crust: Tasty all by itself"
	},{
		"id": 6,
		"choice": "Crust: No taste at all"
	},{
		"id": 7,
		"choice": "Sauce: Chuncky"
	},{
		"id": 8,
		"choice": "Sauce: Liquid"
	},{
		"id": 9,
		"choice": "Sauce: Heavy"
	},{
		"id": 10,
		"choice": "Sauce: Light"
	},{
		"id": 11,
		"choice": "Cheese: Light"
	},{
		"id": 12,
		"choice": "Cheese: Moderate"
	},{
		"id": 13,
		"choice": "Cheese: Heavy"
	},{
		"id": 14,
		"choice": "Oven: Wood"
	},{
		"id": 15,
		"choice": "Oven: Gas flame"
	},{
		"id": 16,
		"choice": "Oven: Electric"
	},{
		"id": 17,
		"choice": "Oven: Grill"
	},{
		"id": 18,
		"choice": "By the slice"
	}
];
