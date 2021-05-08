import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import KeywordButton from './KeywordButton';
//import DashboardMovieRow from './DashboardMovieRow';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of keywords,
    // and a list of movies for a specified keyword.
    this.state = {
      keywords: [],
      movies: []
    };

    this.showMovies = this.showMovies.bind(this);
  };

  // React function that is called when the page load.
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

  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. 
  The keyword is passed in as a parameter to this function. 
  showMovies(keyword) should set this.state.movies to a list of <DashboardMovieRow />s. 
  The information with which the <DashboardMovieRow />s should be populated will arrive from the server. 
  When the page is rendered, the <div className=”results-container” id=”results”> in Dashboard.js is populated with the list.
*/
  showMovies(keyword) {
    fetch("http://localhost:8081/keywords/" + keyword, {
			method: "GET"
		})
			.then(res => res.json())
			.then(DashboardMovieRow => {
				console.log(DashboardMovieRow); //displays your JSON object in the console
				let moviesDivs = DashboardMovieRow.map((movie, i) => 
					<div className="results-container " id="results">
						<div key={i} className="movie">
						<div className="title">{movie.title}</div>
						<div className="rating">{movie.rating}</div>
            <div className="votes">{movie.num_ratings}</div>
				  </div>
			    </div>
				);
        
				//This saves our HTML representation of the data into the state, which we can call in our render function
				this.setState({
					movies: moviesDivs
				});
			})
			.catch(err => console.log(err))
  };

  render() {    
    return (
      <div className="Dashboard">

        <PageNavbar active="Select" />

        <br />
        <b>This is the select page</b>
      </div>
    );
  };
};
