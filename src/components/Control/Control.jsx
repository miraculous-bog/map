import React, { useState } from "react";
import styles from './control.module.css';

const Control = ({ onSelect, closeRoute }) => {

	const [fuelType, setFuelType] = useState('');
	const [company, setCompany] = useState('');

	const handleFuelTypeChange = (event) => {
		setFuelType(event.target.value);
		onSelect(event.target.value, company);
	};

	const handleCompanyChange = (event) => {
		setCompany(event.target.value);
		onSelect(fuelType, event.target.value);
	};

	return (
		<div className={styles.container}>
			<select className={styles.select} value={fuelType} onChange={handleFuelTypeChange}>
				<option value="">Select fuel type</option>
				<option value="DIESEL">DIESEL</option>
				<option value="GAS">GAS</option>
				<option value="A92">A92</option>
				<option value="A95">A95</option>
			</select>

			<select className={styles.select} value={company} onChange={handleCompanyChange}>
				<option value="">Select company</option>
				<option value="ABIAC">ABIAC</option>
				<option value="BRSM">BRSM</option>
				<option value="OKKO">OKKO</option>
				<option value="SOCAR">SOCAR</option>
				<option value="UPG">UPG</option>
				<option value="WOG">WOG</option>
			</select>
			<button className={styles.buttons} onClick={closeRoute}>Вимк. шлях</button>
		</div>
	);
}

export default Control;