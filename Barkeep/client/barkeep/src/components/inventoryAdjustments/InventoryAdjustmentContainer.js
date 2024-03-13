import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInventoryById } from "../../managers/InventoryManager";
import { BarAdminSideBar } from "../../nav/BarSideBar";
import { Container, Modal, Stack } from "react-bootstrap";
import { Inventory } from "../inventory/Inventory";
import { InventoryAdjustmentList } from "./InventoryAdjustmentList";
import { InventoryAdjustmentTypeDropDown } from "../forms/InventoryAdjustmentTypeDropDown";
import { AddInventoryAdjustment } from "./AddInventoryAdjustment";
import { EditInventoryAdjustment } from "./EditInventoryAdjustment";

export const InventoryAdjustmentContainer = () => {
	const { barId } = useParams();
	const barUser = JSON.parse(localStorage.getItem("barUser"));
	const bar = JSON.parse(localStorage.getItem("bar"));
	const { inventoryId } = useParams();
	const [inventory, setInventory] = useState({});
	const [adjustments, setAdjustments] = useState([]);
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
	const [showEdit, setShowEdit] = useState(false);
	const handleCloseEdit = () => setShowEdit(false);
	const handleShowEdit = () => setShowEdit(true);
	const getInventory = (id) => {
		return getInventoryById(id).then((inventory) => {
			setInventory(inventory);
			setAdjustments(inventory.inventoryAdjustments);
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
						setInventory={setInventory}
						setAdjustments={setAdjustments}
						handleClose={handleClose}
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
			<BarAdminSideBar bar={bar} />
			<Container>
				<Stack gap={3}>
					{inventory ? (
						<Inventory
							inventory={inventory}
							bar={bar}
							handleShow={handleShow}
						/>
					) : (
						""
					)}

					<InventoryAdjustmentTypeDropDown
						inventoryAdjustmentTypeId={inventoryAdjustmentTypeId}
						setInventoryAdjustmentTypeId={setInventoryAdjustmentTypeId}
					/>
					{filteredAdjustments.length ? (
						<InventoryAdjustmentList
							filteredAdjustments={filteredAdjustments}
							setThisAdjustment={setThisAdjustment}
							handleShowEdit={handleShowEdit}
						/>
					) : (
						"Loading"
					)}
				</Stack>
			</Container>
		</Stack>
	);
};
