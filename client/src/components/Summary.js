import React from 'react';
import '../style/Summary.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import RecentInvestmentsRow from './RecentInvestmentsRow';
import RecentInvestments from './RecentInvestments';
import TotalInvestmentsByMajors from './TotalInvestmentsByMajors';
import MostInvestedStartups from './MostInvestedStartups';
import FoundersSchools from './FoundersSchools';
import InvestmentYears from './InvestmentYears';
import AverageInvestmentsFoundingTime from './AverageInvestmentsFoundingTime';


export default class Summary extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of keywords,
    // and a list of movies for a specified keyword.
    
  };

  // React function that is called when the page load.
  

  render() {    
    return (
      <div >

        <PageNavbar active="summary" />

        <br />
        <RecentInvestments />
        <MostInvestedStartups />
        <InvestmentYears />
        <TotalInvestmentsByMajors />
        <FoundersSchools />
        <AverageInvestmentsFoundingTime />
      </div>
    );
  };
};
