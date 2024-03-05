import { Button, Card, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Importer = ({ importer }) => {
	const navigate = useNavigate();
	return (
		<Card>
			<Card.Header>Importer #{importer.id}</Card.Header>
			<Card.Body>
				<Card.Title>{importer.name}</Card.Title>
				{importer.website ? (
					<Card.Subtitle>{importer.website}</Card.Subtitle>
				) : (
					""
				)}
				<Card.Text>
					{importer.description
						? importer.description
						: "No description for this importer has been added."}
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				<Stack direction='horizontal' className='justify-content-between'>
					<Card.Link href='/importer'>Back to list</Card.Link>

					<Stack gap={3} direction='horizontal'>
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
				</Stack>
			</Card.Footer>
		</Card>
	);
};
