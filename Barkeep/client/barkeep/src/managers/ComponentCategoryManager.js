const componentCategoryApiUrl = "https://localhost:5001/api/ComponentCategory/";

export const getAllComponentCategories = () => {
	return fetch(componentCategoryApiUrl).then((res) => res.json());
};
export const getComponentCategoriesByComponentId = (componentId) => {
	return fetch(
		`${componentCategoryApiUrl}GetByComponentId/${componentId}`
	).then((res) => res.json());
};

export const getComponentCategoriesByCategoryId = (categoryId) => {
	return fetch(`${componentCategoryApiUrl}GetByCategoryId/${categoryId}`).then(
		(res) => res.json()
	);
};

export const getComponentCategoryById = (id) => {
	return fetch(`${componentCategoryApiUrl}${id}`).then((res) => res.json());
};

export const deleteComponentCategory = (id) => {
	return fetch(`${componentCategoryApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateComponentCategory = (componentCategory) => {
	return fetch(`${componentCategoryApiUrl}${componentCategory.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(componentCategory),
	});
};

export const addComponentCategory = (componentCategory) => {
	return fetch(componentCategoryApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(componentCategory),
	});
};
