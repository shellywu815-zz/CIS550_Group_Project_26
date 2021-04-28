import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import KeywordButton from './KeywordButton';
import SearchVCRow from './SearchVCRow';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of keywords,
    // and a list of movies for a specified keyword.
    this.state = {
      searchMode: "VC",
      searchString: "",
      searchResult: []
    };

		this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
		this.submitSearch = this.submitSearch.bind(this);
  };

  handleSearchStringChange(e) {
		this.setState({
			searchString: e.target.value
		});
	};

  submitSearch() {
    if (this.searchMode == "VC") {
      this.showVC();
    }
    else {
      //TODO
    }
  };


  // React function that is called when the page load.
  /*
  componentDidMount() {
    fetch("http://localhost:8081/keywords",
    {
      method: 'GET' 
    }).then(res => {
      return res.json();
    }, err => {

      console.log(err);
    }).then(keywordsList => {
      if (!keywordsList) return;

      const keywordsDivs = keywordsList.map((keywordObj, i) =>
        <KeywordButton 
          id={"button-" + keywordObj.kwd_name} 
          onClick={() => this.showMovies(keywordObj.kwd_name)} 
          keyword={keywordObj.kwd_name} 
        /> 
      );
      this.setState({
        keywords: keywordsDivs
      });
    }, err => {
      console.log(err);
    });
  };
  */

  /* ---- VC Search ---- */

  showVC() {
    fetch("http://localhost:8081/searchVC/" + this.searchString, {
			method: "GET"
		})
			.then(res => res.json())
			.then(companiesList => {
				//console.log(companiesList); //displays your JSON object in the console
        const companiesDivs = companiesList.map((com, i) =>
        <SearchVCRow
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
			})
			.catch(err => console.log(err))
  };

  render() {    
    return (
      <div className="Search">

        <PageNavbar active="Search" />
        <div className="container VCSearch-container">
					<div className="jumbotron">
						<div className="h5">Search</div>
						<br></br>
						<div className="input-container">
							<input type='text' placeholder="" value={this.state.searchString} onChange={this.handleSearchStringChange} id="searchString" className="search-input"/>
							<button id="submitMovieBtn" className="submit-btn" onClick={this.submitSearch}>Search</button>
						</div>
						<div className="header-container">
							<div className="h6">Investments of: </div>
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
