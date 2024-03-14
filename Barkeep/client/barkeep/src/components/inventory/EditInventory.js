import { useParams } from "react-router-dom";
import {
	getInventoryById,
	updateInventory,
} from "../../managers/InventoryManager";
import { useEffect, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { UnitDropDown } from "../forms/UnitDropDown";
import { UnitTypeDropDown } from "../forms/UnitTypeDropDown";

export const EditInventory = ({ setInventory, handleClose }) => {
	const { inventoryId } = useParams();
	const [thisInventory, setThisInventory] = useState({});
	const [unitId, setUnitId] = useState(0);
	const [unitTypeId, setUnitTypeId] = useState(0);

	const getThisInventory = () => {
		getInventoryById(inventoryId).then((inventory) =>
			setThisInventory(inventory)
		);
	};

	useEffect(() => {
		getThisInventory();
	}, [inventoryId]);

	useEffect(() => {
		if (thisInventory) {
			const copy = { ...thisInventory };
			setUnitId(copy.unitId);
			setUnitTypeId(copy.unitTypeId);
		}
	}, [thisInventory]);

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...thisInventory };
		copy[e.target.id] = parseFloat(e.target.value);
		setThisInventory(copy);
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		const copy = { ...thisInventory };
		copy.unitId = unitId;
		copy.unitTypeId = unitTypeId;
		return updateInventory(copy)
			.then((response) => {
				getInventoryById(copy.id).then((inventory) => setInventory(inventory));
			})
			.then(() => handleClose());
	};

	return (
		<Stack direction='horizontal' gap={3} className='align-items-end flex-wrap'>
			<Stack className='justify-content-end align-items-center'>
				<h4>Track {thisInventory?.component?.name} as a:</h4>
			</Stack>
			<Stack direction='horizontal' gap={2}>
				<Form.Label>
					<h4 className='m-0'>Markup</h4>
				</Form.Label>
				<Form.Control
					type='number'
					id='markup'
					value={thisInventory.markup ? thisInventory.markup : 300}
					onChange={handleChange}
				/>
				<div>%</div>
			</Stack>
			<Stack>
				<Form.Label>Unit Size</Form.Label>
				<Form.Control
					type='number'
					id='unitSize'
					value={thisInventory.unitSize ? thisInventory.unitSize : ""}
					onChange={handleChange}
				/>
			</Stack>

			<UnitDropDown setUnitId={setUnitId} unitId={unitId} />

			<UnitTypeDropDown setUnitTypeId={setUnitTypeId} unitTypeId={unitTypeId} />
			<Button
				variant='primary'
				onClick={(e) => {
					e.preventDefault();
					handleUpdate(e);
				}}
			>
				Update inventory
			</Button>
		</Stack>
	);
};
