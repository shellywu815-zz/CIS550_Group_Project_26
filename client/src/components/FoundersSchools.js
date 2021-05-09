import React from 'react';
import '../style/FoundersSchools.css'; //NEED TO IMPLEMENT THE CORRESPONDING CSS FILE
import 'bootstrap/dist/css/bootstrap.min.css';
import FoundersSchoolsRow from './FoundersSchoolsRow';


export default class FoundersSchools extends React.Component {

  
    constructor(props) {
        super(props);
        this.state = {
            investments: []
        };
        this.submitFoundersSchools = this.submitFoundersSchools.bind(this)
    }
    componentDidMount(){
    	this.submitFoundersSchools()
    };
    
    submitFoundersSchools() {
 //console.log("Query started: this.state.searchString" );
      fetch("http://localhost:8081/foundersSchools", {
        method: "GET"
      })
        .then(res => res.json())
        .then(investmentsList => {
          console.log(investmentsList); //displays your JSON object in the console
          const investmentsDivs = investmentsList.map((investments, i) =>
          <FoundersSchoolsRow
            institution={investments.institution}
            i_amount={investments.i_amount} 
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

        <div className="FoundersSchools">
             
                <div className="jumbotron">
                <div className="h5">Top 30 Schools of Investment Founders</div>
                  <div className="header-container">
                    <div className="headers">
                      <div className="header"><strong>Institution</strong></div>
                      <div className="header"><strong>Amount of Investments Received</strong></div>
                      
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