import {
	Alert,
	Button,
	Card,
	CardFooter,
	Container,
	Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { updateInventory } from "../../managers/InventoryManager";
import { useEffect } from "react";

export const Inventory = ({
	inventory,
	bar,
	handleShow,
	handleShowEditInventory,
	adjustCost,
	setAdjustCost,
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
		if (!copy.costPerOunce && !copy.costPerUnit) {
			if (copy?.unit?.name === "unit") {
				copy.costPerUnit = getCostFromLink();
			} else {
				copy.costPerOunce = getCostFromLink();
			}
		}
		updateInventory(copy)
			.then(() => getInventory(copy.id))
			.then(() => setAdjustCost(false));
	};

	const getCostFromLink = () => {
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
			return Number(subTotal / inventory.outInventoryLinks.length);
		}
	};

	useEffect(() => {
		if (
			!inventory.costPerOunce &&
			!inventory.costPerUnit &&
			averageAdjusmentCostPer
		) {
			handleUpdate();
		}
	}, [inventory, averageAdjusmentCostPer]);

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
						<h5 className='m-0'>
							{inventory?.unit?.name != "unit" ? "CPO:" : "CPU:"}
						</h5>
						<div>
							{!inventory.costPerOunce &&
							!inventory.costPerUnit &&
							!inventory.outInventoryLinks
								? `$0.00`
								: !inventory.costPerOunce &&
								  !inventory.costPerUnit &&
								  inventory.outInventoryLinks.length
								? `$${getCostFromLink().toFixed(2)}`
								: inventory.costPerOunce && !inventory.costPerUnit
								? `$${Number(inventory.costPerOunce).toFixed(2)}`
								: `$${Number(inventory.costPerUnit).toFixed(2)}`}
						</div>
					</Stack>
					{adjustCost && inventory.costPerOunce && !inventory.costPerUnit ? (
						<Stack>
							<Alert>
								<Stack
									direction='horizontal'
									className='justify-content-between'
								>
									<div>
										The average cost per ounce from your adjustments is
										{averageAdjusmentCostPer > inventory.costPerOunce
											? " higher "
											: " lower "}{" "}
										than your current inventory cost per ounce.
									</div>
									<div>
										Update CPO to: ${Number(averageAdjusmentCostPer).toFixed(2)}
									</div>
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
							</Alert>
						</Stack>
					) : adjustCost && inventory.costPerUnit && !inventory.costPerOunce ? (
						<Stack>
							<div>
								The average cost per unit from your adjustments is
								{averageAdjusmentCostPer > inventory.costPerUnit
									? " higher "
									: " lower "}{" "}
								than your current inventory cost per unit.
							</div>
							<Stack direction='horizontal' className='justify-content-between'>
								<div>
									Update CPU to: ${Number(averageAdjusmentCostPer).toFixed(2)}
								</div>
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
					) : adjustCost &&
					  !inventory.costPerUnit &&
					  !inventory.costPerOunce ? (
						<Stack>
							<Stack
								direction='horizontal'
								gap={3}
								className='justify-content-between'
							>
								<Stack>
									<Alert>
										<div>
											Cost Per is currently being derived from this inventory's
											adjustment links.
										</div>
										<div>
											Update CPU/CPO to: ${Number(getCostFromLink()).toFixed(2)}
											?
										</div>
									</Alert>
								</Stack>
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
