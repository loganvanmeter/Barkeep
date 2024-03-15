import { Button, Card, CardFooter, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { updateInventory } from "../../managers/InventoryManager";

export const Inventory = ({
	inventory,
	bar,
	handleShow,
	handleShowEditInventory,
	adjustCost,
	averageAdjusmentCostPer,
	getInventory,
}) => {
	const handleUpdate = () => {
		const copy = { ...inventory };
		if (copy.costPerOunce) {
			copy.costPerOunce = parseFloat(averageAdjusmentCostPer);
		}
		if (copy.costPerUnit) {
			copy.costPerUnit = parseFloat(averageAdjusmentCostPer);
		}
		updateInventory(copy).then(() => getInventory(copy.id));
	};

	const getCostFromLink = () => {
		if (inventory?.outInventoryLinks.length) {
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
				<Stack gap={3}>
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
							{!inventory.costPerOunce &&
							!inventory.costPerUnit &&
							!inventory.outInventoryLinks
								? `$0.00`
								: !inventory.costPerOunce &&
								  !inventory.costPerUnit &&
								  inventory.outInventoryLinks
								? `$${getCostFromLink()}`
								: inventory.costPerOunce && !inventory.costPerUnit
								? `$${Number(inventory.costPerOunce).toFixed(2)}`
								: `$${Number(inventory.costPerUnit).toFixed(2)}`}
						</div>
					</Stack>
					{adjustCost && inventory.costPerOunce ? (
						<Stack>
							<div>
								The average cost per ounce from your adjustments is
								{averageAdjusmentCostPer > inventory.costPerOunce
									? " higher "
									: " lower "}{" "}
								than your current inventory cost per ounce.
							</div>
							<Stack direction='horizontal' className='justify-content-between'>
								<div>Update CPO to: ${averageAdjusmentCostPer}</div>
								<Button
									variant='success'
									onClick={(e) => {
										e.preventDefault();
										handleUpdate();
									}}
								>
									Update
								</Button>
							</Stack>
						</Stack>
					) : adjustCost && inventory.costPerUnit ? (
						<Stack>
							<div>
								The average cost per unit from your adjustments is
								{averageAdjusmentCostPer > inventory.costPerUnit
									? " higher "
									: " lower "}{" "}
								than your current inventory cost per unit.
							</div>
							<Stack direction='horizontal' className='justify-content-between'>
								<div>Update CPU to: ${averageAdjusmentCostPer}</div>
								<Button
									variant='success'
									onClick={(e) => {
										e.preventDefault();
										handleUpdate();
									}}
								>
									Update
								</Button>
							</Stack>
						</Stack>
					) : (
						""
					)}
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
