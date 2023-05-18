import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, DirectionsRenderer } from 'react-google-maps';
import Control from '../Control';
import InfoLayout from '../InfoLayout/InfoLayout';
import ABIAC from '../../img/ABIAC.png';
import BRSM from '../../img/BRSM.png';
import OKKO from '../../img/OKKO.png';
import SOCAR from '../../img/SOCAR.png';
import UPG from '../../img/UPG.png';
import WOG from '../../img/WOG.png';
import data from '../../kyivData';

const refs = {
	ABIAC,
	BRSM,
	OKKO,
	SOCAR,
	UPG,
	WOG,
};

const Map = () => {
	const [selectedStation, setSelectedStation] = useState(null);
	const [filteredData, setFilteredData] = useState(data);
	const [directions, setDirections] = useState(null);
	const [currentLat, setCurrentLat] = useState(null);
	const [currentLng, setCurrentLng] = useState(null);
	const [fuelType, setFuelType] = useState('');
	const [company, setCompany] = useState('');

	const handleSelect = (selectedFuelType, selectedCompany) => {
		setFuelType(selectedFuelType);
		setCompany(selectedCompany);
	};



	const buildRoute = (lat, lng) => {
		setDirections(null);

		const DirectionsService = new window.google.maps.DirectionsService();

		DirectionsService.route(
			{
				origin: new window.google.maps.LatLng(currentLat, currentLng),
				destination: new window.google.maps.LatLng(lat, lng),
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

	useEffect(() => {
		// Фильтрация данных по выбранным значениям fuelType и company
		let filtered = data;

		if (company) {
			filtered = filtered.filter((item) => item.companyName === company);
		}

		if (fuelType) {
			filtered = filtered.filter((item) => item.fuelTypesAvailableInfo[fuelType]);
		}

		setFilteredData(filtered);
	}, [fuelType, company]);

	return (
		<>
			<Control onSelect={handleSelect} closeRoute={() => setDirections(null)} />
			<GoogleMap defaultZoom={10} defaultCenter={{ lat: 50.4501, lng: 30.523399 }}>
				{filteredData.map((item) => (
					<Marker
						key={item.id}
						position={{
							lat: item.lat,
							lng: item.lng,
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
							lat: selectedStation.lat,
							lng: selectedStation.lng,
						}}
						onCloseClick={() => {
							setSelectedStation(null);
						}}
					>
						<InfoLayout data={selectedStation} buildRoute={() => buildRoute(selectedStation.lat, selectedStation.lng)} />
					</InfoWindow>
				)}
				{directions && <DirectionsRenderer directions={directions} />}
			</GoogleMap>
		</>
	);
};

export default Map;
