const barUserApiUrl = "https://localhost:5001/api/BarUser/";

export const getAllBarUsers = () => {
	return fetch(barUserApiUrl).then((res) => res.json());
};

export const getBarUserById = (id) => {
	return fetch(`${barUserApiUrl}${id}`).then((res) => res.json());
};

export const getAllBarUsersByBarId = (barId, isActive) => {
	return fetch(`${barUserApiUrl}GetByBarId/${barId}/IsActive=${isActive}`).then(
		(res) => res.json()
	);
};

export const getAllBarUsersByUserId = (userId, isActive) => {
	return fetch(
		`${barUserApiUrl}GetByUserId/${userId}/IsActive=${isActive}`
	).then((res) => res.json());
};

export const deleteBarUser = (id) => {
	return fetch(`${barUserApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateBarUser = (barUser) => {
	return fetch(`${barUserApiUrl}${barUser.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(barUser),
	});
};

export const addBarUser = (barUser) => {
	return fetch(barUserApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(barUser),
	});
};
