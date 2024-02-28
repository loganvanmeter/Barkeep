import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const VarietalRow = ({ varietal }) => {
	const navigate = useNavigate();
	return (
		<tr>
			<td>{varietal.id}</td>
			<td>{varietal.name}</td>
			<td>{varietal?.varietalType?.name}</td>
			<td>{varietal.description ? varietal.description : ""}</td>
			<td>
				<Stack gap={1} className='justify-content-end'>
					<Button
						variant='outline-secondary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/varietal/${varietal.id}`);
						}}
					>
						View
					</Button>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/varietal/${varietal.id}/edit`);
						}}
					>
						Edit
					</Button>
					<Button
						variant='danger'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/varietal/${varietal.id}/delete`);
						}}
					>
						Delete
					</Button>
				</Stack>
			</td>
		</tr>
	);
};
