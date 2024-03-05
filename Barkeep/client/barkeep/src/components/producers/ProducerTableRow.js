import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ProducerTableRow = ({ producer }) => {
	const navigate = useNavigate();
	return (
		<tr>
			<td>{producer.id}</td>
			<td>{producer.name}</td>
			<td>{producer.website}</td>
			<td>{producer.description}</td>
			<td>
				<Stack gap={1}>
					<Button
						variant='outline-secondary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/producer/${producer.id}`);
						}}
					>
						View
					</Button>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/producer/${producer.id}/edit`);
						}}
					>
						Edit
					</Button>
					<Button
						variant='danger'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/producer/${producer.id}/delete`);
						}}
					>
						Delete
					</Button>
				</Stack>
			</td>
		</tr>
	);
};
