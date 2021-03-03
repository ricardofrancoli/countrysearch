import React from 'react';

const CountryInfo = ({
	country,
	capital,
	population,
	languages,
	flag,
	// temperature,
	// weatherIcon,
	// wind,
}) => {
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
			{/* <h3>Weather in {capital}</h3>
			<p>Temperature: {temperature}</p>
			<img src={weatherIcon} alt='weather-icon' width='100' />
			<p>Wind: {wind}</p> */}
		</div>
	);
};

export default CountryInfo;
