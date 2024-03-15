import { useEffect, useState } from "react";
import {
	getBarInventory,
	getInventoryById,
} from "../../managers/InventoryManager";
import { useParams } from "react-router-dom";
import { Button, Form, Stack } from "react-bootstrap";
import { BarInventoryDataList } from "../forms/BarInventoryDataList";
import { UnitDropDown } from "../forms/UnitDropDown";
import { addInventoryLink } from "../../managers/InventoryLinkManager";

export const AddInventoryLink = ({
	handleCloseInventoryLink,
	getInventory,
}) => {
	const bar = JSON.parse(localStorage.getItem("bar"));
	const { inventoryId } = useParams();
	const [inventoryLink, setInventoryLink] = useState({
		inInventoryId: 0,
		inUnitId: 0,
		inAmount: 0,
		outInventoryId: 0,
		outUnitId: 0,
		outAmount: 0,
		onlyAdjustsOnStock: false,
	});
	const [inInventoryName, setInInventoryName] = useState("");
	const [outInventoryName, setOutInventoryName] = useState("");
	const [inInventory, setInInventory] = useState({});
	const [inUnitId, setInUnitId] = useState(0);
	const [outUnitId, setOutUnitId] = useState(0);
	const [outInventory, setOutInventory] = useState({});

	const getInventoryFromDataList = () => {
		return getBarInventory(bar.id).then((inventories) =>
			inventories.forEach((inventory) => {
				if (
					inventory?.component?.name.toLowerCase() ===
					inInventoryName.toLowerCase()
				) {
					setInInventory(inventory);
				}
				if (
					inventory?.component?.name.toLowerCase() ===
					outInventoryName.toLowerCase()
				) {
					setOutInventory(inventory);
				}
			})
		);
	};

	const getThisInventory = () => {
		return getInventoryById(inventoryId).then((inventory) => {
			setInInventory(inventory);
			setInInventoryName(inventory?.component?.name);
			setInUnitId(inventory.unitId);
		});
	};

	useEffect(() => {
		getThisInventory();
	}, [inventoryId]);

	useEffect(() => {
		const copy = { ...inventoryLink };
		if (inInventory.id) {
			copy.inInventoryId = inInventory.id;
		}
		if (outInventory.id) {
			copy.outInventoryId = outInventory.id;
		}
		if (inUnitId) {
			copy.inUnitId = inUnitId;
		}
		if (outUnitId) {
			copy.outUnitId = outUnitId;
		}
		setInventoryLink(copy);
	}, [inInventory, outInventory, inUnitId, outUnitId]);

	useEffect(() => {
		if (inInventoryName || outInventoryName) {
			getInventoryFromDataList();
		}
	}, [inInventoryName, outInventoryName]);

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...inventoryLink };
		copy[e.target.id] = e.target.value;
		setInventoryLink(copy);
	};

	const handleCheckbox = (e) => {
		const copy = { ...inventoryLink };
		copy[e.target.id] = e.target.checked;
		setInventoryLink(copy);
	};

	const handleSwap = (e) => {
		e.preventDefault();
		const copy = { ...inventoryLink };
		const copyInInv = { ...inInventory };
		const copyInName = inInventoryName;
		const copyInAmount = inventoryLink.inAmount;
		const copyInUnit = inUnitId;

		const copyOutInv = { ...outInventory };
		const copyOutName = outInventoryName;
		const copyOutAmount = inventoryLink.outAmount;
		const copyOutUnit = outUnitId;

		setInInventory(copyOutInv);
		setInInventoryName(copyOutName);
		copy.inAmount = copyOutAmount;
		setInUnitId(copyOutUnit);

		setOutInventory(copyInInv);
		setOutInventoryName(copyInName);
		copy.outAmount = copyInAmount;
		setOutUnitId(copyInUnit);

		setInventoryLink(copy);
	};

	const handleSumbit = (e) => {
		e.preventDefault();
		const copy = { ...inventoryLink };
		copy.inAmount = parseFloat(copy.inAmount);
		copy.outAmount = parseFloat(copy.outAmount);
		return addInventoryLink(copy)
			.then(() => getInventory(inventoryId))
			.then(() => handleCloseInventoryLink());
	};

	return (
		<Form>
			<Stack gap={3}>
				<Stack direction='horizontal' gap={3} className='flex-wrap'>
					<Stack>
						<Form.Group>
							<Form.Label>In Amount</Form.Label>
							<Form.Control
								type='number'
								id='inAmount'
								value={inventoryLink.inAmount}
								onChange={handleChange}
							/>
						</Form.Group>
					</Stack>
					<UnitDropDown unitId={inUnitId} setUnitId={setInUnitId} />
					<Stack>
						<Form.Group>
							<Form.Label>In Inventory</Form.Label>
							<BarInventoryDataList
								inventoryName={inInventoryName}
								setInventoryName={setInInventoryName}
							/>
						</Form.Group>
					</Stack>
				</Stack>
				<Stack>
					<Button
						variant='outline-secondary'
						onClick={(e) => {
							handleSwap(e);
						}}
					>
						{"⇅"}
					</Button>
				</Stack>
				<Stack direction='horizontal' gap={3} className='flex-wrap'>
					<Stack>
						<Form.Group>
							<Form.Label>Out Amount</Form.Label>
							<Form.Control
								type='number'
								id='outAmount'
								value={inventoryLink.outAmount}
								onChange={handleChange}
							/>
						</Form.Group>
					</Stack>
					<UnitDropDown unitId={outUnitId} setUnitId={setOutUnitId} />
					<Stack>
						<Form.Group>
							<Form.Label>Out Inventory</Form.Label>
							<BarInventoryDataList
								inventoryName={outInventoryName}
								setInventoryName={setOutInventoryName}
							/>
						</Form.Group>
					</Stack>
				</Stack>
				<Stack
					direction='horizontal'
					gap={3}
					className='flex-wrap justify-content-end'
				>
					<Form.Check type='checkbox'>
						<Stack direction='horizontal' gap={2}>
							<Form.Check.Label>Only adjusts on stock</Form.Check.Label>
							<Form.Check.Input
								type='checkbox'
								id='onlyAdjustsOnStock'
								checked={inventoryLink.onlyAdjustsOnStock}
								onChange={handleCheckbox}
							/>
						</Stack>
					</Form.Check>
				</Stack>
				<Stack>
					<Button variant='primary' onClick={handleSumbit}>
						Save inventory link
					</Button>
				</Stack>
			</Stack>
		</Form>
	);
};
