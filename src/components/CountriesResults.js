import React from 'react';

const CountriesResults = ({ countryName, handleOnClick }) => {
	return (
		<div className='container search-container is-centered'>
			<li key={countryName}>
				{countryName}{' '}
				<button
					className='button is-link is-small'
					onClick={() => handleOnClick(countryName)}
				>
					Show
				</button>
			</li>
		</div>
	);
};

export default CountriesResults;
