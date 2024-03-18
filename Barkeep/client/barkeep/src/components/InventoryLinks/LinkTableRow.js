import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { deleteInventoryLink } from "../../managers/InventoryLinkManager";

export const LinkTableRow = ({ link, getInventory }) => {
	const { inventoryId } = useParams();
	const handleDelete = (e) => {
		e.preventDefault();
		return deleteInventoryLink(link.id).then(() => getInventory(inventoryId));
	};
	return (
		<tr>
			<td>{link.inAmount}</td>
			<td>{link?.inUnit?.name}</td>
			<td>{link?.inInventory?.component?.name}</td>
			<td>per</td>
			<td>{link.outAmount}</td>
			<td>{link?.outUnit?.name}</td>
			<td>{link?.outInventory?.component?.name}</td>
			<td>
				<Button variant='danger' onClick={handleDelete}>
					Delete
				</Button>
			</td>
		</tr>
	);
};
