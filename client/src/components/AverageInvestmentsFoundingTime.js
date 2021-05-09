import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AverageInvestmentsFoundingTimeRow from './AverageInvestmentsFoundingTimeRow';
import '../style/AverageInvestmentsFoundingTime.css'; 


export default class AverageInvestmentsFoundingTime extends React.Component {

  
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
        };
        this.submitInvestments = this.submitInvestments.bind(this);
    }
    componentDidMount() {
      this.submitInvestments();
    }
    submitInvestments() {
      fetch("http://localhost:8081/averageFundReceived", {  
        method: "GET"
      })
        .then(res => res.json())
        .then(companiesList => {
          console.log(companiesList); //displays your JSON object in the console
          const companiesDivs = companiesList.map((company, i) =>
          <AverageInvestmentsFoundingTimeRow
            inverted={company.inverted}
            average_total_inv={company.average_total_inv} 
            num_founded={company.num_founded} 
          /> 
          );
          
          //This saves our HTML representation of the data into the state, which we can call in our render function
          this.setState({
            companies: companiesDivs
          });
          console.log(this.state.companies);
        })
        .catch(err => console.log(err))
    };





  



    render() {
        return (
          <div>

        <div className="AverageInvestmentsFoundingTime">
             
                <div className="jumbotron">
                <div className="h5">Average Investments Received by Companies Based On Founding Time</div>
                  <div className="header-container">
                    <div className="headers">
                      <div className="header"><strong>Inverted</strong></div>
                      <div className="header"><strong>Average Total Investments</strong></div>
                      <div className="header"><strong>Number</strong></div>
                      
                    </div>
                    <div className="results-container" id="results">
                      {this.state.companies}
                    </div>
                  </div>
                
             </div>
            </div>
        
        </div>
           
          );
    }
}