import React, { useState } from "react";
import styles from './control.module.css';

const Control = ({ onSelect, closeRoute }) => {

	const [fuelType, setFuelType] = useState('');
	const [company, setCompany] = useState('');
	const [service, setService] = useState('');

	const handleFuelTypeChange = (event) => {
		setFuelType(event.target.value);
		onSelect(event.target.value, company, service);
	};

	const handleCompanyChange = (event) => {
		setCompany(event.target.value);
		onSelect(fuelType, event.target.value, service);
	};
	const handleServiceChange = (event) => {
		setService(event.target.value);
		onSelect(fuelType, company, event.target.value);
	};
	return (
		<div className={styles.container}>
			<label>
				Type Fuel
				<select className={styles.select} value={fuelType} onChange={handleFuelTypeChange}>
					<option value="">None</option>
					<option value="DIESEL">DIESEL</option>
					<option value="GAS">GAS</option>
					<option value="A92">A92</option>
					<option value="A95">A95</option>
				</select>
			</label>
			<label>
				Type Station
				<select className={styles.select} value={company} onChange={handleCompanyChange}>
					<option value="">None</option>
					<option value="BRSM">BRSM</option>
					<option value="SOCAR">SOCAR</option>
					<option value="UPG">UPG</option>
					<option value="WOG">WOG</option>
				</select>
			</label>
			<label>
				Type Service
				<select className={styles.select} value={service} onChange={handleServiceChange}>
					<option value="">None</option>
					<option value="FOOD">Food</option>
					<option value="GOODS">Goods</option>
					<option value="CAR_SERVICE">Car Service</option>
					<option value="OTHER">Other</option>
				</select>
			</label>
			<button className={styles.buttons} onClick={closeRoute}>Вимк. шлях</button>
		</div>
	);
}

export default Control;