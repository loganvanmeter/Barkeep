const componentApiUrl = "https://localhost:5001/api/Component/";

export const getAllComponents = () => {
	return fetch(componentApiUrl).then((res) => res.json());
};
export const getAllAvailableBarComponents = (barId) => {
	return fetch(`${componentApiUrl}AvailableBarComponents/${barId}`).then(
		(res) => res.json()
	);
};

export const getComponentById = (id) => {
	return fetch(`${componentApiUrl}${id}`).then((res) => res.json());
};

export const deleteComponent = (id) => {
	return fetch(`${componentApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateComponent = (component) => {
	return fetch(`${componentApiUrl}${component.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(component),
	});
};

export const addComponent = (component) => {
	return fetch(componentApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(component),
	});
};
