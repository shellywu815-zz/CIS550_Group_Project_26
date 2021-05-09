const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
const connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Summary Queries ---- */
const getMostFundedPerson = (req, res) => {
  const query = `

    
  
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


const getAverageFundReceived = (req, res) => {
  const query = `
  WITH mostinv AS (
    SELECT id, name, found_date, sum(amount) AS total
    FROM Company c JOIN FinOrgInvestIn fi ON c.id = fi.c_id
    WHERE found_date <> "0000-00-00"
    GROUP BY id
    ORDER BY total DESC
    LIMIT 100000
   ), ftime AS (
    SELECT year(found_date) AS year, month(found_date) AS month, id, name, total
    FROM mostinv
    HAVING year >= 1985
   ) , inv AS (
    SELECT year(observation_date) AS year, month(observation_date) AS month
    FROM YieldCurve
    WHERE is_inverted = 1
   ) , cominv AS (
    SELECT id, name
    FROM ftime
    WHERE year IN (SELECT DISTINCT year FROM inv)
   ), comreg AS (
    SELECT id, name
    FROM ftime
    WHERE id NOT IN (SELECT id FROM cominv)
   ), invinvs AS (
    SELECT id, sum(amount) AS total
    FROM cominv c JOIN FinOrgInvestIn fi ON c.id = fi.c_id
    GROUP BY id
   ), reginvs AS (
    SELECT id, sum(amount) AS total
    FROM comreg c JOIN FinOrgInvestIn fi ON c.id = fi.c_id
    GROUP BY id
   ), avginvs AS (
    SELECT avg(total) AS average, 0 AS inverted FROM reginvs
    UNION
    SELECT avg(total) AS average, 1 AS inverted FROM invinvs
   ), counts AS (
    SELECT count(*) AS number, 0 AS inverted FROM comreg
    UNION
    SELECT count(*) AS number, 1 AS inverted FROM cominv
   ) SELECT * 
   FROM avginvs NATURAL JOIN counts;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


const getTopInvestors = (req, res) => {
  const query = `
  WITH fund_amount AS (
    SELECT c.id AS companyId, SUM(f.amount) AS amount
    FROM Company c JOIN FinOrgInvestIn f ON c.id = f.c_id
    GROUP BY c.id
    ),
    degree_received AS (
      SELECT d.subject AS subject, a.c_id AS cid
      FROM Affiliates a JOIN Degree d ON a.p_id = d.receiver
      WHERE a.title LIKE "%Founder%"
    )
    SELECT d.subject AS major, SUM(f.amount) AS investments
    FROM fund_amount f JOIN degree_received d ON f.companyId = d.cid 
    GROUP BY d.subject HAVING major<> "unknown" ORDER BY SUM(f.amount) DESC LIMIT 10;
    
  
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const getTopStartups = (req, res) => {
  const query = `
  SELECT c.name, SUM(i.amount) AS amount
FROM Company c JOIN CompanyInvestIn i ON c.id=i.investor_id
WHERE c.id NOT IN 
(SELECT acquired_id FROM Acquired)
GROUP BY c.name ORDER BY SUM(i.amount) DESC
LIMIT 10;

  
  

  
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const getRecentInvestments = (req, res) => {
  const query = `
  SELECT COUNT(*) AS number, YEAR(date) as year
  FROM CompanyInvestIn
  GROUP BY YEAR(date)
  ORDER BY YEAR(date) DESC;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const getFoundersSchools = (req, res) => {
  const query = `
WITH total_fund AS (
	SELECT a.p_id, d.institution, SUM(i.amount)/COUNT(*) AS p_amount
	FROM Degree d JOIN Affiliates a ON d.receiver = a.p_id JOIN CompanyInvestIn i ON a.c_id = i.invested_id
	WHERE a.title LIKE '%Founder%'
	GROUP BY a.p_id
)
	SELECT institution, SUM(p_amount) AS i_amount
	FROM total_fund
	GROUP BY institution
	ORDER BY i_amount DESC
	LIMIT 30;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const getInvestmentYears = (req, res) => {
  const query = `
  SELECT YEAR(i.date) AS year, SUM(i.amount) AS amount
  FROM CompanyInvestIn i
  GROUP BY YEAR(i.date)
  ORDER BY YEAR(i.date) DESC;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};
/* ---- Select Queries ---- */

const selectAmounts = (req, res) => {
  const query = `
  SELECT decade FROM amountDropDown;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
      res.json(rows);
      console.log(rows);}
  });
};

const selectFunds = (req, res) => {
  const query = `
  SELECT DISTINCT name FROM FinOrg LIMIT 20;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
      res.json(rows);
      console.log(rows);}
  });
};

const selectAmountsBig = (req, res) => {
  const query = `
  SELECT name FROM amountDropDownTwo;
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
      res.json(rows);
      console.log(rows);}
  });
};

const selectStartups = (req, res) => {
  var inputgenre = req.query.selectedGenre;
  var inputdecade = req.query.selectedDecade;
  const query = `
  WITH qualified_fund_id AS (
    SELECT f_id, amount, round
    FROM FinOrgInvestIn 
    WHERE amount >= ${inputdecade} AND amount <= ${inputgenre})
    SELECT DISTINCT FinOrg.name AS title, qualified_fund_id.amount AS movie_id, qualified_fund_id.round as rating
    FROM  FinOrg INNER JOIN qualified_fund_id 
    WHERE FinOrg.id = qualified_fund_id.f_id
    LIMIT 250
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      console.log(rows);
    }
  });
};


const selectIPO = (req, res) => {
  var inputcompany = req.query.selectedFund;
  const query = `
  WITH fund_id AS
  (SELECT id FROM FinOrg WHERE name = "${inputcompany}"), 
  qualified_c_f AS
  (SELECT c_id, 
	f_id 
	FROM FinOrgInvestIn JOIN fund_id ON 
  FinOrgInvestIn.f_id = fund_id.id),
  temp AS
  (SELECT qualified_c_f.c_id, 
	qualified_c_f.f_id, 
	IPO.raised_amount FROM qualified_c_f
  INNER JOIN IPO 
	ON qualified_c_f.c_id = IPO.c_id)
  SELECT Company.name AS title, FinOrg.name AS movie_id, raised_amount as rating FROM temp 
  INNER JOIN 
	Company on temp.c_id = Company.id 
  INNER JOIN 
	FinOrg ON temp.f_id = FinOrg.id
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      console.log(rows);
    }
  });
};



/* ---- Search Queries ---- */

//Searching by name
const searchVC = (req, res) => {
  const searchString = req.params.name;
  const query = `
  WITH vc AS (
    SELECT id, name, founded_at
    FROM FinOrg
    WHERE name LIKE '%` + searchString + `%'
  ),
  vci AS (
    SELECT vc.id, vc.name, vc.founded_at, c.industry, i.amount
    FROM vc JOIN FinOrgInvestIn i ON i.f_id = vc.id JOIN Company c ON i.c_id = c.id
  ),
  ag AS (
    SELECT id, name, founded_at AS founded, SUM(amount) AS size, COUNT(amount) AS number
    FROM vci
    GROUP BY id, name, founded_at
  ),
  ind AS (
    SELECT id, industry, sum(amount) AS total
    FROM vci
    GROUP BY id
  )
  SELECT id, name, founded, size AS total, number, industry
    FROM ag NATURAL JOIN ind
    ORDER BY LENGTH(name) - LENGTH("` + searchString + `") ASC
    LIMIT 100;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const searchStartup = (req, res) => {
  const searchString = req.params.name;
  const query = `
  WITH com AS (
    SELECT id, name, found_date, industry
    FROM Company
    WHERE (name LIKE '%` + searchString + `%') OR (normalized_name LIKE '%` + searchString + `%')
  ),
  foi AS (
    SELECT id, f_id AS investor, round, amount
    FROM com JOIN FinOrgInvestIn fi ON com.id = fi.c_id
  ),
  coi AS (
    SELECT id, investor_id AS investor, round, amount
    FROM com JOIN CompanyInvestIn ci ON com.id = ci.invested_id
  ),
  poi AS (
    SELECT id, investor_id AS investor, round, amount
    FROM com JOIN PersonInvestIn pi ON com.id = pi.invested_id
  ),
  allinvs AS (
    SELECT * FROM foi
    UNION
    SELECT * FROM coi
    UNION
    SELECT * FROM poi
  ),
  ag AS (
    SELECT id, count(DISTINCT round) AS number, sum(amount) AS total
    FROM allinvs
    GROUP BY id
  )
SELECT id, name, found_date AS founded, industry, number, total
FROM com NATURAL JOIN ag
ORDER BY LENGTH(name) - LENGTH("` + searchString + `") ASC
LIMIT 100;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const searchIndustry = (req, res) => {
  const searchString = req.params.keyword;
  const query = `
  WITH com AS (
    SELECT id, name, found_date, industry
    FROM Company
    WHERE (industry LIKE '%` + searchString + `%')
  ),
  foi AS (
    SELECT id, industry, f_id AS investor, round, amount
    FROM com JOIN FinOrgInvestIn fi ON com.id = fi.c_id
  ),
  coi AS (
    SELECT id, industry, investor_id AS investor, round, amount
    FROM com JOIN CompanyInvestIn ci ON com.id = ci.invested_id
  ),
  poi AS (
    SELECT id, industry, investor_id AS investor, round, amount
    FROM com JOIN PersonInvestIn pi ON com.id = pi.invested_id
  ),
  allinvs AS (
    SELECT * FROM foi
    UNION
    SELECT * FROM coi
    UNION
    SELECT * FROM poi
  )
SELECT industry AS name, count(round) AS number, sum(amount) AS total
FROM allinvs
GROUP BY industry
ORDER BY LENGTH(name) - LENGTH("` + searchString + `") ASC
LIMIT 100;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

//Getting information about one VC/Startup/Industry
const getVcInfo = (req, res) => {
  const query = `

  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const getVcInvests = (req, res) => {
  const fid = req.params.id;
  const query = `
  SELECT c.id, c.name, c.industry, i.round, i.amount, i.date
  FROM FinOrgInvestIn i JOIN Company c ON i.c_id = c.id
  WHERE i.f_id = "` + fid + `" 
  ORDER BY amount DESC;  
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const getStartupInfo = (req, res) => {
  const query = `

  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const getStartupFunds = (req, res) => {
  const cid = req.params.id;
  const query = `
  WITH fundings AS (  
    (SELECT f.id, f.name, fi.round, fi.amount, fi.date
    FROM FinOrgInvestIn fi JOIN FinOrg f ON fi.f_id = f.id
    WHERE fi.c_id = "` + cid + `")
    UNION
    (SELECT c.id, c.name, ci.round, ci.amount, ci.date
    FROM CompanyInvestIn ci JOIN Company c ON ci.investor_id = c.id
    WHERE ci.invested_id = "` + cid + `")
  )
  SELECT name, round, amount, date
  FROM fundings
  ORDER BY round DESC, amount DESC;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const getIndustryVC = (req, res) => {
  const ind = req.params.name;
  const query = `
  WITH vci AS (
    SELECT vc.id, vc.name, vc.founded_at, i.amount
    FROM FinOrg vc JOIN FinOrgInvestIn i ON i.f_id = vc.id JOIN Company c ON i.c_id = c.id
    WHERE c.industry = "` + ind + `"
  )
SELECT id, name, founded_at AS founded, sum(amount) AS total, count(amount) AS number
FROM vci
GROUP BY id
ORDER BY total DESC
LIMIT 200;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const getIndustryStartup = (req, res) => {
  const ind = req.params.name;
  const query = `
  WITH com AS (
    SELECT id, name, found_date, industry
    FROM Company
    WHERE industry = "` + ind + `"
  ),
  foi AS (
    SELECT id, round, amount
    FROM com JOIN FinOrgInvestIn fi ON com.id = fi.c_id
  ),
  coi AS (
    SELECT id, round, amount
    FROM com JOIN CompanyInvestIn ci ON com.id = ci.invested_id
  ),
  poi AS (
    SELECT id, round, amount
    FROM com JOIN PersonInvestIn pi ON com.id = pi.invested_id
  ),
  allinvs AS (
    SELECT * FROM foi
    UNION
    SELECT * FROM coi
    UNION
    SELECT * FROM poi
  )
SELECT id, name, found_date AS founded, count(DISTINCT round) AS number, sum(amount) AS total
FROM allinvs NATURAL JOIN com
GROUP BY id
ORDER BY total DESC
LIMIT 200;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


module.exports = {
  getMostFundedPerson: getMostFundedPerson,
  getAverageFundReceived: getAverageFundReceived,
	getTopInvestors: getTopInvestors,
  getTopStartups: getTopStartups,
  getRecentInvestments: getRecentInvestments,
  getFoundersSchools: getFoundersSchools,
  getInvestmentYears: getInvestmentYears,
  selectAmounts:selectAmounts,
  selectAmountsBig:selectAmountsBig,
  selectFunds:selectFunds,
  selectIPO:selectIPO,
  selectStartups: selectStartups,
  searchVC: searchVC,
  searchStartup: searchStartup,
  searchIndustry: searchIndustry,
  getVcInfo: getVcInfo,
  getStartupInfo: getStartupInfo,
  getIndustryVC: getIndustryVC,
  getIndustryStartup: getIndustryStartup,
  getVcInvests: getVcInvests,
  getStartupFunds: getStartupFunds
  //TODO: Finish this
};
