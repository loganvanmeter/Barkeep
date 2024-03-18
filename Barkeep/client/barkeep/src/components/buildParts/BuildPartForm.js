import { Button, Form, Stack } from "react-bootstrap";
import { BarInventoryDataList } from "../forms/BarInventoryDataList";
import { useEffect, useState } from "react";
import { UnitDropDown } from "../forms/UnitDropDown";
import {
	getBarInventory,
	getInventoryById,
} from "../../managers/InventoryManager";
import { getComponentById } from "../../managers/ComponentManager";

export const BuildPartForm = ({ part, index, setter, handleRemove }) => {
	const bar = JSON.parse(localStorage.getItem("bar"));
	const [buildPart, setBuildPart] = useState({
		id: part.id,
		buildId: part.buildId,
		amount: part.amount,
		unitId: part.unitId,
		inventoryId: part.inventoryId,
		order: part.order,
		isPrimary: part.isPrimary,
	});
	const [inventoryName, setInventoryName] = useState("");
	const [unitId, setUnitId] = useState(3);

	const getInventoryFromDataList = () => {
		return getBarInventory(bar.id).then((inventories) =>
			inventories.forEach((inventory) => {
				if (
					inventoryName &&
					inventory?.component?.name.toLowerCase() ===
						inventoryName.toLowerCase()
				) {
					const copy = { ...buildPart };
					copy.inventoryId = inventory.id;
					setBuildPart(copy);
				}
			})
		);
	};

	useEffect(() => {
		if (part && part.id) {
			getInventoryById(part.inventoryId).then((inventory) =>
				getComponentById(inventory.componentId).then((component) =>
					setInventoryName(component.name)
				)
			);
			setUnitId(part.unitId);
		}
	}, [part]);

	useEffect(() => {
		getInventoryFromDataList();
	}, [inventoryName]);

	useEffect(() => {
		const copy = { ...buildPart };
		copy.unitId = unitId;
		setBuildPart(copy);
	}, [unitId]);

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...buildPart };
		const [prop] = e.target.id.split("--");
		copy[prop] = e.target.value;
		setBuildPart(copy);
	};
	const handleCheckbox = (e) => {
		const copy = { ...buildPart };
		copy[e.target.id] = e.target.checked;
		setBuildPart(copy);
	};

	useEffect(() => {
		setter(index, buildPart);
	}, [buildPart]);

	return (
		<Stack direction='horizontal' gap={3} className='flex-wrap'>
			<Stack
				style={{
					maxWidth: `3em`,
				}}
			>
				<Form.Group>
					<Form.Label>Order</Form.Label>
					<Form.Control
						type='number'
						id={`order--${index}`}
						placeholder={index + 1}
						value={buildPart.order ? buildPart.order : ""}
						onChange={handleChange}
					/>
				</Form.Group>
			</Stack>
			<Stack
				style={{
					maxWidth: `3em`,
				}}
			>
				<Form.Check type='checkbox' id=''>
					<Stack className='justify-content-between align-items-center'>
						<Form.Check.Label>Primary</Form.Check.Label>
						<Form.Check.Input
							type='checkbox'
							id='isPrimary'
							checked={buildPart.isPrimary}
							onChange={handleCheckbox}
							className='mt-3'
						/>
					</Stack>
				</Form.Check>
			</Stack>
			<Stack>
				<Form.Group>
					<Form.Label>Inventory</Form.Label>
					<BarInventoryDataList
						inventoryName={inventoryName ? inventoryName : ""}
						setInventoryName={setInventoryName}
					/>
				</Form.Group>
			</Stack>
			<Stack
				style={{
					maxWidth: `5em`,
				}}
			>
				<Form.Group>
					<Form.Label>Amount</Form.Label>
					<Form.Control
						type='number'
						id={`amount--${index}`}
						value={part.amount}
						onChange={handleChange}
					/>
				</Form.Group>
			</Stack>
			<UnitDropDown unitId={unitId} setUnitId={setUnitId} part={buildPart} />
			<Stack className='justify-content-end'>
				<Button
					variant='outline-secondary'
					onClick={(e) => {
						e.preventDefault();
						handleRemove(index);
					}}
				>
					Remove
				</Button>
			</Stack>
		</Stack>
	);
};
