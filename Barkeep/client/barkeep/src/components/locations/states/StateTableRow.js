import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const StateTableRow = ({ state }) => {
	const navigate = useNavigate();
	return (
		<tr>
			<td>{state.id}</td>
			<td>{state.name}</td>
			<td>{state?.country?.name}</td>
			<td>
				<Stack gap={1} className='justify-content-end'>
					<Button
						variant='outline-secondary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/state/${state.id}`);
						}}
					>
						View
					</Button>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/state/${state.id}/edit`);
						}}
					>
						Edit
					</Button>
					<Button
						variant='danger'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/state/${state.id}/delete`);
						}}
					>
						Delete
					</Button>
				</Stack>
			</td>
		</tr>
	);
};
