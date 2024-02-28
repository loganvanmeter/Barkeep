import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const VarietalTypeRow = ({ varietalType }) => {
	const navigate = useNavigate();
	return (
		<tr>
			<td>{varietalType.id}</td>
			<td>{varietalType.name}</td>
			<td>{varietalType.description ? varietalType.description : ""}</td>
			<td>
				<Stack gap={1}>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/varietalType/${varietalType.id}/edit`);
						}}
					>
						Edit
					</Button>
					<Button
						variant='danger'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/varietalType/${varietalType.id}/delete`);
						}}
					>
						Delete
					</Button>
				</Stack>
			</td>
		</tr>
	);
};
