import { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
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
import { addInventory } from "../../managers/InventoryManager";
import { addInventoryAdjustment } from "../../managers/InventoryAdjustmentManager";
import { AddComponent } from "../components/AddComponent";

export const AddInventory = () => {
	const { barId } = useParams();
	const navigate = useNavigate();
	const bar = JSON.parse(localStorage.getItem("bar"));
	const barUser = JSON.parse(localStorage.getItem("barUser"));
	const [show, setShow] = useState(false);
	const [inventory, setInventory] = useState({
		barId: bar.id,
		componentId: null,
		quantity: 0,
		unitId: null,
		unitSize: null,
		unitTypeId: null,
		costPerOunce: 0,
		costPerUnit: 0,
		markup: 300,
	});
	const [finalInventoryQuantity, setFinalInventoryQuantity] = useState();
	const [componentName, setComponentName] = useState("");
	const [isExistingComponent, setIsExistingComponent] = useState(false);
	const [showComponentSearch, setShowComponentSearch] = useState(true);
	const [showInventoryAdjustment, setShowInventoryAdjustment] = useState(true);
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
	const [showCPU, setShowCPU] = useState(false);
	const [initialInventoryQuantity, setInitialInventoryQuantity] = useState();
	const [adjustmentQuantity, setAdjustmentQuantity] = useState();
	const [adjustmentUnit, setAdjustmentUnit] = useState({});
	const [adjustmentUnitType, setAdjustmentUnitType] = useState({});
	const [showAlert, setShowAlert] = useState(false);
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
			if (res.id) {
				setIsExistingComponent(true);
			}
			const copy = { ...inventory };
			copy.componentId = res.id;
			setInventory(copy);
		});
	};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		setInitialInventoryQuantity(inventory.quantity);
	}, []);

	const getCostPerOunceOrCostPerUnit = () => {
		if (unit && adjustmentUnit) {
			const totalUnits =
				parseFloat(inventoryAdjustment.itemsPerUnit) *
				adjustmentUnit.size *
				inventoryAdjustment.unitSize;
			const CPU = parseFloat(inventoryAdjustment.cost);
			if (unit.measurement === "unit") {
				return (CPU / parseFloat(inventoryAdjustment.itemsPerUnit)).toFixed(2);
			} else if (unit.measurement !== "unit") {
				if (
					adjustmentUnit.measurement === "fl oz" ||
					adjustmentUnit.measurement === "oz"
				) {
					const totalOunces = totalUnits;
					return (CPU / totalOunces).toFixed(2);
				} else if (
					adjustmentUnit.measurement === "mL" ||
					adjustmentUnit.measurement === "g"
				) {
					const totalOunces = totalUnits * adjustmentUnit.imperialConversion;
					return (CPU / totalOunces).toFixed(2);
				} else if (adjustmentUnit.measurement === "unit") {
					return (
						CPU /
						(parseFloat(inventoryAdjustment.itemsPerUnit) *
							unit.size *
							inventoryAdjustment.unitSize *
							unit.imperialConversion)
					).toFixed(2);
				}
			}
		}
	};

	const getQuantity = () => {
		let totalQuantity;
		let subQuantity;
		if (unit && adjustmentUnit) {
			const adjustmentQuantity =
				parseFloat(inventoryAdjustment.quantity) *
				parseFloat(inventoryAdjustment.itemsPerUnit);
			const adjustmentSize = inventoryAdjustment.unitSize * adjustmentUnit.size;
			const inventorySize = unit.size * inventory.unitSize;
			const totalUnits = (adjustmentQuantity * adjustmentSize) / inventorySize;
			if (
				unit.measurement === "unit" &&
				adjustmentUnit.measurement === "unit"
			) {
				subQuantity = adjustmentQuantity;
				totalQuantity = initialInventoryQuantity + subQuantity;
				return totalQuantity.toFixed(2);
			} else if (
				unit.measurement !== "unit" &&
				adjustmentUnit.measurement === "unit"
			) {
				subQuantity = adjustmentQuantity;
				totalQuantity = initialInventoryQuantity + subQuantity;
				return totalQuantity.toFixed(2);
			} else if (
				unit.measurement !== "unit" &&
				adjustmentUnit.measurement !== "unit"
			) {
				if (unit.measurement === adjustmentUnit.measurement) {
					subQuantity = totalUnits;
					totalQuantity = initialInventoryQuantity + subQuantity;
					return totalQuantity.toFixed(2);
				} else if (unit.measurement !== adjustmentUnit.measurement) {
					if (unit.measurement === "mL" || unit.measurement === "g") {
						subQuantity = totalUnits * adjustmentUnit.metricConversion;
						totalQuantity = initialInventoryQuantity + subQuantity;
						return totalQuantity.toFixed(2);
					}
					if (unit.measurement === "fl oz" || unit.measurement === "oz") {
						subQuantity = totalUnits * adjustmentUnit.imperialConversion;
						totalQuantity = initialInventoryQuantity + subQuantity;
						return totalQuantity.toFixed(2);
					}
				}
			}
		}
		if (unit && adjustmentUnit && initialInventoryQuantity) {
			totalQuantity = initialInventoryQuantity.toFixed(2);
			return parseFloat(totalQuantity);
		}
	};

	useEffect(() => {
		setFinalInventoryQuantity(getQuantity());
	}, [
		unit,
		adjustmentUnit,
		inventoryAdjustment,
		initialInventoryQuantity,
		inventory,
	]);

	useEffect(() => {
		const copy = { ...inventory };
		if (unit && adjustmentUnit) {
			if (
				unit.measurement === "unit" &&
				adjustmentUnit.measurement === "unit"
			) {
				setShowCPU(true);
				copy.costPerUnit = getCostPerOunceOrCostPerUnit();
				copy.costPerOunce = 0;
			} else {
				setShowCPU(false);
				copy.costPerOunce = getCostPerOunceOrCostPerUnit();
				copy.costPerUnit = 0;
			}
			setInventory(copy);
		}
	}, [adjustmentUnit, unit]);

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

	useEffect(() => {
		const copy = { ...inventoryAdjustment };
		setAdjustmentQuantity(copy.quantity);
	}, [inventoryAdjustment]);

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...inventory };
		copy[e.target.id] = e.target.value;
		setInventory(copy);
	};

	const handleAddInventory = (e) => {
		e.preventDefault();
		if (isExistingComponent) {
			const copy = { ...inventory };
			copy.barId = bar.id;
			copy.quantity = parseFloat(copy.quantity);
			copy.unitSize = parseFloat(copy.unitSize);
			copy.costPerOunce =
				copy.costPerOunce === 0 ? null : parseFloat(copy.costPerOunce);
			copy.costPerUnit =
				copy.costPerUnit === 0 ? null : parseFloat(copy.costPerUnit);
			copy.markup = parseFloat(copy.markup);
			console.log(copy);
			console.log(bar);
			return addInventory(copy)
				.then((res) => res.json())
				.then((newInventory) => {
					const adjustment = { ...inventoryAdjustment };
					if (
						adjustment.quantity &&
						adjustment.itemsPerUnit &&
						adjustment.cost &&
						adjustment.unitSize
					) {
						adjustment.inventoryId = newInventory.id;
						adjustment.quantity = parseFloat(adjustment.quantity);
						adjustment.itemsPerUnit = parseFloat(adjustment.itemsPerUnit);
						adjustment.cost = parseFloat(adjustment.cost);
						adjustment.unitSize = parseFloat(adjustment.unitSize);
						adjustment.createDateTime = new Date();
						return addInventoryAdjustment(adjustment)
							.then((res) => res.json())
							.then((newAdjustment) => {
								if (newAdjustment.id) {
									navigate(`/bar/${barId}/inventory`);
								}
							});
					} else {
						navigate(`/bar/${barId}/inventory`);
					}
				});
		}
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					<AddComponent
						inventory={inventory}
						setInventory={setInventory}
						setIsExistingComponent={setIsExistingComponent}
						setInventoryComponent={setComponent}
						handleClose={handleClose}
						componentName={componentName}
					/>
				</Modal.Body>
			</Modal>
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
									{isExistingComponent ? (
										<Button
											onClick={(e) => {
												e.preventDefault();
												setShowComponentSearch(false);
											}}
										>
											Stock this component
										</Button>
									) : (
										<Button
											onClick={(e) => {
												e.preventDefault();
												handleShow();
											}}
										>
											Add this component
										</Button>
									)}
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

							<Stack direction='horizontal' gap={3}>
								<Stack className='justify-content-end'>
									{!isNaN(finalInventoryQuantity) &&
									isFinite(finalInventoryQuantity) ? (
										<h4>
											Quantity: {parseFloat(finalInventoryQuantity).toFixed(2)}
										</h4>
									) : (
										<h4>
											Quantity:{" "}
											{parseFloat(initialInventoryQuantity).toFixed(2)}
										</h4>
									)}
								</Stack>

								<Stack className='justify-content-end'>
									{inventory.costPerUnit &&
									!inventory.costPerOunce &&
									showCPU ? (
										<h4>
											Cost per unit: $
											{!isNaN(inventory.costPerUnit)
												? inventory.costPerUnit
												: "0.00"}
										</h4>
									) : !inventory.costPerUnit &&
									  inventory.costPerOunce &&
									  !showCPU ? (
										<h4>
											Cost per ounce: $
											{!isNaN(inventory.costPerOunce)
												? inventory.costPerOunce
												: "0.00"}
										</h4>
									) : (
										""
									)}
								</Stack>

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
							{!showInventoryAdjustment ? (
								<Stack direction='horizontal' gap={3}>
									<Stack>
										<h4>
											Tracking inventory as: {inventory.unitSize}
											{unit.name !== "unit" ? unit.name : ""}{" "}
											{unitType.name.toLowerCase() !== "each"
												? unitType.name.toLowerCase() + "s"
												: unitType.name.toLowerCase()}{" "}
										</h4>
									</Stack>
									<Stack>
										<Button
											variant='outline-secondary'
											onClick={(e) => {
												e.preventDefault();
												setShowInventoryAdjustment(true);
											}}
										>
											Edit
										</Button>
									</Stack>
									<Stack>
										<Button
											variant='primary'
											onClick={(e) => handleAddInventory(e)}
										>
											Add inventory
										</Button>
									</Stack>
								</Stack>
							) : (
								""
							)}
							{showInventoryAdjustment ? (
								<>
									{" "}
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
										<>
											<Stack>
												<AddInventoryAdjustment
													inventory={inventory}
													inventoryAdjustment={inventoryAdjustment}
													setInventoryAdjustment={setInventoryAdjustment}
												/>
											</Stack>
											<Stack>
												<Button
													variant='primary'
													onClick={(e) => {
														e.preventDefault();
														setShowInventoryAdjustment(false);
													}}
												>
													Save
												</Button>
											</Stack>
										</>
									) : (
										""
									)}{" "}
								</>
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
