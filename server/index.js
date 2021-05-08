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
//1
app.get('/topStartups', routes.getTopStartups);
//3
app.get('/topInvestors', routes.getTopInvestors);
//5
//app.get('/yieldCurve', routes.getYieldCurve);

app.get('/recentInvestments', routes.getRecentInvestments);
app.get('/foundersSchools', routes.getFoundersSchools);
app.get('/investmentYears', routes.getInvestmentYears);

/* ---- Select Routes ---- */

app.get('/amounts', routes.selectAmounts);
app.get('/amountstwo', routes.selectAmountsBig);
app.get('/selectfunds', routes.selectFunds);
app.get('/select', routes.selectStartups);
app.get('/selectt', routes.selectIPO);




/* ---- Search Routes ---- */

//Searching by name
app.get('/searchVC/:name', routes.searchVC);
app.get('/searchStartup/:name', routes.searchStartup);
app.get('/searchIndustry/:keyword', routes.searchIndustry);

//Getting information about one VC/Startup/Industry
app.get('/VcInfo/:id', routes.getVcInfo);
app.get('/VcInvests/:id', routes.getVcInvests);
app.get('/StartupInfo/:id', routes.getStartupInfo);
app.get('/IndustryVC/:name', routes.getIndustryVC);
app.get('/IndustryStartup/:name', routes.getIndustryStartup);



//app.listen(8081, "192.168.31.174", () => { //To host server on ip address
app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
