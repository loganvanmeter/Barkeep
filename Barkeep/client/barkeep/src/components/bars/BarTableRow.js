import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const BarTableRow = ({ bar }) => {
	const navigate = useNavigate();
	return (
		<tr>
			<td>{bar.name}</td>
			<td>
				<Button
					variant='success'
					onClick={(e) => {
						e.preventDefault();
						navigate(`/bar/${bar.id}/dashboard`);
					}}
				>
					Dashboard
				</Button>
			</td>
			<td>
				<Button
					variant='success'
					onClick={(e) => {
						e.preventDefault();
						navigate(`/bar/${bar.id}/pos`);
					}}
				>
					Launch POS
				</Button>
			</td>
			<td>
				<Stack gap={1} className='justify-content-end'>
					<Button
						variant='outline-secondary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/bar/${bar.id}`);
						}}
					>
						View
					</Button>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/bar/${bar.id}/edit`);
						}}
					>
						Edit
					</Button>
					<Button
						variant='danger'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/bar/${bar.id}/delete`);
						}}
					>
						Delete
					</Button>
				</Stack>
			</td>
		</tr>
	);
};
