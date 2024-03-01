const barApiUrl = "https://localhost:5001/api/Bar/";

export const getAllBars = () => {
	return fetch(barApiUrl).then((res) => res.json());
};

export const getAllBarsByUserId = (userId) => {
	return fetch(`${barApiUrl}UserBars/${userId}`).then((res) => res.json());
};

export const getBarById = (id) => {
	return fetch(`${barApiUrl}${id}`).then((res) => res.json());
};

export const deleteBar = (id) => {
	return fetch(`${barApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateBar = (bar) => {
	return fetch(`${barApiUrl}${bar.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(bar),
	});
};

export const addBar = (bar) => {
	return fetch(barApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(bar),
	});
};
