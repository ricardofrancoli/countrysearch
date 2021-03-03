import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CountryInfo from './components/CountryInfo';
import CountriesResults from './components/CountriesResults';

const SearchCountry = ({ handleOnChange }) => {
	return (
		<div className='w-full'>
			<h1 className='text-3xl mt-16 mb-12'>
				Type a country name and I will tell you some info 👀
			</h1>
			<form className='text-sm pl-3.5'>
				<input onChange={handleOnChange} placeholder='Find countries...' />
			</form>
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
						<li key={i}>– {language.name}</li>
					))}
					flag={filterCountries[0].flag}
				/>
			);
		} else if (
			filterCountries.length >= 10 &&
			filterCountries.length !== countries.length
		) {
			return <p className='text-sm pl-3.5'>Too many matches, keep typing...</p>;
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
