const menuApiUrl = "https://localhost:5001/api/Menu/";

export const getAllMenus = () => {
	return fetch(`${menuApiUrl}`).then((res) => res.json());
};

export const getBarMenus = (id) => {
	return fetch(`${menuApiUrl}BarMenus/${id}`).then((res) => res.json());
};

export const getMenuById = (id) => {
	return fetch(`${menuApiUrl}${id}`).then((res) => res.json());
};

export const deleteMenu = (id) => {
	return fetch(`${menuApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateMenu = (menu) => {
	return fetch(`${menuApiUrl}${menu.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(menu),
	});
};

export const addMenu = (menu) => {
	return fetch(menuApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(menu),
	});
};
