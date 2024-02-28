const varietalApiUrl = "https://localhost:5001/api/Varietal/";

export const getAllVarietals = () => {
	return fetch(varietalApiUrl).then((res) => res.json());
};

export const getVarietalById = (id) => {
	return fetch(`${varietalApiUrl}${id}`).then((res) => res.json());
};

export const deleteVarietal = (id) => {
	return fetch(`${varietalApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateVarietal = (varietal) => {
	return fetch(`${varietalApiUrl}${varietal.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(varietal),
	});
};

export const addVarietal = (varietal) => {
	return fetch(varietalApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(varietal),
	});
};
