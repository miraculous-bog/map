const requester = async (path, method, body, headers) => {
	try {
		const response = await fetch(path, { method, body: JSON.stringify(body), headers });
		return response.json();
	} catch (e) { }
};

export default requester;