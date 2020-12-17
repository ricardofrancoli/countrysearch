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

const App = () => {
	const [countries, setCountries] = useState([]);
	const [filterCountries, setFilterCountries] = useState([]);
	const [searchCountries, setSearchCountries] = useState('');

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
			console.log('promise fulfilled');
			setCountries(response.data);
			console.log(countries);
		});
	}, []);

	const handleOnChange = (event) => {
		const search = event.target.value;
		setSearchCountries(search);
		const filtered = countries.filter(
			(country) => country.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
		);
		setFilterCountries(filtered);
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
		}

		if (searchCountries.length === 0) {
			return '';
		}

		if (filterCountries.length >= 5) {
			return <p>Too many matches, keep typing...</p>;
		}

		const countryList = filterCountries.map((country, i) => (
			<li key={i}>{country.name}</li>
		));
		return countryList;
	};

	return (
		<div>
			<SearchCountry handleOnChange={handleOnChange} />
			{handleSearchCountries()}
		</div>
	);
};

export default App;
