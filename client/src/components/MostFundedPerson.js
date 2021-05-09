import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MostFundedPersonRow from './MostFundedPersonRow';
import '../style/MostFundedPerson.css'; 


export default class MostFundedPerson extends React.Component {

  
    constructor(props) {
        super(props);
        this.state = {
            founders: [],
        };
        this.submitFounders = this.submitFounders.bind(this);
    }
    componentDidMount() {
      this.submitFounders();
    }
    submitInvestments() {
      fetch("http://localhost:8081/mostFundedPerson", {  
        method: "GET"
      })
        .then(res => res.json())
        .then(foundersList => {
          console.log(foundersList); //displays your JSON object in the console
          const foundersDivs = foundersList.map((founder, i) =>
          <MostFundedPersonRow
            person_name={founder.person_name}
            total={founder.total} 
          /> 
          );
          
          //This saves our HTML representation of the data into the state, which we can call in our render function
          this.setState({
            founders: foundersDivs
          });
          console.log(this.state.founders);
        })
        .catch(err => console.log(err))
    };





  



    render() {
        return (
          <div>

        <div className="MostFundedPerson">
             
                <div className="jumbotron">
                <div className="h5">People Receiving the Most Funding As the Founders of Companies</div>
                  <div className="header-container">
                    <div className="headers">
                      <div className="header"><strong>Founders</strong></div>
                      <div className="header"><strong>Number of Investments Received</strong></div>
                      
                    </div>
                    <div className="results-container" id="results">
                      {this.state.founders}
                    </div>
                  </div>
                
             </div>
            </div>
        
        </div>
           
          );
    }
}