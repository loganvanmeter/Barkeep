import { useParams } from "react-router-dom";
import { deleteMenuCategory } from "../../managers/MenuCategoryManager";
import { Alert, Button, Stack } from "react-bootstrap";

export const DeleteMenuCategory = ({
	getMenu,
	category,
	handleCloseDeleteCategory,
}) => {
	const { menuId } = useParams();
	const handleDelete = (e) => {
		e.preventDefault();
		return deleteMenuCategory(category.id)
			.then(() => getMenu(menuId))
			.then(() => handleCloseDeleteCategory());
	};

	return (
		<Stack gap={3}>
			<Alert variant='danger'>
				<Alert.Heading>
					WARNING: You are about to delete {category.name} from your menu
				</Alert.Heading>
				<p>
					Deleting this category will remove it from all menu items that are
					have been linked to this category. Those items will all be top-level
					menu items until they are linked to another menu category.
				</p>
			</Alert>
			<Button variant='danger' onClick={handleDelete}>
				Confirm delete
			</Button>
		</Stack>
	);
};
