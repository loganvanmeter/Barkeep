import { useEffect, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ComponentDataList } from "../forms/ComponentDataList";
import { getComponentTypeById } from "../../managers/ComponentTypeManager";
import {
	getAllAvailableBarComponents,
	getComponentByName,
} from "../../managers/ComponentManager";
import { BarAdminSideBar } from "../../nav/BarSideBar";
import { Component } from "../components/Component";
import { UnitDropDown } from "../forms/UnitDropDown";
import { UnitTypeDropDown } from "../forms/UnitTypeDropDown";
import { getUnitById } from "../../managers/UnitManager";
import { getUnitTypeById } from "../../managers/UnitTypeManager";
import { AddInventoryAdjustment } from "../inventoryAdjustments/AddInventoryAdjustment";

export const AddInventory = () => {
	const { barId } = useParams();
	const bar = JSON.parse(localStorage.getItem("bar"));
	const barUser = JSON.parse(localStorage.getItem("barUser"));
	const [inventory, setInventory] = useState({
		barId: parseInt(barId),
		componentId: null,
		quantity: 0,
		unitId: null,
		unitSize: null,
		unitTypeId: null,
		costPerOunce: 0,
		markup: null,
	});
	const [componentName, setComponentName] = useState("");
	const [isExistingComponent, setIsExistingComponent] = useState(false);
	const [showComponentSearch, setShowComponentSearch] = useState(true);
	const [components, setComponents] = useState([]);
	const [component, setComponent] = useState({
		id: 0,
		name: null,
		componentTypeId: null,
		abv: null,
		ibu: null,
		description: null,
		year: null,
		producerId: null,
		importerId: null,
		providerBarId: null,
		countryId: null,
		stateId: null,
		regionId: null,
		cityId: null,
		isAdminApproved: null,
	});
	const [unit, setUnit] = useState();
	const [unitType, setUnitType] = useState();
	const [inventoryAdjustment, setInventoryAdjustment] = useState({
		inventoryId: null,
		distributorId: null,
		inventoryAdjustmentTypeId: null,
		quantity: 0,
		itemsPerUnit: null,
		cost: 0,
		unitId: null,
		unitSize: null,
		unitTypeId: null,
		includeInInventoryCostPerOunce: true,
		createDateTime: null,
		expirationDate: null,
		barUserId: barUser.id,
	});
	const [unitId, setUnitId] = useState(0);
	const [unitTypeId, setUnitTypeId] = useState(0);
	const [showInventoryAdjustment, setShowInventoryAdjustment] = useState(false);
	const [initialInventoryQuantity, setInitialInventoryQuantity] = useState();
	const [adjustmentUnit, setAdjustmentUnit] = useState({});
	const [adjustmentUnitType, setAdjustmentUnitType] = useState({});
	const getBarComponents = () => {
		return getAllAvailableBarComponents(barId).then((res) =>
			setComponents(res)
		);
	};
	const getUnit = () => {
		return getUnitById(unitId).then((unit) => setUnit(unit));
	};
	const getAdjustmentUnit = () => {
		return getUnitById(inventoryAdjustment.unitId).then((unit) =>
			setAdjustmentUnit(unit)
		);
	};
	const getUnitType = () => {
		return getUnitTypeById(unitTypeId).then((unitType) =>
			setUnitType(unitType)
		);
	};
	const getAdjustmentUnitType = () => {
		return getUnitTypeById(inventoryAdjustment.unitTypeId).then((unitType) =>
			setAdjustmentUnitType(unitType)
		);
	};
	const isMatchingComponent = () => {
		const matchingComponent = components.find(
			(component) => component.name == componentName
		);
		return matchingComponent;
	};

	const getComponent = () => {
		return getComponentByName(componentName).then((res) => {
			setComponent(res);
			setIsExistingComponent(true);
			const copy = { ...inventory };
			copy.componentId = res.id;
			setInventory(copy);
		});
	};

	const getCostPerOunce = () => {
		let totalOunces;
		const totalCost = inventoryAdjustment.cost * inventoryAdjustment.quantity;
		if (unit.measurement !== "unit") {
			if (
				adjustmentUnit.measurement === "fl oz" ||
				adjustmentUnit.measurement === "oz"
			) {
				totalOunces =
					adjustmentUnit.size *
					inventoryAdjustment.unitSize *
					inventoryAdjustment.itemsPerUnit *
					inventoryAdjustment.quantity;
			} else if (
				adjustmentUnit.measurement === "mL" ||
				adjustmentUnit.measurement === "g"
			) {
				totalOunces =
					adjustmentUnit.size *
					inventoryAdjustment.unitSize *
					inventoryAdjustment.itemsPerUnit *
					inventoryAdjustment.quantity *
					adjustmentUnit.imperialConversion;
			} else if (adjustmentUnit.measurement === "unit") {
				if (unit.measurement === "fl oz" || unit.measurement === "oz") {
					totalOunces =
						unit.size *
						inventoryAdjustment.unitSize *
						inventoryAdjustment.itemsPerUnit *
						inventoryAdjustment.quantity;
				} else if (unit.measurement === "mL" || unit.measurement === "g") {
					totalOunces =
						unit.size *
						inventoryAdjustment.unitSize *
						inventoryAdjustment.itemsPerUnit *
						inventoryAdjustment.quantity *
						unit.imperialConversion;
				}
			}
		}
		const CPO = totalCost / totalOunces;
		return CPO.toFixed(2);
	};

	const getQuantity = () => {
		let totalQuantity;
		let adjustmentQuantity;
		if (adjustmentUnitType.name === "Case") {
			adjustmentQuantity =
				inventoryAdjustment.quantity * inventoryAdjustment.itemsPerUnit;
		} else if (adjustmentUnitType.name !== "Case") {
			if (inventory.unitId === inventoryAdjustment.unitId) {
				adjustmentQuantity = parseFloat(inventoryAdjustment.quantity);
			} else if (inventory.unitId !== inventoryAdjustment.unitId) {
				if (unit.measurement === adjustmentUnit.measurement) {
					adjustmentQuantity =
						(adjustmentUnit.size *
							inventoryAdjustment.unitSize *
							inventoryAdjustment.itemsPerUnit *
							inventoryAdjustment.quantity) /
						unit.size;
				} else if (unit.measurement !== adjustmentUnit.measurement) {
					if (unit.measurement === "mL" || unit.measurement === "g") {
						adjustmentQuantity =
							(adjustmentUnit.size *
								inventoryAdjustment.unitSize *
								inventoryAdjustment.itemsPerUnit *
								inventoryAdjustment.quantity *
								adjustmentUnit.metricConversion) /
							unit.size;
					} else if (
						unit.measurement === "fl oz" ||
						unit.measurement === "oz"
					) {
						adjustmentQuantity =
							(adjustmentUnit.size *
								inventoryAdjustment.unitSize *
								inventoryAdjustment.itemsPerUnit *
								inventoryAdjustment.quantity *
								adjustmentUnit.imperialConversion) /
							unit.size;
					}
				}
			}
		}
		totalQuantity = initialInventoryQuantity + adjustmentQuantity;
		return totalQuantity.toFixed(2);
	};

	useEffect(() => {
		setInitialInventoryQuantity(inventory.quantity);
	}, []);

	useEffect(() => {
		if (
			adjustmentUnit &&
			inventoryAdjustment.includeInInventoryCostPerOunce &&
			inventoryAdjustment.cost &&
			inventoryAdjustment.unitSize &&
			inventoryAdjustment.quantity &&
			inventoryAdjustment.itemsPerUnit
		) {
			const copy = { ...inventory };
			copy.costPerOunce = getCostPerOunce();
			copy.quantity = getQuantity();
			setInventory(copy);
		} else {
			const copy = { ...inventory };
			copy.costPerOunce = 0;
			copy.quantity = initialInventoryQuantity;
			setInventory(copy);
		}
	}, [adjustmentUnit, inventoryAdjustment, initialInventoryQuantity]);

	useEffect(() => {
		getBarComponents();
	}, [barId]);

	useEffect(() => {
		if (unitId) {
			const copy = { ...inventory };
			copy.unitId = unitId;
			setInventory(copy);
			getUnit();
		}
		if (unitTypeId) {
			const copy = { ...inventory };
			copy.unitTypeId = unitTypeId;
			setInventory(copy);
			getUnitType();
		}
	}, [unitId, unitTypeId]);

	useEffect(() => {
		if (inventoryAdjustment.unitId) {
			getAdjustmentUnit();
		}
		if (inventoryAdjustment.unitTypeId) {
			getAdjustmentUnitType(unitTypeId);
		}
	}, [inventoryAdjustment]);

	useEffect(() => {
		if (isMatchingComponent()) {
			getComponent();
		} else {
			setComponent({
				id: 0,
				name: null,
				componentTypeId: null,
				abv: null,
				ibu: null,
				description: null,
				year: null,
				producerId: null,
				importerId: null,
				providerBarId: null,
				countryId: null,
				stateId: null,
				regionId: null,
				cityId: null,
				isAdminApproved: null,
			});
			setIsExistingComponent(false);
			const copy = { ...inventory };
			copy.componentId = null;
			setInventory(copy);
		}
	}, [componentName]);

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...inventory };
		copy[e.target.id] = e.target.value;
		setInventory(copy);
	};

	return (
		<>
			<BarAdminSideBar bar={bar} />
			<Container>
				<Stack gap={3}>
					<Form>
						{showComponentSearch ? (
							<Stack gap={3}>
								<Stack
									direction='horizontal'
									gap={3}
									className='align-items-end'
								>
									<Stack>
										<Form.Group>
											<Form.Label>Component Name</Form.Label>

											<Form.Control
												type='text'
												id='componentName'
												autoComplete='off'
												value={componentName}
												list='component'
												onChange={(e) => setComponentName(e.target.value)}
											/>
											<ComponentDataList />
										</Form.Group>
									</Stack>
									<Button
										onClick={(e) => {
											e.preventDefault();
											setShowComponentSearch(false);
										}}
									>
										Stock this component
									</Button>
								</Stack>
							</Stack>
						) : (
							""
						)}
					</Form>
					{component.id && showComponentSearch ? (
						<Component component={component} />
					) : component.id && !showComponentSearch ? (
						<Stack gap={5}>
							<h3>Adding {component.name} to inventory</h3>
							{(inventory && inventory.quantity) ||
							(inventory && inventory.costPerOunce) ? (
								<Stack direction='horizontal' gap={3}>
									{inventory.quantity ? (
										<Stack className='justify-content-end'>
											<h4>Quantity: {inventory.quantity}</h4>
										</Stack>
									) : (
										""
									)}
									{inventory.costPerOunce ? (
										<Stack className='justify-content-end'>
											<h4>Cost per ounce: ${inventory.costPerOunce}</h4>
										</Stack>
									) : (
										""
									)}
									<Stack direction='horizontal' gap={2}>
										<Form.Label>
											<h4 className='m-0'>Markup</h4>
										</Form.Label>
										<Form.Control
											type='number'
											id='markup'
											value={inventory.markup ? inventory.markup : 300}
											onChange={handleChange}
										/>
										<div>%</div>
									</Stack>
								</Stack>
							) : (
								" "
							)}
							<Stack
								direction='horizontal'
								gap={3}
								className='align-items-end flex-wrap'
							>
								<Stack className='justify-content-end align-items-center'>
									<h4>Track inventory unit as a:</h4>
								</Stack>
								<Stack>
									<Form.Label>Unit Size</Form.Label>
									<Form.Control
										type='number'
										id='unitSize'
										value={inventory.unitSize ? inventory.unitSize : ""}
										onChange={handleChange}
									/>
								</Stack>

								<UnitDropDown setUnitId={setUnitId} unitId={unitId} />

								<UnitTypeDropDown
									setUnitTypeId={setUnitTypeId}
									unitTypeId={unitTypeId}
								/>
							</Stack>
							{unitId && unitTypeId ? (
								<Stack>
									<AddInventoryAdjustment
										inventory={inventory}
										inventoryAdjustment={inventoryAdjustment}
										setInventoryAdjustment={setInventoryAdjustment}
									/>
								</Stack>
							) : (
								""
							)}
						</Stack>
					) : (
						""
					)}
				</Stack>
			</Container>
		</>
	);
};
