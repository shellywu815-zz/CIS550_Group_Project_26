CREATE INDEX FinOrgName
ON FinOrg(name)
USING BTREE;

CREATE INDEX CompanyName
ON Company(name)
USING BTREE;

CREATE INDEX CompanyNormalizedName
ON Company(normalized_name)
USING BTREE;

CREATE INDEX amountInvested
ON FinOrgInvestIn (amount)
USING BTREE;

CREATE INDEX IndustryOfCompany
ON Company(industry)
USING HASH;