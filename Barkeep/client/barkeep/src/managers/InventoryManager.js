const inventoryApiUrl = "https://localhost:5001/api/Inventory/";

export const getAllInventory = () => {
	return fetch(inventoryApiUrl).then((res) => res.json());
};

export const getBarInventory = (barId) => {
	return fetch(`${inventoryApiUrl}BarInventory/${barId}`).then((res) =>
		res.json()
	);
};

export const getInventoryById = (id) => {
	return fetch(`${inventoryApiUrl}${id}`).then((res) => res.json());
};

export const deleteInventory = (id) => {
	return fetch(`${inventoryApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const deleteBarInventory = (barId) => {
	return fetch(`${inventoryApiUrl}DeleteBarInventory/${barId}`, {
		method: "DELETE",
	});
};

export const updateInventory = (inventory) => {
	return fetch(`${inventoryApiUrl}${inventory.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(inventory),
	});
};

export const addInventory = (inventory) => {
	return fetch(inventoryApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(inventory),
	});
};
