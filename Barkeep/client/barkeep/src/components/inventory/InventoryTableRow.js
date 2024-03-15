import { Button, Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getInventoryById, getQuantity } from "../../managers/InventoryManager";
import { useEffect, useState } from "react";

export const InventoryTableRow = ({
	inventory,
	setInventoryToDelete,
	handleShow,
}) => {
	const { barId } = useParams();
	const navigate = useNavigate();

	const [thisInventory, setThisInventory] = useState({});

	const getCostFromLink = (inventory) => {
		if (inventory.outInventoryLinks && inventory.outInventoryLinks.length) {
			let subTotal = 0;
			inventory?.outInventoryLinks.forEach((link) => {
				if (link.inInventory?.unit?.name == "unit") {
					const inInventoryCost = link.inInventory.costPerUnit * link.yield;
					subTotal += inInventoryCost;
				}
				if (link.inInventory?.unit?.name != "unit") {
					const inInventoryCost = link.inInventory.costPerOunce * link.yield;
					subTotal += inInventoryCost;
				}
			});
			return Number(subTotal / inventory?.outInventoryLinks.length).toFixed(2);
		}
	};

	useEffect(() => {
		getInventoryById(inventory.id).then((res) => setThisInventory(res));
	}, [inventory]);
	return (
		<tr>
			<td>{thisInventory.id}</td>
			<td>{thisInventory?.component?.name}</td>
			<td>{thisInventory?.component?.componentType?.name}</td>
			<td>
				{thisInventory &&
				thisInventory.totalQuantity !== 1 &&
				thisInventory.unit?.name === "unit"
					? Number(thisInventory.totalQuantity).toFixed(2) +
					  " " +
					  thisInventory?.unit?.name +
					  "s"
					: thisInventory &&
					  thisInventory.totalQuantity === 1 &&
					  thisInventory.unit?.name === "unit"
					? Number(thisInventory.totalQuantity).toFixed(2) +
					  " " +
					  thisInventory?.unit?.name
					: thisInventory &&
					  thisInventory.totalQuantity !== 1 &&
					  thisInventory.unit?.name !== "unit"
					? Number(thisInventory.totalQuantity).toFixed(2) +
					  " " +
					  thisInventory.unitSize +
					  " " +
					  thisInventory?.unit?.name +
					  " " +
					  thisInventory?.unitType?.name +
					  "s"
					: Number(thisInventory.totalQuantity).toFixed(2) +
					  " " +
					  thisInventory.unitSize +
					  " " +
					  thisInventory?.unit?.name +
					  " " +
					  thisInventory?.unitType?.name}
			</td>
			<td>
				$
				{thisInventory.costPerOunce && !thisInventory.costPerUnit
					? Number(thisInventory.costPerOunce).toFixed(2)
					: thisInventory.costPerUnit && !thisInventory.costPerOunce
					? Number(thisInventory.costPerUnit).toFixed(2)
					: getCostFromLink(thisInventory)}
			</td>
			<td>
				<Stack gap={1} className='justify-content-end'>
					<Button
						variant='outline-secondary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/bar/${barId}/inventory/${thisInventory.id}/adjust`);
						}}
					>
						Adjust
					</Button>
					<Button
						variant='danger'
						onClick={(e) => {
							e.preventDefault();
							setInventoryToDelete({ ...inventory });
							handleShow();
						}}
					>
						Delete
					</Button>
				</Stack>
			</td>
		</tr>
	);
};
