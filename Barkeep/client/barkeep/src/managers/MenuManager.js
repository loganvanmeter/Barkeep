const menuApiUrl = "https://localhost:5001/api/Menu/";

export const getAllMenus = () => {
	return fetch(`${categoryApiUrl}`).then((res) => res.json());
};

export const getBarMenus = (id) => {
	return fetch(`${categoryApiUrl}BarMenus/${id}`).then((res) => res.json());
};

export const getMenuById = (id) => {
	return fetch(`${categoryApiUrl}${id}`).then((res) => res.json());
};

export const deleteMenu = (id) => {
	return fetch(`${categoryApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateMenu = (category) => {
	return fetch(`${categoryApiUrl}${category.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(category),
	});
};

export const addMenu = (category) => {
	return fetch(categoryApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(category),
	});
};
