import React from 'react';

const CountriesResults = ({ countryName, handleOnClick }) => {
	return (
		<div className=''>
			<li key={countryName}>
				{countryName}{' '}
				<button className='' onClick={() => handleOnClick(countryName)}>
					Show
				</button>
			</li>
		</div>
	);
};

export default CountriesResults;
