import React from 'react';
import '../style/IndustryProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import SearchComRow from './SearchComRow';
import SearchVCRow from './SearchVCRow';

export default class VCProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //searchMode: "VC",
      info: {},
      vcs: [],
      companies: [],
      industry: ""
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
    this.state.ind = this.props.match.params.ind;
    console.log("ind changed to: " + this.state.ind);
    //this.showInfo();
    this.showCompanies();
    this.showVCs();
  };
  
  // Industry info
  showInfo() {

  };


  // Top Companies
  showCompanies() {
    //console.log("Query started: " + this.state.fid);
    fetch("http://localhost:8081/IndustryStartup/" +  this.state.industry, {
			method: "GET"
		})
			.then(res => res.json())
			.then(companiesList => {
				console.log(companiesList); //displays your JSON object in the console
        const companiesDivs = companiesList.map((com, i) =>
        <SearchComRow
          key={i}
          name={com.name}
          founded={com.founded}
          industry={com.industry} 
          total={com.total}
          number={com.number}
        /> 
        );
        
				this.setState({
					companies: companiesDivs
				});
        //console.log(this.state.searchResult);
			})
			.catch(err => console.log(err))
  };

  showVCs() {
    fetch("http://localhost:8081/IndustryVC/" +  this.state.industry, {
			method: "GET"
		})
			.then(res => res.json())
			.then(companiesList => {
				console.log(companiesList); //displays your JSON object in the console
        const companiesDivs = companiesList.map((com, i) =>
        <SearchVCRow
          key={i}
          name={com.name}
          founded={com.founded}
          total={com.total}
          number={com.number}
        /> 
        );
        
				this.setState({
					companies: companiesDivs
				});
        //console.log(this.state.searchResult);
			})
			.catch(err => console.log(err))
  };

  render() {    
    return (
      <div className="Search">

        <PageNavbar active="Search" />
        <div className="container VCProfile-container">
					<div className="jumbotron">
						<div className="h5">Industry: {this.state.industry}</div>
						<br></br>
          </div>
          <div className="jumbotron">
						<div className="header-container">
							<div className="h6">Companies: </div>
							<div className="comheaders">
								<div className="header"><strong>Company Name</strong></div>
								<div className="header"><strong>Date Founded</strong></div>
								<div className="header"><strong>Total Funding</strong></div>
                <div className="header"><strong>Number of Rounds</strong></div>
							</div>
						</div>
						<div className="results-container" id="comresults">
							{this.state.companies}
						</div>
          </div>
          <div className="jumbotron">
          <div className="header-container">
							<div className="h6">Investors: </div>
							<div className="vcheaders">
								<div className="header"><strong>Investor Name</strong></div>
								<div className="header"><strong>Date Founded</strong></div>
								<div className="header"><strong>Total Invested</strong></div>
                <div className="header"><strong>Number of Investments</strong></div>
							</div>
						</div>
						<div className="results-container" id="vcresults">
							{this.state.companies}
						</div>
					</div>
				</div>
      </div>
    );
  };
};
