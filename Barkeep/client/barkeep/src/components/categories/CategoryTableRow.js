import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const CategoryTableRow = ({ category }) => {
	const navigate = useNavigate();
	return (
		<tr>
			<td>{category.id}</td>
			<td>{category.name}</td>
			<td>{category.description}</td>
			<td>
				<Stack gap={1}>
					<Button
						variant='outline-secondary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/category/${category.id}`);
						}}
					>
						View
					</Button>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/category/${category.id}/edit`);
						}}
					>
						Edit
					</Button>
					<Button
						variant='danger'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/category/${category.id}/delete`);
						}}
					>
						Delete
					</Button>
				</Stack>
			</td>
		</tr>
	);
};
