import { Alert, Button, Card, Stack } from "react-bootstrap";
import {
	deleteInventory,
	getBarInventory,
} from "../../managers/InventoryManager";
import { Link, useNavigate } from "react-router-dom";

export const DeleteInventory = ({ inventory, handleClose, setInventories }) => {
	const navigate = useNavigate();
	const bar = JSON.parse(localStorage.getItem("bar"));
	const handleDelete = () => {
		return deleteInventory(inventory.id)
			.then((response) =>
				getBarInventory(bar.id).then((res) => setInventories(res))
			)
			.then(() => handleClose());
	};
	return (
		<Stack gap={3}>
			<Alert variant='danger'>
				<Alert.Heading>
					WARNING: You are about to delete the following inventory
				</Alert.Heading>
				<p>
					Deleting this inventory will remove it from all current menu items
					marked with this inventory and delete all inventory adjustments and
					links that have been created using this inventory. It is best practice
					to Adjust the inventory instead to preserve the integrity of the
					software and it's systems.
				</p>
				<hr />
				<Stack direction='horizontal' className='justify-content-end'>
					<Button
						variant='secondary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/bar/${bar.id}/inventory/${inventory.id}/adjust`);
						}}
					>
						Adjust inventory instead
					</Button>
				</Stack>
			</Alert>
			<Card>
				<Card.Header>
					<Stack direction='horizontal' className='justify-content-between'>
						<h4>{inventory?.component?.name}</h4>
					</Stack>
				</Card.Header>
				<Card.Body>
					<Stack direction='horizontal' gap={5} className='flex-wrap'>
						<Stack direction='horizontal' gap={2}>
							<h5 className='m-0'>Quantity:</h5>
							<div>
								{inventory &&
								inventory.totalQuantity !== 1 &&
								inventory.unit?.name === "unit"
									? Number(inventory.totalQuantity).toFixed(2) +
									  " " +
									  inventory?.unit?.name +
									  "s"
									: inventory &&
									  inventory.totalQuantity === 1 &&
									  inventory.unit?.name === "unit"
									? Number(inventory.totalQuantity).toFixed(2) +
									  " " +
									  inventory?.unit?.name
									: inventory &&
									  inventory.totalQuantity !== 1 &&
									  inventory.unit?.name !== "unit"
									? Number(inventory.totalQuantity).toFixed(2) +
									  " " +
									  inventory.unitSize +
									  " " +
									  inventory?.unit?.name +
									  " " +
									  inventory?.unitType?.name +
									  "s"
									: Number(inventory.totalQuantity).toFixed(2) +
									  " " +
									  inventory.unitSize +
									  " " +
									  inventory?.unit?.name +
									  " " +
									  inventory?.unitType?.name}
							</div>
						</Stack>
						<Stack direction='horizontal' gap={2}>
							<h5 className='m-0'>
								{inventory.costPerOunce ? "CPO:" : "CPU:"}
							</h5>
							<div>
								{inventory.costPerOunce
									? `$${inventory.costPerOunce}`
									: `$${inventory.costPerUnit}`}
							</div>
						</Stack>
						<Stack direction='horizontal' gap={2}>
							<h5 className='m-0'>Markup:</h5>
							<div>{inventory.markup}%</div>
						</Stack>
					</Stack>
				</Card.Body>
				<Card.Footer>
					<Stack>
						<Button
							variant='danger'
							onClick={(e) => {
								e.preventDefault();
								handleDelete();
							}}
						>
							Confirm delete
						</Button>
					</Stack>
				</Card.Footer>
			</Card>
		</Stack>
	);
};
