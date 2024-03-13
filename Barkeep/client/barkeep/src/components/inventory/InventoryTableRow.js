import { Button, Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getQuantity } from "../../managers/InventoryManager";

export const InventoryTableRow = ({ inventory }) => {
	const { barId } = useParams();
	const navigate = useNavigate();
	inventory.totalQuantity = getQuantity(inventory);
	return (
		<tr>
			<td>{inventory.id}</td>
			<td>{inventory?.component?.name}</td>
			<td>{inventory?.component?.componentType?.name}</td>
			<td>
				{inventory.totalQuantity > 1 && inventory?.unit?.name === "unit"
					? inventory.totalQuantity + " " + inventory?.unit?.name + "s"
					: inventory.totalQuantity + " " + inventory?.unit?.name}
			</td>
			<td>
				$
				{inventory.costPerOunce
					? inventory.costPerOunce
					: inventory.costPerUnit}
			</td>
			<td>
				<Stack gap={1} className='justify-content-end'>
					<Button
						variant='outline-secondary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/bar/${barId}/inventory/${inventory.id}/adjust`);
						}}
					>
						Adjust
					</Button>
					<Button
						variant='danger'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/bar/${barId}/inventory/${inventory.id}/delete`);
						}}
					>
						Delete
					</Button>
				</Stack>
			</td>
		</tr>
	);
};
