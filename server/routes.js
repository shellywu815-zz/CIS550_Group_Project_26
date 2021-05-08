const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
const connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Summary Queries ---- */
const getTopInvestors = (req, res) => {
  const query = `
  SELECT d.subject, SUM(i.amount)
  FROM Degree d JOIN Affiliates a ON d.receiver = a.p_id 
  JOIN InvestIn ON a.c_id  = i.c_id
  WHERE a.title LIKE '%Founder%’
  GROUP BY d.subject;
  
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
  SELECT c.name, SUM(i.amount)
  FROM Company c JOIN InvestIn i ON c.c_id=i.c_id
  WHERE c.c_id NOT IN 
  (SELECT acquired_c_id FROM Acquires)
  GROUP BY c.name
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
WITH c_num AS (
SELECT COUNT(*) AS number
FROM CompanyInvestIn
WHERE date LIKE '%2013-%'
)
SELECT COUNT(*)+c_num.number AS number
FROM PersonInvestIn, c_num 
WHERE date LIKE '%2013-%';
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
	FROM Degree d JOIN Affiliates a ON d.receiver = a.p_id JOIN InvestIn i ON a.c_id = i.c_id
	WHERE a.title LIKE '%Founder%'
	GROUP BY a.p_id
)
	SELECT institution, SUM(p_amount) AS i_amount
	FROM total_fund
	GROUP BY institution
	ORDER BY i_amount DESC;
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
  SELECT SUM(i.amount) FROM InvestsIn i GROUP BY YEAR(i.date);
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};
/* ---- Select Queries ---- */

const selectYearVC = (req, res) => {
  const query = `

  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const selectYearStartup = (req, res) => {
  const query = `

  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const selectYearIndustry = (req, res) => {
  const query = `

  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const selectStartups = (req, res) => {
  const query = `

  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- Search Queries ---- */

//Searching by name
const searchVC = (req, res) => {
  const searchString = req.params.name;
  const query = `
  WITH vc AS (
    SELECT id
    FROM FinOrg
    WHERE name LIKE '%` + searchString + `%'
    ORDER BY LENGTH(name) - LENGTH("` + searchString + `") ASC
  )
  SELECT c.id, c.name, c.industry, i.round, i.amount, i.date
  FROM FinOrgInvestIn i JOIN Company c ON i.c_id = c.id
  WHERE i.f_id = (SELECT id FROM vc LIMIT 1) 
  ORDER BY amount DESC;  
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const searchStartup = (req, res) => {
  const query = `

  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const searchIndustry = (req, res) => {
  const query = `

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

const getIndustryVC = (req, res) => {
  const query = `

  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

const getIndustryStartup = (req, res) => {
  const query = `

  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


module.exports = {
	getTopInvestors: getTopInvestors,
  getTopStartups: getTopStartups,
  getRecentInvestments: getRecentInvestments,
  getFoundersSchools: getFoundersSchools,
  getInvestmentYears: getInvestmentYears,
  selectYearVC: selectYearVC,
  selectYearStartup: selectYearStartup,
  selectYearIndustry: selectYearIndustry,
  selectStartups: selectStartups,
  searchVC: searchVC,
  searchStartup: searchStartup,
  searchIndustry: searchIndustry,
  getVcInfo: getVcInfo,
  getStartupInfo: getStartupInfo,
  getIndustryVC: getIndustryVC,
  getIndustryStartup: getIndustryStartup,
  getVcInvests: getVcInvests
  //TODO: Finish this
};