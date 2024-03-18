import { useEffect, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { InventoryAdjustmentTypeDropDown } from "../forms/InventoryAdjustmentTypeDropDown";
import { UnitDropDown } from "../forms/UnitDropDown";
import { UnitTypeDropDown } from "../forms/UnitTypeDropDown";
import { addInventoryAdjustment } from "../../managers/InventoryAdjustmentManager";
import {
	getInventoryById,
	updateInventory,
} from "../../managers/InventoryManager";
import { useParams } from "react-router-dom";
import { getUnitById } from "../../managers/UnitManager";

export const AddInventoryAdjustment = ({
	setInventoryAdjustment,
	inventoryAdjustment,
	handleClose,
	setInventory,
	setAdjustments,
}) => {
	const barUser = JSON.parse(localStorage.getItem("barUser"));

	const [inventoryAdjustmentTypeId, setInventoryAdjustmentTypeId] = useState();
	const [adjustmentUnitId, setAdjustmentUnitId] = useState();
	const [adjustmentUnitTypeId, setAdjustmentUnitTypeId] = useState();

	useEffect(() => {
		if (window.location.pathname.endsWith("add")) {
			setInventoryAdjustmentTypeId(3);
		}
	}, []);

	useEffect(() => {
		if (window.location.pathname.endsWith("add")) {
			const copy = { ...inventoryAdjustment };
			copy.includeInInventoryCostPerOunce = true;
			setInventoryAdjustment(copy);
		}
	}, []);

	useEffect(() => {
		const copy = { ...inventoryAdjustment };
		if (adjustmentUnitId) {
			copy.unitId = adjustmentUnitId;
		}
		if (adjustmentUnitTypeId) {
			copy.unitTypeId = adjustmentUnitTypeId;
		}
		if (inventoryAdjustmentTypeId) {
			copy.inventoryAdjustmentTypeId = inventoryAdjustmentTypeId;
		}
		setInventoryAdjustment(copy);
	}, [adjustmentUnitId, adjustmentUnitTypeId, inventoryAdjustmentTypeId]);

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...inventoryAdjustment };
		copy[e.target.id] = e.target.value;
		setInventoryAdjustment(copy);
	};

	const handleCheckbox = (e) => {
		const copy = { ...inventoryAdjustment };
		copy[e.target.id] = e.target.checked;
		setInventoryAdjustment(copy);
	};

	const handleAddAdjustment = (e) => {
		e.preventDefault();
		const copy = { ...inventoryAdjustment };
		copy.quantity = parseFloat(copy.quantity);
		copy.itemsPerUnit = parseFloat(copy.itemsPerUnit);
		copy.cost = parseFloat(copy.cost);
		copy.unitSize = parseFloat(copy.unitSize);
		copy.createDateTime = new Date();
		return addInventoryAdjustment(copy)
			.then((res) => res.json())
			.then((createdAdjustment) =>
				getInventoryById(createdAdjustment.inventoryId).then((inventory) => {
					setInventory(inventory);
					setAdjustments(inventory.inventoryAdjustments);
					return getUnitById(createdAdjustment.unitId).then((unit) => {
						if (
							inventory.outInventoryLinks.length &&
							createdAdjustment.inventoryAdjustmentTypeId == 3
						) {
							inventory.outInventoryLinks.forEach((link) => {
								if (link.onlyAdjustsOnStock && link.id) {
									const linkAdjustment = {
										inventoryId: link.inInventoryId,
										inventoryAdjustmentTypeId: 6,
										distributorId: null,
										quantity:
											createdAdjustment.quantity * unit.size * link.yield,
										itemsPerUnit: 1,
										unitId: link.inUnitId,
										unitSize: 1,
										unitTypeId: inventory.unitTypeId,
										cost: 0,
										includeInInventoryCostPerOunce: false,
										createDateTime: new Date(),
										barUserId: barUser.id,
									};

									return addInventoryAdjustment(linkAdjustment).then((res) =>
										handleClose()
									);
								}
							});
						} else {
							return handleClose();
						}
					});
				})
			);
	};

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
							value={
								inventoryAdjustment.quantity ? inventoryAdjustment.quantity : ""
							}
							onChange={handleChange}
						/>
					</Stack>
					<Stack>
						<Form.Label>Unit Size</Form.Label>
						<Form.Control
							type='number'
							id='unitSize'
							value={
								inventoryAdjustment.unitSize ? inventoryAdjustment.unitSize : ""
							}
							onChange={handleChange}
						/>
					</Stack>

					<UnitDropDown
						unitId={adjustmentUnitId}
						setUnitId={setAdjustmentUnitId}
						adjustment={inventoryAdjustment}
					/>
					<UnitTypeDropDown
						unitTypeId={adjustmentUnitTypeId}
						setUnitTypeId={setAdjustmentUnitTypeId}
						adjustment={inventoryAdjustment}
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
									value={
										inventoryAdjustment.itemsPerUnit
											? inventoryAdjustment.itemsPerUnit
											: ""
									}
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
									value={
										inventoryAdjustment.cost ? inventoryAdjustment.cost : ""
									}
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
									checked={inventoryAdjustment.includeInInventoryCostPerOunce}
									disabled={window.location.pathname.endsWith("add")}
									onChange={handleCheckbox}
								/>
							</Stack>
						</Form.Check>
					</Stack>

					{!window.location.pathname.endsWith("add") ? (
						<Stack>
							<Button variant='primary' onClick={handleAddAdjustment}>
								Add Adjustment
							</Button>
						</Stack>
					) : (
						""
					)}
				</Stack>
			</Stack>
		</Form>
	);
};
