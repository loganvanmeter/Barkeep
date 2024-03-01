const payRateTypeApiUrl = "https://localhost:5001/api/PayRateType/";

export const getAllPayRateTypes = () => {
	return fetch(payRateTypeApiUrl).then((res) => res.json());
};

export const getPayRateTypeById = (id) => {
	return fetch(`${payRateTypeApiUrl}${id}`).then((res) => res.json());
};

export const deletePayRateType = (id) => {
	return fetch(`${payRateTypeApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updatePayRateType = (payRateType) => {
	return fetch(`${payRateTypeApiUrl}${payRateType.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payRateType),
	});
};

export const addPayRateType = (payRateType) => {
	return fetch(payRateTypeApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payRateType),
	});
};
