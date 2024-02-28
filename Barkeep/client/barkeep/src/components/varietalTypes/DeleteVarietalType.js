import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	deleteVarietalType,
	getVarietalTypeById,
} from "../../managers/VarietalTypeManager";
import { Alert, Button, Card, Container, Stack } from "react-bootstrap";

export const DeleteVarietalType = () => {
	const { varietalTypeId } = useParams();
	const [varietalType, setVarietalType] = useState({});
	const navigate = useNavigate();
	const getVarietalType = () => {
		return getVarietalTypeById(varietalTypeId).then((res) =>
			setVarietalType(res)
		);
	};

	const handleDelete = (e) => {
		e.preventDefault();
		return deleteVarietalType(varietalType.id).then(() =>
			navigate("/varietalType")
		);
	};
	useEffect(() => {
		getVarietalType();
	}, [varietalTypeId]);

	return (
		<Container>
			<Stack gap={3}>
				<Alert variant='danger'>
					<Alert.Heading>
						WARNING: You are about to delete the following varietal type
					</Alert.Heading>
					<p>
						Deleting this varietal type will remove it from all current
						components marked with this varietal type. It is best practice to
						EDIT the varietal type instead to preserve the integrity of the
						software and it's systems.
					</p>
					<hr />
					<Stack direction='horizontal' className='justify-content-end'>
						<Button
							variant='secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/varietalType/${varietalTypeId}/edit`);
							}}
						>
							Edit varietal type instead
						</Button>
					</Stack>
				</Alert>
				<Card>
					<Card.Header>Varietal Type #{varietalType.id}</Card.Header>
					<Card.Body>
						<Card.Title>{varietalType.name}</Card.Title>
						<Card.Text>
							{varietalType.description
								? varietalType.description
								: "No description for this varietalType has been added."}
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<Stack
							direction='horizontal'
							className='justify-content-end'
							gap={3}
						>
							<Button
								variant='primary'
								onClick={(e) => {
									e.preventDefault();
									navigate(`/varietalType`);
								}}
							>
								Cancel
							</Button>
							<Button variant='danger' onClick={handleDelete}>
								Confirm Delete
							</Button>
						</Stack>
					</Card.Footer>
				</Card>
			</Stack>
		</Container>
	);
};
