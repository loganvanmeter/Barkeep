import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const MenuItemTableRow = ({
	item,
	getItem,
	handleShowEditMenuItem,
	handleShowDeleteMenuItem,
}) => {
	return (
		<tr>
			<td>{item.name}</td>
			<td>{item.menuCategoryId ? item?.menuCategory?.name : ""}</td>
			<td>${item.price.toFixed(2)}</td>
			<td className='text-center'>{item.enabled ? <p>✔</p> : ""}</td>
			<td>
				<Stack gap={2}>
					<Button
						variant='outline-secondary'
						onClick={(e) => {
							e.preventDefault();
							if (item && item.id) {
								getItem(item.id).then(() => handleShowEditMenuItem());
							}
						}}
					>
						Edit
					</Button>
					<Button
						variant='danger'
						onClick={(e) => {
							e.preventDefault();
							if (item && item.id) {
								getItem(item.id).then(() => handleShowDeleteMenuItem());
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
