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

	const availableFuels = data?.availableFuelsDescription?.split('\n').filter((line) => !!line);

	return (
		<>
			{/* <h1 className={styles.title}>{data.name}</h1>
			<p className={styles.text}>{data.address}</p>
			<p className={styles.text}><span>Гаряча лінія:</span> {data.address}</p>
			<p className={styles.text}><span>Доступне пальне:</span> {data.availableFuelsDescription}</p>
			<p className={styles.text}><span>Додаткова інформація:</span> {data.additionalInfo}</p>

			<Link to={data.link}>{data.linkName}</Link>
			<p className={styles.text}>{data.lastUpdate}</p>
			<button className={styles.btn} onClick={buildRoute}>Побудувати маршрут</button> */}
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				<div className="flex flex-col">
					<div className="flex flex-col">
						<strong className="mt-1">{data?.name}</strong>
						<strong className="mt-1">{data?.address}</strong>
					</div>
					<div className="flex mt-1">
						<strong>Гаряча лінія:</strong>
						<p className="pl-1 text-blue-600 underline">{data?.hotLine}</p>
					</div>
					<div>
						<p></p>
					</div>
					<div className="flex mt-1">
						<strong>Графік роботи: </strong>
						<p className="pl-1">{data?.schedule}</p>
					</div>
					{availableFuels?.length > 0 ? (
						<div className="flex flex-col mt-1">
							<div>
								<strong>Доступне пальне:</strong>
							</div>
							<div className="pl-10">
								<ul>
									{availableFuels?.map((info, i) => (
										<li key={i} className="list-disc">
											{info}
										</li>
									))}
								</ul>
							</div>
						</div>
					) : (
						<></>
					)}
					{data?.additionalInfo ? (
						<div className="flex flex-col mt-1">
							<strong>Додаткова інформація:</strong>
							<div className="pl-10">{data.additionalInfo}</div>
						</div>
					) : (
						<></>
					)}
					<div className="flex justify-between mt-4">
						<div className="border rounded-md">
							<Link to={data?.link || '/error'} target="_blank" className="p-2 underline text-blue-600">
								{data?.linkName}
							</Link>
						</div>
						<div className={'border rounded-md ' + (data?.lastUpdate ? '' : 'hidden')}>
							<span className="p-2">{data?.lastUpdate}</span>
						</div>
					</div>
					<button className={styles.btn} onClick={buildRoute}>Побудувати маршрут</button>
				</div>
			</div>
		</>
	);
};

export default InfoLayout;