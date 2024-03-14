import { useEffect, useState } from "react";
import { updateInventoryAdjustment } from "../../managers/InventoryAdjustmentManager";
import { getInventoryById } from "../../managers/InventoryManager";
import { Button, Form, Stack } from "react-bootstrap";
import { InventoryAdjustmentTypeDropDown } from "../forms/InventoryAdjustmentTypeDropDown";
import { UnitDropDown } from "../forms/UnitDropDown";
import { UnitTypeDropDown } from "../forms/UnitTypeDropDown";

export const EditInventoryAdjustment = ({
	thisAdjustment,
	setThisAdjustment,
	inventoryAdjustmentTypeId,
	setInventoryAdjustmentTypeId,
	adjustmentUnitId,
	setAdjustmentUnitId,
	adjustmentUnitTypeId,
	setAdjustmentUnitTypeId,
	setInventory,
	setAdjustments,
	handleClose,
}) => {
	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...thisAdjustment };
		copy[e.target.id] = e.target.value;
		setThisAdjustment(copy);
	};

	const handleCheckbox = (e) => {
		const copy = { ...thisAdjustment };
		copy[e.target.id] = e.target.checked;
		setThisAdjustment(copy);
	};

	const handleUpdateAdjustment = () => {
		const copy = { ...thisAdjustment };
		return updateInventoryAdjustment(copy)
			.then(() =>
				getInventoryById(copy.inventoryId).then((inventory) => {
					setInventory(inventory);
					setAdjustments(inventory.inventoryAdjustments);
				})
			)
			.then(() => handleClose());
	};
	if (thisAdjustment.id) {
		return (
			<Form>
				<Stack gap={3}>
					<Stack direction='horizontal' gap={3} className='flex-wrap'>
						<InventoryAdjustmentTypeDropDown
							inventoryAdjustmentTypeId={inventoryAdjustmentTypeId}
							setInventoryAdjustmentTypeId={setInventoryAdjustmentTypeId}
						/>

						<Stack>
							<Form.Label>Quantity</Form.Label>
							<Form.Control
								type='number'
								id='quantity'
								value={thisAdjustment.quantity}
								onChange={handleChange}
							/>
						</Stack>
						<Stack>
							<Form.Label>Unit Size</Form.Label>
							<Form.Control
								type='number'
								id='unitSize'
								value={thisAdjustment.unitSize}
								onChange={handleChange}
							/>
						</Stack>

						<UnitDropDown
							unitId={adjustmentUnitId}
							setUnitId={setAdjustmentUnitId}
							adjustment={thisAdjustment}
						/>
						<UnitTypeDropDown
							unitTypeId={adjustmentUnitTypeId}
							setUnitTypeId={setAdjustmentUnitTypeId}
							adjustment={thisAdjustment}
						/>
					</Stack>
					<Stack direction='horizontal' gap={5} className='flex-wrap'>
						<Stack>
							<Stack direction='horizontal' gap={2}>
								<div>Containing</div>
								<Stack>
									<Form.Control
										type='number'
										id='itemsPerUnit'
										value={thisAdjustment.itemsPerUnit}
										onChange={handleChange}
									/>
								</Stack>
								<div>items per unit</div>
							</Stack>
						</Stack>
						<Stack>
							<Stack direction='horizontal' gap={2}>
								<div>At a cost of $</div>
								<Stack>
									<Form.Control
										type='text'
										id='cost'
										value={thisAdjustment.cost}
										onChange={handleChange}
									/>
								</Stack>
								<div>per unit</div>
							</Stack>
						</Stack>
						<Stack className='align-items-end justify-content-center'>
							<Form.Check type='checkbox' id='includeInInventoryCostPerOunce'>
								<Stack direction='horizontal' gap={2}>
									<Form.Check.Label>
										Include in inventory cost per ounce
									</Form.Check.Label>
									<Form.Check.Input
										type='checkbox'
										checked={thisAdjustment.includeInInventoryCostPerOunce}
										disabled={window.location.pathname.endsWith("add")}
										onChange={handleCheckbox}
									/>
								</Stack>
							</Form.Check>
						</Stack>
						<Stack>
							<Button variant='primary' onClick={handleUpdateAdjustment}>
								Update Adjustment
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Form>
		);
	}
};
