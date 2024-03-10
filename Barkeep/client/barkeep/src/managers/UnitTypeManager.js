const unitTypeApiUrl = "https://localhost:5001/api/UnitType/";

export const getAllUnitTypes = () => {
	return fetch(unitTypeApiUrl).then((res) => res.json());
};

export const getUnitTypeById = (id) => {
	return fetch(`${unitTypeApiUrl}${id}`).then((res) => res.json());
};

export const deleteUnitType = (id) => {
	return fetch(`${unitTypeApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateUnitType = (unitType) => {
	return fetch(`${unitTypeApiUrl}${unitType.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(unitType),
	});
};

export const addUnitType = (unitType) => {
	return fetch(unitTypeApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(unitType),
	});
};
