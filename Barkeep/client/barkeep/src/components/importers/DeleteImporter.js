import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	deleteImporter,
	getImporterById,
} from "../../managers/ImporterManager";
import { Alert, Button, Card, Container, Stack } from "react-bootstrap";

export const DeleteImporter = () => {
	const { importerId } = useParams();
	const [importer, setImporter] = useState({});
	const navigate = useNavigate();
	const getImporter = () => {
		return getImporterById(importerId).then((res) => setImporter(res));
	};

	const handleDelete = (e) => {
		e.preventDefault();
		return deleteImporter(importer.id).then(() => navigate("/importer"));
	};
	useEffect(() => {
		getImporter();
	}, [importerId]);

	return (
		<Container>
			<Stack gap={3}>
				<Alert variant='danger'>
					<Alert.Heading>
						WARNING: You are about to delete the following importer
					</Alert.Heading>
					<p>
						Deleting this importer will remove it from all current components
						marked with this importer. It is best practice to EDIT the importer
						instead to preserve the integrity of the software and it's systems.
					</p>
					<hr />
					<Stack direction='horizontal' className='justify-content-end'>
						<Button
							variant='secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/importer/${importerId}/edit`);
							}}
						>
							Edit importer instead
						</Button>
					</Stack>
				</Alert>
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
										navigate(`/importer/${importer.id}`);
									}}
								>
									Cancel
								</Button>
								<Button variant='danger' onClick={handleDelete}>
									Confirm Delete
								</Button>
							</Stack>
						</Stack>
					</Card.Footer>
				</Card>
			</Stack>
		</Container>
	);
};
