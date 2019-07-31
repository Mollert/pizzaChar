
const express = require("express");
const request = require("request");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const router = express.Router();
const port = process.env.PORT || 5600;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname ,"public")));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname ,"views"));

const mainPage = require("./controllers/mainPageRoute.js");
const findPizzeria = require("./controllers/findPizzeriaRoute.js");
const showMatches = require("./controllers/showMatchesRoute.js");
const reportPizza = require("./controllers/reportPizzaRoute.js");
const collectedInput = require("./controllers/collectedInputRoute.js");
const suggestPizzeria = require("./controllers/suggestPizzeriaRoute.js");
const errorPage = require("./controllers/errorPageRoute.js");

app.use("/", mainPage);
app.use("/findPizzeria", findPizzeria);
app.use("/findPizzeria/showMatches", showMatches);
app.use("/reportPizza", reportPizza);
app.use("/reportPizza/collectedInput", collectedInput);
app.use("/suggestPizzeria", suggestPizzeria);
app.use(errorPage.errorHandling);

app.listen(port, () => console.log(`Tuned In and Turned On to port ${port}`));
