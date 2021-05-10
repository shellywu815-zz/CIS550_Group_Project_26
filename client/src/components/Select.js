import React from 'react';
import PageNavbar from './PageNavbar';
import '../style/Select.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestMovies extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDecade: "3000000",
			selectedGenre: "4000000",
			decades: [],
			genres: [],
			movies: [],
			selectedFund: "Sequoia",
			funds: [],
			btn: ""
		};

		this.submitDecadeGenre = this.submitDecadeGenre.bind(this);
		this.handleDecadeChange = this.handleDecadeChange.bind(this);
		this.handleGenreChange = this.handleGenreChange.bind(this);
		this.handleFundChange = this.handleFundChange.bind(this);
		this.submitFund = this.submitFund.bind(this);
	};

	componentDidMount() {
		fetch("http://localhost:8081/amounts",
		{
		  method: 'GET' 
		}).then(res => {
		  return res.json();
		}, err => {
		  console.log(err);
		}).then(decadesList => {
		  if (!decadesList) return;
		  const decadesDivs = decadesList.map((decadeObj, i) =>
		  <option className="decadesOption" value={decadeObj.decade}>
			  {decadeObj.decade}
		  </option>
		  );
	
		  this.setState({
			decades: decadesDivs
		  });
		}, err => {
		  console.log(err);
		});

		fetch("http://localhost:8081/amountstwo",
		{
		  method: 'GET' 
		}).then(res => {
		  return res.json();
		}, err => {
		  console.log(err);
		}).then(genresList => {
		  if (!genresList) return;
		  const genresDivs = genresList.map((genreObj, i) =>
		  <option className="genresOption" value={genreObj.name}>
			  {genreObj.name}
		  </option>
		  );
		  this.setState({
			genres: genresDivs
		  });
		}, err => {
		  console.log(err);
		});

		fetch("http://localhost:8081/selectfunds",
		{
		  method: 'GET' 
		}).then(res => {
		  return res.json();
		}, err => {
		  console.log(err);
		}).then(fundsList => {
		  if (!fundsList) return;
		  const FundsDivs = fundsList.map((fundObj, i) =>
		  <option className="genresOption" value={fundObj.name}>
			  {fundObj.name}
		  </option>
		  );
		  this.setState({
			funds: FundsDivs
		  });
		}, err => {
		  console.log(err);
		});

	};

	handleDecadeChange(e) {
		this.setState({
			selectedDecade: e.target.value
		});
	};

	handleGenreChange(e) {
		this.setState({
			selectedGenre: e.target.value
		});
	};

	handleFundChange(e){
		this.setState({
			selectedFund: e.target.value
		});
	}

	submitDecadeGenre() {
		
	const myUrlWithParams = new URL("http://localhost:8081/select/");
	myUrlWithParams.searchParams.append('selectedDecade', this.state.selectedDecade);
	myUrlWithParams.searchParams.append('selectedGenre', this.state.selectedGenre);
		this.setState({
			btn: "1"
		});
		fetch(myUrlWithParams, {
			method: "GET"
		})
			.then(res => res.json())
			.then(BestMoviesRow => {
				console.log(BestMoviesRow); //displays your JSON object in the console
				let recDivs = BestMoviesRow.map((rec, i) => 
					
					<div className="results-container" id="results">
						<div key={i} className="movieResults">
						<div className="title">{rec.title}</div>
						<div className="id">{rec.movie_id}</div>
						<div className="rating">{rec.rating}</div>
				  	</div>
			    	</div>
				);
				
				//This saves our HTML representation of the data into the state, which we can call in our render function
				this.setState({
					movies: recDivs
				});
			})
			.catch(err => console.log(err))
	};

	submitFund(){
		const myUrlWithParams = new URL("http://localhost:8081/selectt/");
		myUrlWithParams.searchParams.append('selectedFund', this.state.selectedFund);
		this.setState({
			btn: "2"
		});
		fetch(myUrlWithParams, {
			method: "GET"
		})
			.then(res => res.json())
			.then(BestMoviesRow => {
				console.log(BestMoviesRow); //displays your JSON object in the console
				let recDivs = BestMoviesRow.map((rec, i) => 
					
					<div className="results-container" id="results">
						<div key={i} className="movieResults">
						<div className="title">{rec.title}</div>
						<div className="id">{rec.movie_id}</div>
						<div className="rating">{rec.rating}</div>
				  	</div>
			    	</div>
				);
				
				//This saves our HTML representation of the data into the state, which we can call in our render function
				this.setState({
					movies: recDivs
				});
			})
			.catch(err => console.log(err))
	}

	render() {
		if (this.state.btn == "1"){
			return (
				<div className="BestMovies">
					
					<PageNavbar active="select" />
	
					<div className="container bestmovies-container">
						<div className="jumbotron">
							Lots of startup receive different amount of fundings, and the fundings are from different types of rounds. Explore below!
						</div>
						<div className="jumbotron">
							<div className="h5">Select Funds By Funding</div>
							<div className="dropdown-container">
								Funds that gave funding between
								<select value={this.state.selectedDecade} onChange={this.handleDecadeChange} className="dropdown" id="decadesDropdown">
									{this.state.decades}
								</select>
								and
								<select value={this.state.selectedGenre} onChange={this.handleGenreChange} className="dropdown" id="genresDropdown">
									{this.state.genres}
								</select>
								<button className="submit-btn" id="submitBtn" onClick={this.submitDecadeGenre}>Submit</button>
								<div>Please make sure you put a smaller amount on the left, and the larger amount on the right</div>
							</div>
	
						</div>
	
						<div className="jumbotron">
						<div className="h5">Select Companies Invested by a Fund that went to IPO</div>
							Please select a fund
									<select value={this.state.selectedFund} onChange={this.handleFundChange} className="dropdown">
										{this.state.funds}
									</select>
									<button className="submit-btn" id="submitBtn" onClick={this.submitFund}>Submit</button>
								</div>
	
						<div className="jumbotron">
							<div className="movies-container">
								<div className="movie">
									  <div className="header"><strong>Fund</strong></div>
									  <div className="header"><strong>Amount Received</strong></div>
									 <div className="header"><strong>Round</strong></div>
								</div>
							<div className="movies-container" id="results">
						  {this.state.movies}
						</div>
					  </div>
					</div>
				  </div>
				</div>
			);
		} else {
			return (
				<div className="BestMovies">
					
					<PageNavbar active="select" />
	
					<div className="container bestmovies-container">
						<div className="jumbotron">
							Lots of startup receive different amount of fundings, and the fundings are from different types of rounds. Explore below!
						</div>
						<div className="jumbotron">
							<div className="h5">Select Funds By Funding</div>
							<div className="dropdown-container">
								Startup that received funding between
								<select value={this.state.selectedDecade} onChange={this.handleDecadeChange} className="dropdown" id="decadesDropdown">
									{this.state.decades}
								</select>
								and
								<select value={this.state.selectedGenre} onChange={this.handleGenreChange} className="dropdown" id="genresDropdown">
									{this.state.genres}
								</select>
								<button className="submit-btn" id="submitBtn" onClick={this.submitDecadeGenre}>Submit</button>
								<div>Please make sure you put a smaller amount on the left, and the larger amount on the right</div>
							</div>
	
						</div>
	
						<div className="jumbotron">
						<div className="h5">Select Companies Invested by a Fund that went to IPO</div>
							Please select a fund
									<select value={this.state.selectedFund} onChange={this.handleFundChange} className="dropdown">
										{this.state.funds}
									</select>
									<button className="submit-btn" id="submitBtn" onClick={this.submitFund}>Submit</button>
								</div>
	
						<div className="jumbotron">
							<div className="movies-container">
								<div className="movie">
									  <div className="header"><strong>Fund</strong></div>
									  <div className="header"><strong>Amount</strong></div>
									 <div className="header"><strong>Startup</strong></div>
								</div>
							<div className="movies-container" id="results">
						  {this.state.movies}
						</div>
					  </div>
					</div>
				  </div>
				</div>
			);
		}
		
	};
};
