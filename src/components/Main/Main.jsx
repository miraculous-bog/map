import React, { useEffect, useState } from 'react';
// import requester from '../utils/requester';
import requester from '../../helper/requester';
import './globals.css';
import FuelStationRows from '../FuelStationRows/FuelStationRows';
import MySelect from '../MySelect/MySelect';

const colNames = [
	{ name: 'АЗС', w: '[9%]', ml: 0 },
	{ name: 'Адреса', w: '[55%]', ml: 1 },
	{ name: 'А92', w: '[9%]', ml: 1 },
	{ name: 'А95', w: '[9%]', ml: 1 },
	{ name: 'ДП', w: '[9%]', ml: 1 },
	{ name: 'Газ', w: '[9%]', ml: 1 },
];

const URL = 'http://localhost:8080/station';
const fetcher = (path) => fetch(path).then(response => response.json());

const Main = () => {
	const [stations, setStations] = useState([]);
	const [selectedCity, setSelectedCity] = useState('');
	const [selectedFuel, setSelectedFuel] = useState('');
	const [selectedCompany, setSelectedCompany] = useState('');
	const [disable, setDisable] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const data = await fetcher(URL);
			setStations(data);
		}
		fetchData();
	}, []);

	const filterStations = async () => {
		setDisable(true);
		const response = await requester(
			'http://localhost:8080/station/filter',
			'POST',
			{
				city: selectedCity === '' ? null : selectedCity,
				fuelType: selectedFuel === '' ? null : selectedFuel,
				companyName: selectedCompany === '' ? null : selectedCompany,
			},
			{
				'Content-type': 'application/json; charset=UTF-8',
			}
		);
		setStations(response);
		setDisable(false);
	};

	return (
		<div className='container mx-auto text-white flex flex-col'>
			<div className='mt-4 h-12 w-[95%] bg-slate-300 mx-auto flex text-black justify-between items-center flex-wrap'>
				<div className='pt-1 ml-5 flex'>
					<div className='mr-1'>Місто:</div>
					<MySelect
						value={selectedCity}
						onChange={(city) => setSelectedCity(city)}
						options={[
							{ value: 'Вінниця', name: 'Вінниця' },
							{ value: 'Київ', name: 'Київ' },
							{ value: 'Львів', name: 'Львів' },
							// Other city options...
						]}
						defaultValue='None'
					/>
				</div>
				<div className='pt-1 flex'>
					<div className='mr-1'>Паливо:</div>
					<MySelect
						value={selectedFuel}
						onChange={(fuel) => setSelectedFuel(fuel)}
						options={[
							{ value: 'A95', name: 'A95' },
							{ value: 'A92', name: 'A92' },
							{ value: 'GAS', name: 'GAS' },
							{ value: 'DIESEL', name: 'DIESEL' },
						]}
						defaultValue='None'
					/>
				</div>
				<div className='pt-1 flex'>
					<div className='mr-1'>Компанія:</div>
					<MySelect
						value={selectedCompany}
						onChange={(company) => setSelectedCompany(company)}
						options={[
							{ value: 'WOG', name: 'WOG' },
							{ value: 'UPG', name: 'UPG' },
						]}
						defaultValue='None'
					/>
				</div>
				<div className='pt-1 mr-5 flex'>
					<button
						className='border rounded-md border-green-700 p-1 text-white bg-green-600 hover:bg-green-700'
						onClick={filterStations}
						disabled={disable}
					>
						Пошук
					</button>
				</div>
			</div>
			<div className='mt-4 w-[95%] mx-auto h-12 flex text-lg'>
				{colNames.map((c, i) => (
					<div
						key={i}
						className={`bg-green-700 h-full text-center pt-2 ml-${c.ml} w-${c.w}`}
					>
						{c.name}
					</div>
				))}
			</div>
			<FuelStationRows fuelStations={stations} />
		</div>
	);
};

export default Main;