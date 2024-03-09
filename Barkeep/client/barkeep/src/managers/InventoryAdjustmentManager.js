const inventoryAdjustmentApiUrl =
	"https://localhost:5001/api/InventoryAdjustment/";

export const getAllInventoryAdjustment = () => {
	return fetch(inventoryAdjustmentApiUrl).then((res) => res.json());
};

export const getThisInventorysAdjustments = (inventoryId) => {
	return fetch(
		`${inventoryAdjustmentApiUrl}GetThisInventoryAdjustments/${inventoryId}`
	).then((res) => res.json());
};

export const getInventoryAdjustmentById = (id) => {
	return fetch(`${inventoryAdjustmentApiUrl}${id}`).then((res) => res.json());
};

export const deleteInventoryAdjustment = (id) => {
	return fetch(`${inventoryAdjustmentApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const deleteThisInventorysAdjustment = (inventoryId) => {
	return fetch(
		`${inventoryAdjustmentApiUrl}DeleteThisInventoryAdjustments/${inventoryId}`,
		{
			method: "DELETE",
		}
	);
};

export const updateInventoryAdjustment = (inventoryAdjustment) => {
	return fetch(`${inventoryAdjustmentApiUrl}${inventoryAdjustment.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(inventoryAdjustment),
	});
};

export const addInventoryAdjustment = (inventoryAdjustment) => {
	return fetch(inventoryAdjustmentApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(inventoryAdjustment),
	});
};
