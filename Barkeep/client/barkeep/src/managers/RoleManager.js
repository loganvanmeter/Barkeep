const roleApiUrl = "https://localhost:5001/api/Role/";

export const getAllRoles = () => {
	return fetch(roleApiUrl).then((res) => res.json());
};

export const getRoleById = (id) => {
	return fetch(`${roleApiUrl}${id}`).then((res) => res.json());
};

export const getRoleByBarId = (barId) => {
	return fetch(`${roleApiUrl}GetByBarId/${barId}`).then((res) => res.json());
};

export const deleteRole = (id) => {
	return fetch(`${roleApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateRole = (role) => {
	return fetch(`${roleApiUrl}${role.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(role),
	});
};

export const addRole = (role) => {
	return fetch(roleApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(role),
	});
};
