import { Alert, Button, Card, Container, Stack } from "react-bootstrap";
import {
	deleteVarietal,
	getVarietalById,
} from "../../managers/VarietalManager";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const DeleteVarietal = () => {
	const { varietalId } = useParams();
	const [varietal, setVarietal] = useState({});
	const navigate = useNavigate();
	const getVarietal = () => {
		return getVarietalById(varietalId).then((res) => setVarietal(res));
	};
	const handleDelete = (e) => {
		e.preventDefault();
		return deleteVarietal(varietal.id).then(() => navigate("/varietal"));
	};

	useEffect(() => {
		getVarietal();
	}, [varietalId]);
	return (
		<Container>
			<Stack gap={3}>
				<Alert variant='danger'>
					<Alert.Heading>
						WARNING: You are about to delete the following varietal type
					</Alert.Heading>
					<p>
						Deleting this varietal will remove it from all current components
						marked with this varietal. It is best practice to EDIT the varietal
						instead to preserve the integrity of the software and it's systems.
					</p>
					<hr />
					<Stack direction='horizontal' className='justify-content-end'>
						<Button
							variant='secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/varietal/${varietalId}/edit`);
							}}
						>
							Edit varietal instead
						</Button>
					</Stack>
				</Alert>
				<Card>
					<Card.Header>
						<Stack direction='horizontal' className='justify-content-between'>
							<div>{`Varietal #${varietal.id}`}</div>
							<div>{`Varietal Type: ${varietal?.varietalType?.name}`}</div>
						</Stack>
					</Card.Header>
					<Card.Body>
						<Card.Title>{varietal.name}</Card.Title>
						<Card.Text>
							{varietal.description
								? varietal.description
								: "No description for this varietal has been added."}
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<Stack direction='horizontal' className='justify-content-between'>
							<Card.Link href='/varietal'>Back to list</Card.Link>
							<Stack
								direction='horizontal'
								className='justify-content-end'
								gap={3}
							>
								<Button
									variant='primary'
									onClick={(e) => {
										e.preventDefault();
										navigate(`/varietal/${varietal.id}/edit`);
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
