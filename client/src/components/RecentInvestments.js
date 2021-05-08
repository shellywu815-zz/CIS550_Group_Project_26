import React from 'react';
import '../style/RecentInvestments.css'; //NEED TO IMPLEMENT THE CORRESPONDING CSS FILE
import 'bootstrap/dist/css/bootstrap.min.css';
import RecentInvestmentsRow from './RecentInvestmentsRow';


export default class RecentInvestments extends React.Component {

  
    constructor(props) {
        super(props);
        this.state = {
            investments: []
        };
        this.submitRecentInvestments = this.submitRecentInvestments.bind(this)
    }
    componentDidMount(){
    	this.submitRecentInvestments()
    };
    
    submitRecentInvestments() {
 //console.log("Query started: this.state.searchString" );
      fetch("http://localhost:8081/recentInvestments", {
        method: "GET"
      })
        .then(res => res.json())
        .then(investmentsList => {
          console.log(investmentsList); //displays your JSON object in the console
          const investmentsDivs = investmentsList.map((investments, i) =>
          <RecentInvestmentsRow
            number={investments.number}
            year={investments.year} 
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
             <div className="h5">Recent Investments</div>
                <div className="jumbotron">
                  <div className="header-container">
                    <div className="headers">
                      <div className="header"><strong>Year</strong></div>
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
  };
}