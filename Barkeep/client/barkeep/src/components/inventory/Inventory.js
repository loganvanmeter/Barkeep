import { Button, Card, CardFooter, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Inventory = ({
	inventory,
	bar,
	handleShow,
	handleShowEditInventory,
}) => {
	return (
		<Card>
			<Card.Header>
				<Stack direction='horizontal' className='justify-content-between'>
					<h4>{inventory?.component?.name}</h4>
					<Button
						variant='secondary'
						onClick={(e) => {
							e.preventDefault();
							handleShowEditInventory();
						}}
					>
						Edit inventory tracking
					</Button>
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
						<h5 className='m-0'>{inventory.costPerOunce ? "CPO:" : "CPU:"}</h5>
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
			<CardFooter>
				<Stack direction='horizontal' className='justify-content-between'>
					<Link to={`/bar/${bar.id}/inventory`}>Back to bar inventory</Link>

					<Button
						variant='success'
						onClick={(e) => {
							e.preventDefault();
							handleShow();
						}}
					>
						Add adjustment
					</Button>
				</Stack>
			</CardFooter>
		</Card>
	);
};
