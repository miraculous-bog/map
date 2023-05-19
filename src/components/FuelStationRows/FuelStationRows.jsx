import React, { useState } from 'react';
import Modal from '../Modal/Modal';
const fueltypes = ['A92', 'A95', 'DIESEL', 'GAS'];

const FuelStationRows = ({ fuelStations }) => {
	let bgcolor;
	const fuelStationsRowStyles =
		'min-h-full text-center flex flex-col justify-center w-[9%] ml-1 text-xl';

	const [modal, setModal] = useState(false);
	const [station, setStation] = useState(0);
	const [id, setId] = useState(0);

	return (
		<div className="mt-2 w-[95%] mx-auto flex flex-col text-black">
			{modal && <Modal visible={modal} setVisible={setModal} id={id} />}
			{fuelStations?.map((col, i) => {
				if (i % 2 === 0) bgcolor = 'bg-slate-100';
				else bgcolor = 'bg-green-200';
				return (
					<div key={i} className="flex h-12">
						<div
							className={`min-h-full text-center flex flex-col justify-center w-[9%] ml-0 ${bgcolor}`}
						>
							{col.name}
						</div>
						<div
							className={`min-h-full truncate w-[55%] ml-1 pl-1 pt-3 ${bgcolor} hover:underline cursor-pointer`}
							onClick={() => {
								setStation(i);
								setId(col.id);
								setModal(true);
							}}
						>
							{col.address}
						</div>
						{fueltypes.map((type, i) => (
							<div key={i} className={`${fuelStationsRowStyles} ${bgcolor}`}>
								{col.fuelTypesAvailableInfo[type] ? '✅' : ' '}
							</div>
						))}
					</div>
				);
			})}
		</div>
	);
};

export default FuelStationRows;
