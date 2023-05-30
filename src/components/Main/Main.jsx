import React, { useEffect, useState } from 'react';
// import './global.css';
import requester from '../../helper/requester';
import FuelStationRows from '../FuelStationRows/FuelStationRows';
import MySelect from '../MySelect/MySelect';
import Loader from '../Loader/Loader';

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
	const [selectedService, setSelectedService] = useState('');
	const [disable, setDisable] = useState(false);
	const [boolPrice, setBoolPrice] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const data = await fetcher(URL);
			setStations(data);
			setLoading(false);
		}
		fetchData();
	}, []);
	const sortFuelStationsByFuelType = (fuelType, fuelStations) => {
		return fuelStations.sort((a, b) => {
			const priceA = a.fuelPrices[fuelType];
			const priceB = b.fuelPrices[fuelType];

			if (priceA < priceB) {
				return -1;
			}
			if (priceA > priceB) {
				return 1;
			}
			return 0;
		});
	};
	const filterStations = async () => {
		setDisable(true);
		setLoading(true);
		const response = await requester(
			'http://localhost:8080/station/filter',
			'POST',
			{
				city: selectedCity === '' ? null : selectedCity,
				fuelType: selectedFuel === '' ? null : selectedFuel,
				companyName: selectedCompany === '' ? null : selectedCompany,
				serviceType: selectedService === '' ? null : selectedService,
			},
			{
				'Content-type': 'application/json; charset=UTF-8',
			}
		);

		boolPrice ? setStations(sortFuelStationsByFuelType(selectedFuel, response)) : setStations(response);
		boolPrice ? console.log('priceRes', sortFuelStationsByFuelType(selectedFuel, response)) : console.log('genRes', response);

		setDisable(false);
		setLoading(false);
	};

	return (
		<div className='container mx-auto text-white flex flex-col'>
			{loading ? <Loader /> : null}
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
							{ value: 'Житомир', name: 'Житомир' },
							{ value: 'Рівне', name: 'Рівне' },
							{ value: 'Суми', name: 'Суми' },
							{ value: 'Запоріжжя', name: 'Запоріжжя' },
							{ value: 'Кропивницький', name: 'Кропивницький' },
							{ value: 'Ужгород', name: 'Ужгород' },
							{ value: 'Дніпро', name: 'Дніпро' },
							{ value: 'Луцьк', name: 'Луцьк' },
							{ value: 'Одеса', name: 'Одеса' },
							{ value: 'Чернівці', name: 'Чернівці' },
							{ value: 'Хмельницький', name: 'Хмельницький' },
							{ value: 'Харків', name: 'Харків' },
							{ value: 'Полтава', name: 'Полтава' },
							{ value: 'Тернопіль', name: 'Тернопіль' },
							{ value: 'Івано-Франківськ', name: 'Івано-Франківськ' },
							{ value: 'Черкаси', name: 'Черкаси' },
							{ value: 'Миколаїв', name: 'Миколаїв' },
							{ value: 'Чернігів', name: 'Чернігів' },
							{ value: 'Херсон', name: 'Херсон' },
							{ value: 'Донецьк', name: 'Донецьк' },
							{ value: 'Луганськ', name: 'Луганськ' },
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

				{selectedFuel ? (
					<div className='pt-1 flex'>
						<div className='mr-1'>Ціна від &gt; до &lt;:</div>
						<input type="checkbox" checked={boolPrice} onChange={() => setBoolPrice(!boolPrice)} />
					</div>)
					: null}

				<div className='pt-1 flex'>
					<div className='mr-1'>Компанія:</div>
					<MySelect
						value={selectedCompany}
						onChange={(company) => setSelectedCompany(company)}
						options={[
							{ value: 'WOG', name: 'WOG' },
							{ value: 'UPG', name: 'UPG' },
							{ value: 'BRSM', name: 'BRSM' },
							{ value: 'SOCAR', name: 'SOCAR' },
						]}
						defaultValue='None'
					/>

				</div>
				<div className='pt-1 flex'>
					<div className='mr-1'>Сервіс:</div>
					<MySelect
						value={selectedService}
						onChange={(service) => setSelectedService(service)}
						options={[
							{ value: 'FOOD', name: 'Food' },
							{ value: 'GOODS', name: 'Goods' },
							{ value: 'CARD_SERVICE', name: 'Card Service' },
							{ value: 'OTHER', name: 'Other' },
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