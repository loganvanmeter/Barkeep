import { Button, Card, CardFooter, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Inventory = ({ inventory, bar, handleShow }) => {
	return (
		<Card>
			<Card.Header>
				<h4>{inventory?.component?.name}</h4>
			</Card.Header>
			<Card.Body>
				<Stack direction='horizontal' gap={5} className='flex-wrap'>
					<Stack direction='horizontal' gap={2}>
						<h5 className='m-0'>Quantity:</h5>
						<div>
							{`${
								inventory.totalQuantity
									? inventory.totalQuantity
									: inventory.quantity
							}`}{" "}
							{inventory?.unit?.name === "unit" &&
							(inventory.totalQuantity > 1 || inventory.quantity > 1)
								? inventory?.unit?.name + "s"
								: inventory?.unit?.name}
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
