import React from 'react';
import '../style/VCProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
//import KeywordButton from './KeywordButton';
import StartupFundingRow from './StartupFundingRow';

export default class StartupProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //searchMode: "VC",
      info: {},
      investments: [],
      cid: ""
    };

		//this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
		//this.submitSearch = this.submitSearch.bind(this);
  };
  
  componentDidMount() {
    //this.setState( {
    //  fid: this.props.match.params.fid
    //});
    this.state.cid = this.props.match.params.cid;
    //console.log("cid changed to: " + this.state.cid);
    //this.showInfo();
    this.showInvestments();
  };
  
  // Company info
  showInfo() {

  };


  // investments received
  showInvestments() {
    //console.log("Query started: " + this.state.cid);
    fetch("http://localhost:8081/VcInvests/" +  this.state.cid, {
			method: "GET"
		})
			.then(res => res.json())
			.then(fundsList => {
				//console.log(fundsList); //displays your JSON object in the console
        const fundsDivs = fundsList.map((com, i) =>
        <StartupFundingRow
          key={i}
          name={com.name}
          round={com.round}
          amount={com.amount}
          date={com.date} 
        /> 
        );
        
				this.setState({
					investments: fundsDivs
				});
        //console.log(this.state.investments);
			})
			.catch(err => console.log(err))
  };

  render() {    
    return (
      <div className="Startup Profile">

        <PageNavbar active="Search" />
        <div className="container StartupProfile-container">
					<div className="jumbotron">
						<div className="h5">Startup {this.state.cid}</div>
						<br></br>
          </div>
          <div className="jumbotron">
						<div className="header-container">
							<div className="h6">Investments received: </div>
							<div className="headers">
								<div className="header"><strong>Financing Round</strong></div>
								<div className="header"><strong>Investor name</strong></div>
								<div className="header"><strong>Amount Received</strong></div>
                <div className="header"><strong>Date</strong></div>
							</div>
						</div>
						<div className="results-container" id="results">
							{this.state.investments}
						</div>
					</div>
				</div>
      </div>
    );
  };
};
