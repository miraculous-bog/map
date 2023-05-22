// import * as stationData from "./data.json";
import '../src/dist/outpust.css'
const stationData = require("./dataTest.json");
const fs = require('fs');
console.log(stationData.length);

console.log(stationData);
const axios = require('axios');

// Function to make the geocoding request for a single object
const geocodeObject = async (obj, apiKey) => {
	const address = `${obj.city} ${obj.address}`;
	const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

	try {
		const response = await axios.get(url);
		console.log(response);
		const { lat, lng } = response.results[0].geometry;
		console.log(lat, lng);
		return { ...obj, lat, lng };
	} catch (error) {
		console.error(`Error geocoding object with id ${obj.id}:`, error);
		return null;
	}
};

// Function to geocode an array of objects
const geocodeArray = async (array, apiKey) => {
	const promises = array.map(obj => geocodeObject(obj, apiKey));
	const results = await Promise.all(promises);
	return results.filter(result => result !== null);
};

// Example array of objects
// const objectsArray = [
// 	{
// 		id: 5157,
// 		name: 'WOG 1200',
// 		companyName: 'WOG',
// 		address: 'м.Горохів,вул Львівська,42',
// 		city: 'Горохів',
// 		fuelTypesAvailableInfo: {
// 			DIESEL: true,
// 			GAS: true,
// 			A92: false,
// 			A95: false
// 		},
// 		stationInfoId: 5157
// 	},
// 	// Add more objects here
// ];
const objectsArray = stationData;
const apiKey = 'c039df1ade2949f08282486057b25753';



const createFile = (jsonString) => {
	fs.writeFile('res.json', jsonString, 'utf8', (err) => {
		if (err) {
			// console.error('Ошибка записи в файл:', err);
			return;
		}
		console.log('JSON-файл успешно создан.');
	});
}

geocodeArray(objectsArray, apiKey)
	.then(results => {
		console.log('Geocoding results:', createFile(JSON.stringify(results)));
	})
	.catch(error => {
		console.error('Error geocoding objects:', error);
	});