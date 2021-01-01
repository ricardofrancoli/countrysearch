import React from 'react';

const CountriesResults = ({ countryName, handleOnClick }) => {
	return (
		<div>
			<li key={countryName}>
				{countryName}{' '}
				<button onClick={() => handleOnClick(countryName)}>Show</button>
			</li>
		</div>
	);
};

export default CountriesResults;
