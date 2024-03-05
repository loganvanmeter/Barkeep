import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ComponentTypeRow = ({ componentType }) => {
	const navigate = useNavigate();
	return (
		<tr>
			<td>{componentType.id}</td>
			<td>{componentType.name}</td>
			<td>
				<Stack direction='horizontal' gap={1} className='justify-content-end'>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/componentType/${componentType.id}/edit`);
						}}
					>
						Edit
					</Button>
					<Button
						variant='danger'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/componentType/${componentType.id}/delete`);
						}}
					>
						Delete
					</Button>
				</Stack>
			</td>
		</tr>
	);
};
