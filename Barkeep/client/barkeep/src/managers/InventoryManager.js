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

export const getQuantity = (inventory) => {
	console.log(inventory);
	let totalQuantity = inventory.quantity;
	console.log(`Initial Quantity: ${totalQuantity}`);
	if (inventory?.unit != null && inventory?.inventoryAdjustments.length) {
		inventory?.inventoryAdjustments.forEach((adjustment) => {
			let subQuantity = 0;

			const DoesAdd = () => {
				if (adjustment?.inventoryAdjustmentType?.doesAdd) {
					return true;
				} else {
					return false;
				}
			};

			if (adjustment?.unit != null) {
				const adjustmentQuantity =
					adjustment.quantity * adjustment.itemsPerUnit;
				console.log(`Adjustment Quantity: ${adjustmentQuantity}`);
				const adjustmentSize = adjustment.unitSize * adjustment.unit.size;
				console.log(`Adjustment Size: ${adjustmentSize}`);
				const inventorySize = inventory.unit.size * inventory.unitSize;
				console.log(`Inventory Size: ${inventorySize}`);
				const totalUnits =
					(adjustmentQuantity * adjustmentSize) / inventorySize;
				console.log(`Total Units: ${totalUnits}`);
				if (
					(inventory.unit.measurement === "unit") &
					(adjustment.unit.measurement === "unit")
				) {
					subQuantity = totalUnits;
					if (DoesAdd()) {
						return (totalQuantity += subQuantity);
					} else {
						return (totalQuantity -= subQuantity);
					}
				}
				if (
					(inventory.unit.measurement !== "unit") &
					(adjustment.unit.measurement !== "unit")
				) {
					if (inventory.unit.measurement === adjustment.unit.measurement) {
						subQuantity = totalUnits;
						if (DoesAdd()) {
							return (totalQuantity += subQuantity);
						} else {
							return (totalQuantity -= subQuantity);
						}
					} else if (
						inventory.unit.measurement !== adjustment.unit.measurement
					) {
						if (
							(inventory.unit.measurement === "mL") |
							(adjustment.unit.measurement === "g")
						) {
							subQuantity = totalUnits * adjustment.unit.MetricConversion;
							if (DoesAdd()) {
								return (totalQuantity += subQuantity);
							} else {
								return (totalQuantity -= subQuantity);
							}
						}
						if (
							(inventory.unit.measurement === "fl oz") |
							(adjustment.unit.measurement === "oz")
						) {
							subQuantity = totalUnits * adjustment.unit.ImperialConversion;
							if (DoesAdd()) {
								return (totalQuantity += subQuantity);
							} else {
								return (totalQuantity -= subQuantity);
							}
						}
					}
				}
			}
		});
		return totalQuantity;
	}
};
