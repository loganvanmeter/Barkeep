import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	deleteComponentType,
	getComponentTypeById,
} from "../../managers/ComponentTypeManager";
import { Alert, Button, Card, Container, Stack } from "react-bootstrap";

export const DeleteComponentType = () => {
	const { componentTypeId } = useParams();
	const [componentType, setComponentType] = useState({});
	const navigate = useNavigate();
	const getComponentType = () => {
		return getComponentTypeById(componentTypeId).then((res) =>
			setComponentType(res)
		);
	};

	const handleDelete = (e) => {
		e.preventDefault();
		return deleteComponentType(componentType.id).then(() =>
			navigate("/componentType")
		);
	};
	useEffect(() => {
		getComponentType();
	}, [componentTypeId]);

	return (
		<Container>
			<Stack gap={3}>
				<Alert variant='danger'>
					<Alert.Heading>
						WARNING: You are about to delete the following component type
					</Alert.Heading>
					<p>
						Deleting this component type will remove it from all current
						components marked with this component type. It is best practice to
						EDIT the component type instead to preserve the integrity of the
						software and it's systems.
					</p>
					<hr />
					<Stack direction='horizontal' className='justify-content-end'>
						<Button
							variant='secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/componentType/${componentTypeId}/edit`);
							}}
						>
							Edit component type instead
						</Button>
					</Stack>
				</Alert>
				<Card>
					<Card.Header>Component Type #{componentType.id}</Card.Header>
					<Card.Body>
						<Card.Title>{componentType.name}</Card.Title>
						<Card.Text>
							{componentType.description
								? componentType.description
								: "No description for this componentType has been added."}
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
									navigate(`/componentType`);
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
