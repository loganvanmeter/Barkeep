import { useParams } from "react-router-dom";
import { deleteMenuItem } from "../../managers/MenuItemManager";
import { Alert, Button, Stack } from "react-bootstrap";

export const DeleteMenuItem = ({
	getMenu,
	item,
	handleCloseDeleteMenuItem,
}) => {
	const { menuId } = useParams();
	const handleDelete = (e) => {
		e.preventDefault();
		return deleteMenuItem(item.id)
			.then(() => getMenu(menuId))
			.then(() => handleCloseDeleteMenuItem());
	};

	return (
		<Stack gap={3}>
			<Alert variant='danger'>
				<Alert.Heading>
					WARNING: You are about to delete {item?.inventory?.component.name}{" "}
					from your menu
				</Alert.Heading>
				<p>
					Deleting this item will remove it from your menu and your sales
					reports have been linked to this item.
				</p>
			</Alert>
			<Button variant='danger' onClick={handleDelete}>
				Confirm delete
			</Button>
		</Stack>
	);
};
