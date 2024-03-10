const unitApiUrl = "https://localhost:5001/api/Unit/";

export const getAllUnits = () => {
	return fetch(unitApiUrl).then((res) => res.json());
};

export const getUnitById = (id) => {
	return fetch(`${unitApiUrl}${id}`).then((res) => res.json());
};

export const deleteUnit = (id) => {
	return fetch(`${unitApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateUnit = (unit) => {
	return fetch(`${unitApiUrl}${unit.id}`, {
		method: "PUT",
		headers: {
			"Content-": "application/json",
		},
		body: JSON.stringify(unit),
	});
};

export const addUnit = (unit) => {
	return fetch(unitApiUrl, {
		method: "POST",
		headers: {
			"Content-": "application/json",
		},
		body: JSON.stringify(unit),
	});
};
