const inventoryAdjustmentTypeApiUrl =
	"https://localhost:5001/api/InventoryAdjustmentType/";

export const getAllInventoryAdjustmentType = () => {
	return fetch(inventoryAdjustmentTypeApiUrl).then((res) => res.json());
};

export const getInventoryAdjustmentTypeById = (id) => {
	return fetch(`${inventoryAdjustmentTypeApiUrl}${id}`).then((res) =>
		res.json()
	);
};

export const deleteInventoryAdjustmentType = (id) => {
	return fetch(`${inventoryAdjustmentTypeApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateInventoryAdjustmentType = (inventoryAdjustmentType) => {
	return fetch(
		`${inventoryAdjustmentTypeApiUrl}${inventoryAdjustmentType.id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(inventoryAdjustmentType),
		}
	);
};

export const addInventoryAdjustmentType = (inventoryAdjustmentType) => {
	return fetch(inventoryAdjustmentTypeApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(inventoryAdjustmentType),
	});
};
