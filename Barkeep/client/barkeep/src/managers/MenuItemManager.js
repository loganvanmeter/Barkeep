const menuItemApiUrl = "https://localhost:5001/api/MenuItem/";

export const getAllMenuItems = () => {
	return fetch(`${menuItemApiUrl}`).then((res) => res.json());
};

export const getThisMenuItems = (id) => {
	return fetch(`${menuItemApiUrl}ThisMenuItems/${id}`).then((res) =>
		res.json()
	);
};

export const getThisMenuCategoryItems = (id) => {
	return fetch(`${menuItemApiUrl}ThisMenuCategoryItems/${id}`).then((res) =>
		res.json()
	);
};

export const getMenuItemById = (id) => {
	return fetch(`${menuItemApiUrl}${id}`).then((res) => res.json());
};

export const deleteMenuItem = (id) => {
	return fetch(`${menuItemApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateMenuItem = (menuItem) => {
	return fetch(`${menuItemApiUrl}${menuItem.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(menuItem),
	});
};

export const addMenuItem = (menuItem) => {
	return fetch(menuItemApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(menuItem),
	});
};
