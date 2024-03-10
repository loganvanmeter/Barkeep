import { useEffect, useState } from "react";
import { Container, Form, Stack } from "react-bootstrap";
import { InventoryAdjustmentTypeDropDown } from "../forms/InventoryAdjustmentTypeDropDown";
import { UnitDropDown } from "../forms/UnitDropDown";
import { UnitTypeDropDown } from "../forms/UnitTypeDropDown";

export const AddInventoryAdjustment = ({
	setInventoryAdjustment,
	inventory,
}) => {
	const barUser = JSON.parse(localStorage.getItem("barUser"));
	const [adjustment, setAdjustment] = useState({
		inventoryId: null,
		distributorId: null,
		inventoryAdjustmentTypeId: null,
		quantity: 0,
		itemsPerUnit: null,
		cost: 0,
		unitId: null,
		unitSize: null,
		unitTypeId: null,
		includeInInventoryCostPerOunce: false,
		createDateTime: new Date(),
		expirationDate: null,
		barUserId: barUser.id,
	});
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
			const copy = { ...adjustment };
			copy.includeInInventoryCostPerOunce = true;
			setAdjustment(copy);
		}
	}, []);

	useEffect(() => {
		if (adjustmentUnitId) {
			const copy = { ...adjustment };
			copy.adjustmentUnitId = adjustmentUnitId;
			setAdjustment(copy);
		}
		if (adjustmentUnitTypeId) {
			const copy = { ...adjustment };
			copy.adjustmentUnitTypeId = adjustmentUnitTypeId;
			setAdjustment(copy);
		}
	}, [adjustmentUnitId, adjustmentUnitTypeId]);

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...adjustment };
		copy[e.target.id] = e.target.value;
		setAdjustment(copy);
	};

	const handleCheckbox = (e) => {
		const copy = { ...adjustment };
		copy[e.target.id] = e.target.checked;
		setAdjustment(copy);
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
							value={adjustment.quantity ? adjustment.quantity : ""}
							onChange={handleChange}
						/>
					</Stack>
					<Stack>
						<Form.Label>Unit Size</Form.Label>
						<Form.Control
							type='number'
							id='unitSize'
							value={adjustment.unitSize ? adjustment.unitSize : ""}
							onChange={handleChange}
						/>
					</Stack>

					<UnitDropDown
						unitId={adjustmentUnitId}
						setUnitId={setAdjustmentUnitId}
					/>
					<UnitTypeDropDown
						unitTypeId={adjustmentUnitTypeId}
						setUnitTypeId={setAdjustmentUnitTypeId}
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
									value={adjustment.itemsPerUnit ? adjustment.itemsPerUnit : ""}
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
									id='costPerUnit'
									value={adjustment.costPerUnit ? adjustment.costPerUnit : ""}
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
									checked={adjustment.includeInInventoryCostPerOunce}
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
