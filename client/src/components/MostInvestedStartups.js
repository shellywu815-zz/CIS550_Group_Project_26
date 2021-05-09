import React from 'react';
import '../style/MostInvestedStartups.css'; //NEED TO IMPLEMENT THE CORRESPONDING CSS FILE
import 'bootstrap/dist/css/bootstrap.min.css';
import MostInvestedStartupsRow from './MostInvestedStartupsRow';
import graph from '../t.PNG';

export default class MostInvestedStartups extends React.Component {

  
    constructor(props) {
        super(props);
        this.state = {
            startups: [],
        };
        this.submitStartups = this.submitStartups.bind(this);
    }
    componentDidMount() {
      this.submitStartups();
    }
    submitStartups() {
      fetch("http://localhost:8081/topStartups", {
        method: "GET"
      })
        .then(res => res.json())
        .then(startupsList => {
          console.log(startupsList); //displays your JSON object in the console
          const startupsDivs = startupsList.map((startups, i) =>
          <MostInvestedStartupsRow
            name={startups.name}
            amount={startups.amount} 
          /> 
          );
          
          //This saves our HTML representation of the data into the state, which we can call in our render function
          this.setState({
            startups: startupsDivs
          });
          console.log(this.state.startups);
        })
        .catch(err => console.log(err))
    };





  



    render() {
        return (
          <div>

          <div className="MostInvestedStartups">
               
                  <div className="jumbotron">
                  <div className="h5">Top 10 Invested Startups</div>
                    <div className="header-container">
                      <div className="headers">
                        <div className="header"><strong>Company</strong></div>
                        <div className="header"><strong>Number of Investments Received</strong></div>
                        
                      </div>
                      <div className="results-container" id="results">
                        {this.state.startups}
                      </div>
                      <div className="results-container">
                       <img src={graph} width="700" height="500" />
                       </div>
                    </div>
                  
               </div>
              </div>
          
          </div>
          );
    }
}