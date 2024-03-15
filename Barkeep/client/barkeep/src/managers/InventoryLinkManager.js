const inventoryLinkApiUrl = "https://localhost:5001/api/InventoryLink/";

export const getAllInventoryLinks = () => {
	return fetch(inventoryLinkApiUrl).then((res) => res.json());
};

export const getThisInInventorysLinks = (inInventoryId) => {
	return fetch(
		`${inventoryLinkApiUrl}GetInInventoryLinks/${inInventoryId}`
	).then((res) => res.json());
};

export const getThisOutInventorysLinks = (outInventoryId) => {
	return fetch(
		`${inventoryLinkApiUrl}GetOutInventoryLinks/${outInventoryId}`
	).then((res) => res.json());
};

export const getInventoryLinkById = (id) => {
	return fetch(`${inventoryLinkApiUrl}${id}`).then((res) => res.json());
};

export const deleteInventoryLink = (id) => {
	return fetch(`${inventoryLinkApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const deleteOutInventoryLinks = (inventoryId) => {
	return fetch(`${inventoryLinkApiUrl}DeleteOutInventoryLinks/${inventoryId}`, {
		method: "DELETE",
	});
};

export const updateInventoryLink = (inventoryLink) => {
	return fetch(`${inventoryLinkApiUrl}${inventoryLink.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(inventoryLink),
	});
};

export const addInventoryLink = (inventoryLink) => {
	return fetch(inventoryLinkApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(inventoryLink),
	});
};
