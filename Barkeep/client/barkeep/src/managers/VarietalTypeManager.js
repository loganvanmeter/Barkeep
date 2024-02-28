const varietalTypeApiUrl = "https://localhost:5001/api/VarietalType/";

export const getAllVarietalTypes = () => {
	return fetch(varietalTypeApiUrl).then((res) => res.json());
};

export const getVarietalTypeById = (id) => {
	return fetch(`${varietalTypeApiUrl}${id}`).then((res) => res.json());
};

export const deleteVarietalType = (id) => {
	return fetch(`${varietalTypeApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateVarietalType = (varietalType) => {
	return fetch(`${varietalTypeApiUrl}${varietalType.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(varietalType),
	});
};

export const addVarietalType = (varietalType) => {
	return fetch(varietalTypeApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(varietalType),
	});
};
