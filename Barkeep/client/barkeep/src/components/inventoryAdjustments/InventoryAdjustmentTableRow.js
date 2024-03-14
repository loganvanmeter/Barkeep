import { Button, Modal, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getInventoryAdjustmentById } from "../../managers/InventoryAdjustmentManager";
import { useState } from "react";
import { EditInventoryAdjustment } from "./EditInventoryAdjustment";

export const InventoryAdjustmentTableRow = ({
	adjustment,
	setThisAdjustment,
	handleShowEdit,
}) => {
	const navigate = useNavigate();

	return (
		<tr>
			<td>
				<Stack direction='horizontal'>
					{new Date(adjustment.createDateTime).toLocaleDateString("en-US")}
				</Stack>
				<Stack direction='horizontal'>
					{new Date(
						new Date(adjustment.createDateTime).getTime() -
							new Date(adjustment.createDateTime).getTimezoneOffset() *
								1000 *
								60
					).toLocaleTimeString("en-US")}
				</Stack>
			</td>
			<td>{adjustment?.barUser?.user?.fullName}</td>
			<td>{adjustment?.inventoryAdjustmentType?.name}</td>

			<td>{adjustment.quantity}</td>
			<td>{adjustment.itemsPerUnit}</td>
			<td>{adjustment?.unit?.name}</td>
			<td>${Number(adjustment.cost).toFixed(2)}</td>
			<td>
				<Stack gap={1}>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							return getInventoryAdjustmentById(adjustment.id)
								.then((thisAdjustment) => setThisAdjustment(thisAdjustment))
								.then(() => handleShowEdit());
						}}
					>
						Edit
					</Button>
				</Stack>
			</td>
		</tr>
	);
};
