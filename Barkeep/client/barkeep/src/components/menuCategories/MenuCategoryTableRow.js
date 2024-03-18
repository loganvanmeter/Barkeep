import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const MenuCategoryTableRow = ({
	category,
	getCategory,
	handleShowEditCategory,
	handleShowDeleteCategory,
}) => {
	return (
		<tr>
			<td>{category.name}</td>
			<td>{category.menuCategoryId ? category?.parentCategory?.name : ""}</td>
			<td
				style={{
					backgroundColor: `${category.displayColor}`,
					width: "6em",
					backgroundClip: "content-box",
				}}
			></td>
			<td className='text-center'>{category.enabled ? <p>✔</p> : ""}</td>
			<td>
				<Stack gap={2}>
					<Button
						variant='outline-secondary'
						onClick={(e) => {
							e.preventDefault();
							if (category && category.id) {
								getCategory(category.id).then(() => handleShowEditCategory());
							}
						}}
					>
						Edit
					</Button>
					<Button
						variant='danger'
						onClick={(e) => {
							e.preventDefault();
							if (category && category.id) {
								getCategory(category.id).then(() => handleShowDeleteCategory());
							}
						}}
					>
						Delete
					</Button>
				</Stack>
			</td>
		</tr>
	);
};
