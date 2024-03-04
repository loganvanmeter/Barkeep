const componentTypeApiUrl = "https://localhost:5001/api/ComponentType/";

export const getAllComponentTypes = () => {
	return fetch(componentTypeApiUrl).then((res) => res.json());
};

export const getComponentTypeById = (id) => {
	return fetch(`${componentTypeApiUrl}${id}`).then((res) => res.json());
};

export const deleteComponentType = (id) => {
	return fetch(`${componentTypeApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateComponentType = (componentType) => {
	return fetch(`${componentTypeApiUrl}${componentType.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(componentType),
	});
};

export const addComponentType = (componentType) => {
	return fetch(componentTypeApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(componentType),
	});
};
