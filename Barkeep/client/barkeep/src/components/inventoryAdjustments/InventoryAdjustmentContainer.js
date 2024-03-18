import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInventoryById } from "../../managers/InventoryManager";
import { BarAdminSideBar } from "../../nav/BarSideBar";
import { Button, Container, Modal, Stack } from "react-bootstrap";
import { Inventory } from "../inventory/Inventory";
import { InventoryAdjustmentList } from "./InventoryAdjustmentList";
import { InventoryAdjustmentTypeDropDown } from "../forms/InventoryAdjustmentTypeDropDown";
import { AddInventoryAdjustment } from "./AddInventoryAdjustment";
import { EditInventoryAdjustment } from "./EditInventoryAdjustment";
import { EditInventory } from "../inventory/EditInventory";
import { AddInventoryLink } from "../InventoryLinks/AddInventoryLink";
import { LinkList } from "../InventoryLinks/LinkList";
import { getUnitById } from "../../managers/UnitManager";

export const InventoryAdjustmentContainer = () => {
	const { barId } = useParams();
	const barUser = JSON.parse(localStorage.getItem("barUser"));
	const bar = JSON.parse(localStorage.getItem("bar"));
	const { inventoryId } = useParams();
	const [inventory, setInventory] = useState({});
	const [adjustments, setAdjustments] = useState([]);
	const [inLinks, setInLinks] = useState([]);
	const [outLinks, setOutLinks] = useState([]);
	const [newAdjustment, setNewAdjustment] = useState({
		inventoryId: parseInt(inventoryId),
		distributorId: null,
		inventoryAdjustmentTypeId: 0,
		quantity: 0,
		itemsPerUnit: 0,
		cost: 0,
		unitId: 0,
		unitSize: 0,
		unitTypeId: 0,
		includeInInventoryCostPerOunce: false,
		createDateTime: null,
		expirationDate: null,
		barUserId: barUser.id,
	});
	const [adjustCost, setAdjustCost] = useState(false);
	const [averageAdjusmentCostPer, setAverageAdjustmentCostPer] = useState(0);

	const [thisAdjustment, setThisAdjustment] = useState({});
	const [adjustmentUnitId, setAdjustmentUnitId] = useState();
	const [adjustmentUnitTypeId, setAdjustmentUnitTypeId] = useState();
	const [editedAdjustmentTypeId, setEditedAdjustmentTypeId] = useState();

	useEffect(() => {
		if (thisAdjustment.id) {
			setAdjustmentUnitId(thisAdjustment.unitId);
			setAdjustmentUnitTypeId(thisAdjustment.unitTypeId);
			setEditedAdjustmentTypeId(thisAdjustment.inventoryAdjustmentTypeId);
		}
	}, [thisAdjustment]);

	useEffect(() => {
		const copy = { ...thisAdjustment };
		if (adjustmentUnitId) {
			copy.unitId = adjustmentUnitId;
		}
		if (adjustmentUnitTypeId) {
			copy.unitTypeId = adjustmentUnitTypeId;
		}
		if (editedAdjustmentTypeId) {
			copy.inventoryAdjustmentTypeId = editedAdjustmentTypeId;
		}
		setThisAdjustment(copy);
	}, [adjustmentUnitId, adjustmentUnitTypeId, editedAdjustmentTypeId]);
	const [filteredAdjustments, setFilteredAjustments] = useState([]);
	const [inventoryAdjustmentTypeId, setInventoryAdjustmentTypeId] = useState();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [showInventoryLink, setShowInventoryLink] = useState(false);

	const handleCloseInventoryLink = () => setShowInventoryLink(false);
	const handleShowInventoryLink = () => setShowInventoryLink(true);
	const [showEdit, setShowEdit] = useState(false);
	const handleCloseEdit = () => setShowEdit(false);
	const handleShowEdit = () => setShowEdit(true);
	const [showEditInventory, setShowEditInventory] = useState(false);
	const handleCloseEditInventory = () => setShowEditInventory(false);
	const handleShowEditInventory = () => setShowEditInventory(true);
	const getInventory = (id) => {
		return getInventoryById(id).then((inventory) => {
			setInventory(inventory);
			setAdjustments(inventory.inventoryAdjustments);
			setInLinks(inventory.inInventoryLinks);
			setOutLinks(inventory.outInventoryLinks);
		});
	};

	const filterInventoryAdjustments = () => {
		if (inventoryAdjustmentTypeId > 0) {
			return adjustments.filter(
				(adjustment) =>
					adjustment.inventoryAdjustmentTypeId == inventoryAdjustmentTypeId
			);
		} else {
			return adjustments;
		}
	};

	useEffect(() => {
		getInventory(inventoryId);
	}, [inventoryId]);

	useEffect(() => {
		setFilteredAjustments(adjustments);
	}, [adjustments]);

	useEffect(() => {
		setFilteredAjustments(filterInventoryAdjustments());
	}, [inventoryAdjustmentTypeId]);

	useEffect(() => {
		let subTotal = 0;
		let count = 0;
		if (adjustments) {
			adjustments.forEach((adjustment) => {
				if (
					adjustment.includeInInventoryCostPerOunce &&
					adjustment.unit.name !== "unit"
				) {
					const adjustmentCostPer =
						adjustment.cost /
						(adjustment.itemsPerUnit *
							adjustment?.unit?.size *
							adjustment.unitSize *
							adjustment?.unit?.imperialConversion);
					subTotal += adjustmentCostPer;
					count++;
				}
				if (
					adjustment.includeInInventoryCostPerOunce &&
					adjustment.unit.name === "unit"
				) {
					const adjustmentCostPer =
						adjustment.cost /
						(adjustment.itemsPerUnit *
							inventory?.unit?.size *
							inventory?.unit?.imperialConversion *
							inventory.unitSize);
					subTotal += adjustmentCostPer;
					count++;
				}
			});
			if (count) {
				setAverageAdjustmentCostPer(
					Math.round(Number(subTotal / count) * 100) / 100
				);
			} else {
				setAverageAdjustmentCostPer(
					inventory.costPerOunce
						? inventory.costPerOunce
						: inventory.costPerUnit
				);
			}
		}
	}, [adjustments, inventory]);

	useEffect(() => {
		if (
			inventory.costPerOunce &&
			averageAdjusmentCostPer != inventory.costPerOunce
		) {
			setAdjustCost(true);
		}
		if (
			inventory.costPerUnit &&
			averageAdjusmentCostPer != inventory.costPerUnit
		) {
			setAdjustCost(true);
		}
		if (
			inventory.costPerOunce &&
			averageAdjusmentCostPer == inventory.costPerOunce
		) {
			setAdjustCost(false);
		}
		if (
			inventory.costPerUnit &&
			averageAdjusmentCostPer == inventory.costPerUnit
		) {
			setAdjustCost(false);
		}
		if (
			!inventory.costPerOunce &&
			!inventory.costPerUnit &&
			averageAdjusmentCostPer
		) {
			setAdjustCost(true);
		}
	}, [averageAdjusmentCostPer, inventory]);

	return (
		<Stack gap={3}>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Adjustment</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddInventoryAdjustment
						inventoryAdjustment={newAdjustment}
						setInventoryAdjustment={setNewAdjustment}
						inventory={inventory}
						setInventory={setInventory}
						setAdjustments={setAdjustments}
						handleClose={handleClose}
					/>
				</Modal.Body>
			</Modal>
			<Modal
				show={showInventoryLink}
				onHide={handleCloseInventoryLink}
				size='lg'
			>
				<Modal.Header closeButton>
					<Modal.Title>Add Inventory Link</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddInventoryLink
						handleCloseInventoryLink={handleCloseInventoryLink}
						getInventory={getInventory}
					/>
				</Modal.Body>
			</Modal>
			<Modal show={showEdit} onHide={handleCloseEdit}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Adjustment</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EditInventoryAdjustment
						thisAdjustment={thisAdjustment}
						setThisAdjustment={setThisAdjustment}
						inventoryAdjustmentTypeId={editedAdjustmentTypeId}
						setInventoryAdjustmentTypeId={setEditedAdjustmentTypeId}
						adjustmentUnitId={adjustmentUnitId}
						setAdjustmentUnitId={setAdjustmentUnitId}
						adjustmentUnitTypeId={adjustmentUnitTypeId}
						setAdjustmentUnitTypeId={setAdjustmentUnitTypeId}
						setInventory={setInventory}
						setAdjustments={setAdjustments}
						handleClose={handleCloseEdit}
					/>
				</Modal.Body>
			</Modal>
			<Modal show={showEditInventory} onHide={handleCloseEditInventory}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Inventory</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EditInventory
						handleClose={handleCloseEditInventory}
						setInventory={setInventory}
					/>
				</Modal.Body>
			</Modal>
			<BarAdminSideBar bar={bar} />
			<Container>
				<Stack gap={5}>
					<Stack direction='horizontal' gap={5} className='flex-wrap'>
						<Stack>
							{inventory ? (
								<Inventory
									inventory={inventory}
									bar={bar}
									handleShow={handleShow}
									handleShowEditInventory={handleShowEditInventory}
									adjustCost={adjustCost}
									setAdjustCost={setAdjustCost}
									averageAdjusmentCostPer={averageAdjusmentCostPer}
									getInventory={getInventory}
								/>
							) : (
								""
							)}
						</Stack>
						<Stack gap={3}>
							<Stack
								direction='horizontal'
								className='justify-content-between flex-wrap'
							>
								<h4 className='text-center'>Inventory Links</h4>
								<Button
									onClick={(e) => {
										e.preventDefault();
										handleShowInventoryLink();
									}}
								>
									Add inventory link
								</Button>
							</Stack>
							{!inLinks.length && !outLinks.length ? (
								<Stack className='justify-content-center align-items-center'>
									<div>
										No current links exist for this inventory. Add an inventory
										link better track inventory.
									</div>
								</Stack>
							) : inLinks.length && !outLinks.length ? (
								<Stack gap={2}>
									<h6>MAKES</h6>
									<Stack>
										<LinkList links={inLinks} getInventory={getInventory} />
									</Stack>
								</Stack>
							) : !inLinks.length && outLinks.length ? (
								<Stack gap={2}>
									<h6>TAKES</h6>
									<Stack>
										<LinkList links={outLinks} getInventory={getInventory} />
									</Stack>
								</Stack>
							) : inLinks.length && outLinks.length ? (
								<>
									<Stack gap={2}>
										<h6>MAKES</h6>
										<Stack>
											<LinkList links={inLinks} />
										</Stack>
									</Stack>
									<Stack gap={2}>
										<h6>TAKES</h6>
										<Stack>
											<LinkList links={outLinks} />
										</Stack>
									</Stack>
								</>
							) : (
								""
							)}
						</Stack>
					</Stack>
					<Stack gap={3}>
						<h4 className='text-center'>Inventory Adjustments</h4>
						{filteredAdjustments.length ? (
							<>
								<InventoryAdjustmentTypeDropDown
									inventoryAdjustmentTypeId={inventoryAdjustmentTypeId}
									setInventoryAdjustmentTypeId={setInventoryAdjustmentTypeId}
								/>
								<InventoryAdjustmentList
									filteredAdjustments={filteredAdjustments}
									setThisAdjustment={setThisAdjustment}
									handleShowEdit={handleShowEdit}
								/>
							</>
						) : (
							<Stack className='justify-content-center align-items-center'>
								<div>
									No adjustments exist for this inventory. Add an ajustment to
									update generate your Cost Per Ounce/Cost per Unit
								</div>
							</Stack>
						)}
					</Stack>
				</Stack>
			</Container>
		</Stack>
	);
};
