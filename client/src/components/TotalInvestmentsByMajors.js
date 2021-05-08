import React from 'react';
//import '../style/Dashboard.css'; //NEED TO IMPLEMENT THE CORRESPONDING CSS FILE
import 'bootstrap/dist/css/bootstrap.min.css';
import TotalInvestmentsByMajorsRow from './TotalInvestmentsByMajorsRow';
import '../style/TotalInvestmentsByMajors.css'; 


export default class TotalInvestmentsByMajors extends React.Component {

  
    constructor(props) {
        super(props);
        this.state = {
            investments: [],
        };
        this.submitInvestments = this.submitInvestments.bind(this);
    }
    componentDidMount() {
      this.submitInvestments();
    }
    submitInvestments() {
 //console.log("Query started: this.state.searchString" );
      fetch("http://localhost:8081/topInvestors", {
        method: "GET"
      })
        .then(res => res.json())
        .then(investmentsList => {
          console.log("hi");
          console.log(investmentsList); //displays your JSON object in the console
          const investmentsDivs = investmentsList.map((invst, i) =>
          <TotalInvestmentsByMajorsRow
            major={invst.major}
            investments={invst.investments} 
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
          <div>

        <div className="TotalInvestmentsByMajors">
             
                <div className="jumbotron">
                <div className="h5">Total Investments By Majors</div>
                  <div className="header-container">
                    <div className="headers">
                      <div className="header"><strong>Major</strong></div>
                      <div className="header"><strong>Number of Investments Received</strong></div>
                      
                    </div>
                    <div className="results-container" id="results">
                      {this.state.investments}
                    </div>
                  </div>
                
             </div>
            </div>
        
        </div>
           
          );
    }
}