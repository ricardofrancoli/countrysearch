import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CountryInfo from './components/CountryInfo';
import CountriesResults from './components/CountriesResults';

// const api_key = process.env.REACT_APP_API_KEY;

const SearchCountry = ({ handleOnChange }) => {
	return (
		<div>
			<form>
				Find countries...
				<input onChange={handleOnChange} />
			</form>
		</div>
	);
};

const App = () => {
	const [countries, setCountries] = useState([]);
	const [filterCountries, setFilterCountries] = useState([]);
	// const [weather, setWeather] = useState([]);

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
			console.log('promise fulfilled');
			setCountries(response.data);
		});
	}, []);

	// useEffect(() => {
	// 	if (filterCountries.length > 0) {
	// 		axios
	// 			.get('http://api.weatherstack.com/current', {
	// 				params: {
	// 					access_key: api_key,
	// 					query: filterCountries[0].capital,
	// 				},
	// 			})
	// 			.then((response) => {
	// 				setWeather(response.data);
	// 			});
	// 	}
	// }, [filterCountries]);

	const findCountry = (search) => {
		search = countries.filter(
			(country) => country.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
		);
		return search;
	};

	let selectedCountry;
	const handleOnChange = (event) => {
		selectedCountry = findCountry(event.target.value);
		setFilterCountries(selectedCountry);
	};

	const handleOnClick = (clickedCountry) => {
		selectedCountry = findCountry(clickedCountry);
		setFilterCountries(selectedCountry);
	};

	const handleSearchCountries = () => {
		if (filterCountries.length === 1) {
			return (
				<CountryInfo
					country={filterCountries[0].name}
					capital={filterCountries[0].capital}
					population={filterCountries[0].population}
					languages={filterCountries[0].languages.map((language, i) => (
						<li key={i}>{language.name}</li>
					))}
					flag={filterCountries[0].flag}
					// temperature={weather.current.temperature}
					// weatherIcon={weather.current.weather_icons[0]}
					// wind={weather.current.wind_speed}
				/>
			);
		} else if (
			filterCountries.length >= 10 &&
			filterCountries.length !== countries.length
		) {
			return <p>Too many matches, keep typing...</p>;
		} else if (filterCountries.length < 10 && filterCountries.length >= 1) {
			const countryList = filterCountries.map((country) => (
				<CountriesResults
					key={country.name}
					countryName={country.name}
					handleOnClick={handleOnClick}
				/>
			));
			return countryList;
		}
		return '';
	};

	return (
		<div>
			<SearchCountry handleOnChange={handleOnChange} />
			{handleSearchCountries()}
		</div>
	);
};

export default App;
