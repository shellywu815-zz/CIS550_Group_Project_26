const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- Summary data ---- */
app.get('/topInvestors', routes.getTopInvestors);
app.get('/topStartups', routes.getTopStartups);
app.get('/recentInvestments', routes.getRecentInvestments);
app.get('/foundersSchools', routes.getFoundersSchools);
app.get('/investmentYears', routes.getInvestmentYears);

/* ---- Select Routes ---- */

app.get('/yearVC/:yr/:minAmount', routes.selectYearVC);
app.get('/yearStartup/:yr/:minAmount', routes.selectYearStartup);
app.get('/yearIndustry/:yr/:minAmount', routes.selectYearIndustry);
app.get('/startups/:minAmount/:maxAmount', routes.selectStartups);




/* ---- Search Routes ---- */

//Searching by name
app.get('/searchVC/:name', routes.searchVC);
app.get('/searchStartup/:name', routes.searchStartup);
app.get('/searchIndustry/:keyword', routes.searchIndustry);

//Getting information about one VC/Startup/Industry
app.get('/VcInfo/:id', routes.getVcInfo);
app.get('/StartupInfo/:id', routes.getStartupInfo);
app.get('/IndustryVC/:name', routes.getIndustryVC);
app.get('/IndustryStartup/:name', routes.getIndustryStartup);



//app.listen(8081, "192.168.31.174", () => { //To host server on ip address
app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});