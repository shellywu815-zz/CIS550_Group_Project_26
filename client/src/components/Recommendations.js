import React from 'react';
import PageNavbar from './PageNavbar';
import RecommendationsRow from './RecommendationsRow';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Recommendations extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name, and the list of recommended movies.
		this.state = {
			movieName: "",
			recMovies: []
		};

		this.handleMovieNameChange = this.handleMovieNameChange.bind(this);
		this.submitMovie = this.submitMovie.bind(this);
	};

	handleMovieNameChange(e) {
		this.setState({
			movieName: e.target.value
		});
	};

	/* ---- Q2 (Recommendations) ---- */
	// Hint: Name of movie submitted is contained in `this.state.movieName`.
	submitMovie() {

		fetch("http://localhost:8081/recommendations/" + this.state.movieName, {
			method: "GET"
		})
			.then(res => res.json())
			.then(RecommendationsRow => {
				console.log(RecommendationsRow); //displays your JSON object in the console
				let recDivs = RecommendationsRow.map((rec, i) => 
					
					<div className="results-container" id="results">
						<div key={i} className="movieResults">
						<div className="title">{rec.title}</div>
						<div className="id">{rec.movie_id}</div>
						<div className="rating">{rec.rating}</div>
            			<div className="votes">{rec.num_ratings}</div>
				  	</div>
			    	</div>
				);
				
				//This saves our HTML representation of the data into the state, which we can call in our render function
				this.setState({
					recMovies: recDivs
				});
			})
			.catch(err => console.log(err))
		
	};

	
	render() {
		return (
			<div className="Recommendations">
				<PageNavbar active="recommendations" />

				<div className="container recommendations-container">
					<div className="jumbotron">
						<div className="h5">Recommendations</div>
						<br></br>
						<div className="input-container">
							<input type='text' placeholder="Enter Movie Name" value={this.state.movieName} onChange={this.handleMovieNameChange} id="movieName" className="movie-input"/>
							<button id="submitMovieBtn" className="submit-btn" onClick={this.submitMovie}>Submit</button>
						</div>
						<div className="header-container">
							<div className="h6">You may like ...</div>
							<div className="headers">
								<div className="header"><strong>Title</strong></div>
								<div className="header"><strong>Movie ID</strong></div>
								<div className="header"><strong>Rating</strong></div>
								<div className="header"><strong>Vote Count</strong></div>
							</div>
						</div>
						<div className="results-container" id="results">
							{this.state.recMovies}
						</div>
					</div>
				</div>
			</div>
		);
	};
};
