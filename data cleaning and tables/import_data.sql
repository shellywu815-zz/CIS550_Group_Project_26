CREATE DATABASE investments;
USE investments;

CREATE TABLE Company(
id VARCHAR(16), 
name VARCHAR(255),
normalized_name VARCHAR(255), 
industry VARCHAR(255), 
found_date DATE, 
PRIMARY KEY(id));

CREATE TABLE IPO(
c_id VARCHAR(16), 
ipo_id VARCHAR(16), 
val_amount INT, 
raised_amount INT, 
ipo_date DATE, 
stock_symbol VARCHAR(32)
PRIMARY KEY(ipo_id)),
FOREIGN KEY (c_id) REFERENCES Company(id));

CREATE TABLE Closed(
c_id VARCHAR(16),   
PRIMARY KEY(c_id)),
FOREIGN KEY (c_id) REFERENCES Company(id));

CREATE TABLE Operating(
c_id VARCHAR(16),   
PRIMARY KEY(c_id)),
FOREIGN KEY (c_id) REFERENCES Company(id));

CREATE TABLE Acquired(
acquirer_id VARCHAR(16), 
acquired_id VARCHAR(16), sele
price_amount int(64),
PRIMARY KEY(acquired_id)),
FOREIGN KEY (acquired_id) REFERENCES Company(id)),
FOREIGN KEY (acquirer_id) REFERENCES Company(id));

CREATE TABLE Milestone (
c_id varchar(16), 
id int(32), 
date date, 
description varchar(255), 
source varchar(255),
PRIMARY KEY (c_id, id),
FOREIGN KEY (c_id) REFERENCES Company(id));

CREATE TABLE FinOrg(
id varchar(16), 
name varchar(255),
normalized_name varchar(255), 
founded_at date, 
PRIMARY KEY (id));

CREATE TABLE Fund(
f_id varchar(16),
id int(32),
name varchar(255),
funded_at date,
amount int(64),
source varchar(255),
PRIMARY KEY (f_id, id),
FOREIGN KEY (f_id) REFERENCES FinOrg(id));



CREATE TABLE FinOrgInvestIn(
c_id varchar(16), 
f_id varchar(16), 
date date,
round varchar(32),
amount int(64),
PRIMARY KEY (f_id, c_id, round),
FOREIGN KEY (c_id) REFERENCES Company(id),
FOREIGN KEY (f_id) REFERENCES FinOrg(id));

CREATE TABLE CompanyInvestIn(
invested_id varchar(16), 
investor_id varchar(16), 
date date,
round varchar(32),
amount int(64),
PRIMARY KEY (investor_id , invested_id, round),
FOREIGN KEY (investor_id) REFERENCES Company(id),
FOREIGN KEY (invested_id) REFERENCES Company(id));

CREATE TABLE PersonInvestIn(
invested_id varchar(16), 
investor_id varchar(16), 
date date,
round varchar(32),
amount int(64),
PRIMARY KEY (investor_id , invested_id, round),
FOREIGN KEY (investor_id) REFERENCES Person(id),
FOREIGN KEY (invested_id) REFERENCES Company(id));

#JOIN full_normalized_name = object[normalized_name]
CREATE TABLE Person(
	id varchar(16),
	first_name varchar(255),
	last_name varchar(255),
birthplace varchar(255),
	full_normalized_name varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE Affiliates(
	p_id varchar(16),
	c_id varchar(16),
	is_past int(16),
title varchar(255),
	PRIMARY KEY (p_id, c_id),
	FOREIGN KEY(p_id) REFERENCES Person(id),
	FOREIGN KEY(c_id) REFERENCES Company(id)
);

CREATE TABLE Degree(
	receiver char(16),
	type varchar(32),
	subject varchar(255),
	institution varchar(255),
	PRIMARY KEY(receiver, type, subject, institution),
	FOREIGN KEY(receiver) REFERENCES Person(id)
);

CREATE TABLE YieldCurve(
observation_date char(16),
3m FLOAT(24),
6m FLOAT(24),
1y FLOAT(24),
5y FLOAT(24),
10y FLOAT(24),
is_inverted int(64)
);






LOAD DATA LOCAL INFILE Acquired.csv INTO TABLE Acquired FIELDS TERMINATED by ',' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE Affiliates.csv INTO TABLE Affiliates FIELDS TERMINATED by ',' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE Closed.csv INTO TABLE Closed FIELDS TERMINATED by ',' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE Company.csv INTO TABLE Company FIELDS TERMINATED by ',' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE CompanyInvestIn.csv INTO TABLE CompanyInvestIn FIELDS TERMINATED by ',' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE Degree.csv INTO TABLE Degree FIELDS TERMINATED by ',' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE FinOrg.csv INTO TABLE FinOrg FIELDS TERMINATED by ',' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE FinOrgInvestIn.csv INTO TABLE FinOrgInvestIn FIELDS TERMINATED by ',' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE Fund.csv INTO TABLE Fund FIELDS TERMINATED by ',' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE IPOS.csv INTO TABLE IPOS FIELDS TERMINATED by ',' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE Milestones.csv INTO TABLE Milestones FIELDS TERMINATED by ',' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE Operating INTO TABLE Operating.csv FIELDS TERMINATED by ',' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE Person.csv INTO TABLE Person FIELDS TERMINATED by ',' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE PersonInvestIn.csv INTO TABLE PersonInvestIn FIELDS TERMINATED by ',' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE yield_rate.csv INTO TABLE yield_rate FIELDS TERMINATED by ',' LINES TERMINATED BY '!';