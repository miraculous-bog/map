import React from 'react';

const MySelect = ({ options, defaultValue, value, onChange }) => {
	return (
		<select className="form-select py-0" value={value} onChange={(e) => onChange(e.target.value)}>
			<option value="">{defaultValue}</option>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.name}
				</option>
			))}
		</select>
	);
};

export default MySelect;