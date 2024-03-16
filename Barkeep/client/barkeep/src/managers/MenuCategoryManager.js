const menuCategoryApiUrl = "https://localhost:5001/api/MenuCategory/";

export const getAllMenuCategories = () => {
	return fetch(`${menuCategoryApiUrl}`).then((res) => res.json());
};
export const getThisMenuCategories = (id) => {
	return fetch(`${menuCategoryApiUrl}MenuCategories/${id}`).then((res) =>
		res.json()
	);
};
export const getMenuSubCategories = (id) => {
	return fetch(`${menuCategoryApiUrl}MenuCategorySubCategories/${id}`).then(
		(res) => res.json()
	);
};

export const getMenuCategoryById = (id) => {
	return fetch(`${menuCategoryApiUrl}${id}`).then((res) => res.json());
};

export const deleteMenuCategory = (id) => {
	return fetch(`${menuCategoryApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateMenuCategory = (menuCategory) => {
	return fetch(`${menuCategoryApiUrl}${menuCategory.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(menuCategory),
	});
};

export const addMenuCategory = (menuCategory) => {
	return fetch(menuCategoryApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(menuCategory),
	});
};
