import { useState, useEffect } from "react";
import { getAllInventoryAdjustmentTypes } from "../../managers/InventoryAdjustmentTypeManager";
import { Form, Stack } from "react-bootstrap";

export const InventoryAdjustmentTypeDropDown = ({
	inventoryAdjustmentTypeId,
	setInventoryAdjustmentTypeId,
}) => {
	const [inventoryAdjustmentTypes, setInventoryAdjustmentTypes] = useState([]);
	const getInventoryAdjustmentTypes = () => {
		return getAllInventoryAdjustmentTypes().then((inventoryAdjustmentTypes) =>
			setInventoryAdjustmentTypes(inventoryAdjustmentTypes)
		);
	};

	useEffect(() => {
		getInventoryAdjustmentTypes();
	}, []);

	const handleChange = (e) => {
		e.preventDefault();
		setInventoryAdjustmentTypeId(parseInt(e.target.value));
	};

	return (
		<Stack>
			<Form.Group>
				<Form.Label>Adjustment Type</Form.Label>
				<Form.Select
					aria-label='Inventory Adjustment Type'
					value={inventoryAdjustmentTypeId}
					onChange={(e) => handleChange(e)}
					disabled={window.location.pathname.endsWith("add")}
				>
					<option value={0}>Select Adjustment Type</option>
					{inventoryAdjustmentTypes.map((inventoryAdjustmentType) => {
						return (
							<option
								key={inventoryAdjustmentType.id}
								value={inventoryAdjustmentType.id}
							>
								{inventoryAdjustmentType.name}
							</option>
						);
					})}
				</Form.Select>
			</Form.Group>
		</Stack>
	);
};
