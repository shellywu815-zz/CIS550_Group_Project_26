import React from 'react';
import '../style/VCProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
//import KeywordButton from './KeywordButton';
import VCInvestsRow from './VCInvestsRow';

export default class VCProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //searchMode: "VC",
      info: {},
      investments: [],
      fid: ""
    };

		//this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
		//this.submitSearch = this.submitSearch.bind(this);
  };

  /*
  handleSearchStringChange(e) {
		this.setState({
			searchString: e.target.value
		});
    //console.log("Search String updated:" + this.state.searchString);
	};

  
  submitSearch() {
    //console.log("Search submitted: " +  this.state.searchString);
    if (this.state.searchMode == "VC") {
      this.showVC();
    }
    else {
      //TODO
    }
  };
  */


  // React function that is called when the page load.
  
  componentDidMount() {
    //this.setState( {
    //  fid: this.props.match.params.fid
    //});
    this.state.fid = this.props.match.params.fid;
    console.log("fid changed to: " + this.state.fid);
    //this.showInfo();
    this.showInvestments();
  };
  
  // VC info
  showInfo() {
    console.log("Query started: this.state.searchString" );
    fetch("http://localhost:8081/VcInvests/" +  this.state.fid, {
			method: "GET"
		})
			.then(res => res.json())
			.then(companiesList => {
				console.log(companiesList); //displays your JSON object in the console
        const companiesDivs = companiesList.map((com, i) =>
        <VCInvestsRow
          key={i}
          name={com.name}
          industry={com.industry} 
          round={com.round}
          amount={com.amount}
          date={com.date} 
        /> 
        );
        
				//This saves our HTML representation of the data into the state, which we can call in our render function
				this.setState({
					searchResult: companiesDivs
				});
        console.log(this.state.searchResult);
			})
			.catch(err => console.log(err))
  };


  // VC investments
  showInvestments() {
    console.log("Query started: " + this.state.fid);
    fetch("http://localhost:8081/VcInvests/" +  this.state.fid, {
			method: "GET"
		})
			.then(res => res.json())
			.then(companiesList => {
				console.log(companiesList); //displays your JSON object in the console
        const companiesDivs = companiesList.map((com, i) =>
        <VCInvestsRow
          key={i}
          name={com.name}
          industry={com.industry} 
          round={com.round}
          amount={com.amount}
          date={com.date} 
        /> 
        );
        
				this.setState({
					searchResult: companiesDivs
				});
        console.log(this.state.searchResult);
			})
			.catch(err => console.log(err))
  };

  render() {    
    return (
      <div className="Search">

        <PageNavbar active="Search" />
        <div className="container VCProfile-container">
					<div className="jumbotron">
						<div className="h5">Search {this.state.fid}</div>
						<br></br>
						<div className="header-container">
							<div className="h6">Investments: </div>
							<div className="headers">
								<div className="header"><strong>Company Name</strong></div>
								<div className="header"><strong>Industry</strong></div>
								<div className="header"><strong>Financing Round</strong></div>
								<div className="header"><strong>Amount Invested</strong></div>
                <div className="header"><strong>Date</strong></div>
							</div>
						</div>
						<div className="results-container" id="results">
							{this.state.searchResult}
						</div>
					</div>
				</div>
      </div>
    );
  };
};
