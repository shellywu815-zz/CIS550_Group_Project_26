import React from 'react';
import '../style/InvestmentYears.css'; //NEED TO IMPLEMENT THE CORRESPONDING CSS FILE
import 'bootstrap/dist/css/bootstrap.min.css';
import InvestmentYearsRow from './InvestmentYearsRow';
<<<<<<< Updated upstream
=======
import graph from '../g.PNG';
>>>>>>> Stashed changes
//import {Chart} from 'chart.js';


export default class InvestmentYears extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            investments: []
        };
        this.submitInvestmentYears = this.submitInvestmentYears.bind(this)
    }
    componentDidMount(){
      this.submitInvestmentYears()
    };


    submitInvestmentYears() {
 //console.log("Query started: this.state.searchString" );
      fetch("http://localhost:8081/investmentYears", {
        method: "GET"
      })
        .then(res => res.json())
        .then(investmentsList => {
          console.log(investmentsList); //displays your JSON object in the console
          const investmentsDivs = investmentsList.map((investments, i) =>
          <InvestmentYearsRow
            year={investments.year}
            amount={investments.amount}
          /> 
          );


          //This saves our HTML representation of the data into the state, which we can call in our render function
          this.setState({
            investments: investmentsDivs
          });
          console.log(this.state.investments);

        })   

        .catch(err => console.log(err))
    };


render() {
        return (
      <div >

        <div className="RecentInvestments">

                <div className="jumbotron">
                <div className="h5">Investment vs. Year</div>
                  <div className="header-container">
                    <div className="headers">
                      <div className="header"><strong>Year</strong></div>
                      <div className="header"><strong>Amount of Investments Received</strong></div> 
                    </div>
                    <div className="results-container" id="results">
                      {this.state.investments}
                    </div>
                    <div className="results-container">
                      <img src={graph} width="700" height="500" />
                    </div>

                  </div>

             </div>
            </div>

      </div>
    );
  };
}
