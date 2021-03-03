import React from 'react';

const CountryInfo = ({ country, capital, population, languages, flag }) => {
	return (
		<div className='pl-3.5'>
			<h2 className='text-2xl'>{country}</h2>
			<p>Capital: {capital}</p>
			<p>Population: {population}</p>
			<div className='languages-results'>
				<h3>Languages</h3>
				<ul>{languages}</ul>
			</div>
			<img src={flag} alt='country-flag' width='200' />
		</div>
	);
};

export default CountryInfo;
