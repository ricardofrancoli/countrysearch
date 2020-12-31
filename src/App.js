import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const CountryInfo = ({ country, capital, population, languages, flag }) => {
	return (
		<div>
			<h2>{country}</h2>
			<p>Capital: {capital}</p>
			<p>Population: {population}</p>
			<h4>Languages</h4>
			<ul>{languages}</ul>
			<img src={flag} alt='country-flag' width='200' />
		</div>
	);
};

const CountriesResults = ({ countryName, handleOnClick }) => {
	return (
		<div>
			<li key={countryName}>
				{countryName}{' '}
				<button id={countryName} onClick={() => handleOnClick(countryName)}>
					Show
				</button>
			</li>
		</div>
	);
};

const App = () => {
	const [countries, setCountries] = useState([]);
	const [filterCountries, setFilterCountries] = useState([]);

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
			console.log('promise fulfilled');
			setCountries(response.data);
		});
	}, []);

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
