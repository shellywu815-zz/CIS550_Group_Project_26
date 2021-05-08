import React from 'react';
import '../style/Dashboard.css'; //NEED TO IMPLEMENT THE CORRESPONDING CSS FILE
import 'bootstrap/dist/css/bootstrap.min.css';
import MostInvestedStartupsRow from './MostInvestedStartupsRow';


export default class MostInvestedStartups extends React.Component {

  
    constructor(props) {
        super(props);
        this.state = {
            startups: [],
            searchResult:[]
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
            searchResult: startupsDivs
          });
          console.log(this.state.searchResult);
        })
        .catch(err => console.log(err))
    };





  



    render() {
        return (
            <div className="MostInvestedStartups">
      
      
              <div className="container startups-container">
                
      
                <div className="jumbotron">
                  <div className="startups-container">
                    <div className="startups-header">
                      <div className="header-lg"><strong>name</strong></div>
                      <div className="header"><strong>amount</strong></div>
                      
                    </div>
                    <div className="results-container" id="results">
                      {this.state.searchResult}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
    }
}