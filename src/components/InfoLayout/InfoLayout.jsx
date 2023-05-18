import React from "react";

const InfoLayout = ({ data, buildRoute }) => {
	return (
		<>
			<h1>{data.name}</h1>
			<p>{data.address}</p>
			<button onClick={buildRoute}>Побудувати маршрут</button>
		</>
	);
}

export default InfoLayout;