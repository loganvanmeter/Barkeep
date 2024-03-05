import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ImporterTableRow = ({ importer }) => {
	const navigate = useNavigate();
	return (
		<tr>
			<td>{importer.id}</td>
			<td>{importer.name}</td>
			<td>{importer.website}</td>
			<td>{importer.description}</td>
			<td>
				<Stack gap={1}>
					<Button
						variant='outline-secondary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/importer/${importer.id}`);
						}}
					>
						View
					</Button>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/importer/${importer.id}/edit`);
						}}
					>
						Edit
					</Button>
					<Button
						variant='danger'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/importer/${importer.id}/delete`);
						}}
					>
						Delete
					</Button>
				</Stack>
			</td>
		</tr>
	);
};
