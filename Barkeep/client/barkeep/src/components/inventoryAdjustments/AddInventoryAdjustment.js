import { useEffect, useState } from "react";
import { Container, Form, Stack } from "react-bootstrap";
import { InventoryAdjustmentTypeDropDown } from "../forms/InventoryAdjustmentTypeDropDown";
import { UnitDropDown } from "../forms/UnitDropDown";
import { UnitTypeDropDown } from "../forms/UnitTypeDropDown";

export const AddInventoryAdjustment = ({
	setInventoryAdjustment,
	inventoryAdjustment,
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
									onChange={handleCheckbox}
								/>
							</Stack>
						</Form.Check>
					</Stack>
				</Stack>
			</Stack>
		</Form>
	);
};
