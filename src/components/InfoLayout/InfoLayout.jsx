import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './infoLayout.module.css'

const InfoLayout = ({ id, buildRoute }) => {

	const [data, setData] = useState({});

	const filterStations = async () => {
		try {
			const url = `http://localhost:8080/station/details/${id}`;
			const response = await fetch(url, {
				method: 'GET',
				// Додайте необхідні заголовки, тіло запиту і інші параметри, які вам потрібні
			});

			if (response.ok) {
				const dataObj = await response.json();
				// Обробка отриманих даних
				setData(dataObj);
				console.log(data);
			} else {
				console.log('Помилка запиту:', response.status);
			}
		} catch (error) {
			console.log('Сталася помилка:', error);
		}
	};

	useEffect(() => {
		filterStations();
	}, []);

	return (
		<>
			<h1 className={styles.title}>{data.name}</h1>
			<p className={styles.text}>{data.address}</p>
			<p className={styles.text}><span>Гаряча лінія:</span> {data.address}</p>
			<p className={styles.text}><span>Доступне пальне:</span> {data.availableFuelsDescription}</p>
			<p className={styles.text}><span>Додаткова інформація:</span> {data.additionalInfo}</p>

			<Link to={data.link}>{data.linkName}</Link>
			<p className={styles.text}>{data.lastUpdate}</p>
			<button className={styles.btn} onClick={buildRoute}>Побудувати маршрут</button>
		</>
	);
};

export default InfoLayout;