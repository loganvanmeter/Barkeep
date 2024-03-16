import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const MenuCategoryTableRow = ({ category }) => {
	return (
		<tr>
			<td>{category.name}</td>
			<td>{category.menuCategoryId ? category?.ParentCategory?.name : ""}</td>
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
					<Button variant='outline-secondary'>Edit</Button>
					<Button variant='danger'>Delete</Button>
				</Stack>
			</td>
		</tr>
	);
};
