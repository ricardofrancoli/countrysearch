import React from 'react';

const CountriesResults = ({ countryName, handleOnClick }) => {
	return (
		<div className='w-full search-results-container'>
			<li className='search-result' key={countryName}>
				<button
					className='text-sm pl-3.5 country-result'
					onClick={() => handleOnClick(countryName)}
				>
					{countryName}{' '}
				</button>
			</li>
		</div>
	);
};

export default CountriesResults;
