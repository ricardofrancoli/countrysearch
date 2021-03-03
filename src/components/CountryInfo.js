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
		<div className=''>
			<h2>{country}</h2>
			<p>Capital: {capital}</p>
			<p>Population: {population}</p>
			<h4>Languages</h4>
			<ul>{languages}</ul>
			<img src={flag} alt='country-flag' width='200' />
			{/* <h3>Weather in {capital}</h3>
			<p>Temperature: {temperature}</p>
			<img src={weatherIcon} alt='weather-icon' width='100' />
			<p>Wind: {wind}</p> */}
		</div>
	);
};

export default CountryInfo;
