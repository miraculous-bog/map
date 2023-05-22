import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, DirectionsRenderer } from 'react-google-maps';
import Control from '../Control';
import Loader from '../Loader/Loader';
import InfoLayout from '../InfoLayout/InfoLayout';
import ABIAC from '../../img/ABIAC.png';
import BRSM from '../../img/BRSM.png';
import OKKO from '../../img/OKKO.png';
import SOCAR from '../../img/SOCAR.png';
import UPG from '../../img/UPG.png';
import WOG from '../../img/WOG.png';
// import data from '../../kyivData';
import requester from '../../helper/requester';
const URL = 'http://localhost:8080/station';
const fetcher = (path) => fetch(path).then(response => response.json());

const refs = {
	ABIAC,
	BRSM,
	OKKO,
	SOCAR,
	UPG,
	WOG,
};

const Map = ({ changeVisible }) => {
	const [selectedStation, setSelectedStation] = useState(null);
	const [filteredData, setFilteredData] = useState([]);
	const [defaultdata, setDefaultData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [directions, setDirections] = useState(null);
	const [currentLat, setCurrentLat] = useState(null);
	const [currentLng, setCurrentLng] = useState(null);
	const [fuelType, setFuelType] = useState('');
	const [company, setCompany] = useState('');
	const [service, setService] = useState('');

	const handleSelect = (selectedFuelType, selectedCompany, selectedService) => {
		setFuelType(selectedFuelType);
		setCompany(selectedCompany);
		setService(selectedService);
	};



	const buildRoute = (lat, lng) => {
		setDirections(null);

		const DirectionsService = new window.google.maps.DirectionsService();

		DirectionsService.route(
			{
				origin: new window.google.maps.LatLng(currentLat, currentLng),
				destination: new window.google.maps.LatLng(Number(lat), Number(lng)),
				travelMode: window.google.maps.TravelMode.DRIVING,
			},
			(result, status) => {
				if (status === window.google.maps.DirectionsStatus.OK) {
					setDirections(result);
				} else {
					console.error(`error fetching directions ${result}`);
				}
			}
		);
	};

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const data = await fetcher(URL);
			console.log(data);
			setDefaultData(data);
			setLoading(false);
		}
		fetchData();


		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setCurrentLat(position.coords.latitude);
					setCurrentLng(position.coords.longitude);
				},
				(error) => {
					console.log(error.message);
				}
			);
		}
	}, []);

	const filterStations = async () => {

		setLoading(true);
		const response = await requester(
			'http://localhost:8080/station/filter',
			'POST',
			{
				city: null,
				fuelType: fuelType === '' ? null : fuelType,
				companyName: company === '' ? null : company,
				servicesNames: service === '' ? null : service
			},
			{
				'Content-type': 'application/json; charset=UTF-8',
			}
		);
		setFilteredData(response);
		setLoading(false);
	};

	useEffect(() => {
		// Фильтрация данных по выбранным значениям fuelType и company
		// let filtered = defaultdata;
		// const obj = {};
		// if (company) {
		// obj.company = company;
		// console.log('bl');
		// filtered = filtered.filter((item) => item.companyName === company);
		// console.log('after company', filtered);
		// }

		// if (fuelType) {
		// obj.fuelType = fuelType;
		// console.log('bf');
		// filtered = filtered.filter((item) => item.fuelTypesAvailableInfo[fuelType]);
		// console.log('after fuelType', filtered);
		// }
		// if (service) {
		// obj.service = service;
		// console.log('bs');
		// filtered = filtered.filter((item) => item.services.indexOf(service) !== -1);
		// console.log('after service', filtered);
		// }
		// console.log('filtered arr', filtered);

		// setFilteredData(filtered);
		filterStations();
	}, [fuelType, company, service]);

	return (
		<>
			{loading ? <Loader /> : null}
			<Control onSelect={handleSelect} closeRoute={() => setDirections(null)} />
			<GoogleMap defaultZoom={10} defaultCenter={{ lat: 50.4501, lng: 30.523399 }}>
				{filteredData.map((item) => (
					<Marker
						key={item.id}
						position={{
							lat: Number(item.lat),
							lng: Number(item.lng),
						}}
						onClick={() => setSelectedStation(item)}
						icon={{
							url: refs[`${item.companyName}`],
							scaledSize: new window.google.maps.Size(40, 60),
						}}
					/>
				))}
				{selectedStation && (
					<InfoWindow
						position={{
							lat: Number(selectedStation.lat),
							lng: Number(selectedStation.lng),
						}}
						onCloseClick={() => {
							setSelectedStation(null);
						}}
					>
						<InfoLayout id={selectedStation.id} buildRoute={() => buildRoute(Number(selectedStation.lat), Number(selectedStation.lng))} />
					</InfoWindow>
				)}
				{directions && <DirectionsRenderer directions={directions} />}
			</GoogleMap>
		</>
	);
};

export default Map;
