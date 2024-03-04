import { Alert, Button, Card, Container, Stack } from "react-bootstrap";
import { deleteState, getStateById } from "../../../managers/LocationsManager";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const DeleteState = () => {
	const { stateId } = useParams();
	const [state, setState] = useState({});
	const navigate = useNavigate();
	const getState = () => {
		return getStateById(stateId).then((res) => setState(res));
	};
	const handleDelete = (e) => {
		e.preventDefault();
		return deleteState(state.id).then(() => navigate("/state"));
	};

	useEffect(() => {
		getState();
	}, [stateId]);
	return (
		<Container>
			<Stack gap={3}>
				<Alert variant='danger'>
					<Alert.Heading>
						WARNING: You are about to delete the following state
					</Alert.Heading>
					<p>
						Deleting this state will remove it from all current components
						marked with this state and delete all subregions under this state.
						It is best practice to EDIT the state instead to preserve the
						integrity of the software and it's systems.
					</p>
					<hr />
					<Stack direction='horizontal' className='justify-content-end'>
						<Button
							variant='secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/state/${stateId}/edit`);
							}}
						>
							Edit state instead
						</Button>
					</Stack>
				</Alert>
				<Card>
					<Card.Header>
						<Stack direction='horizontal' className='justify-content-between'>
							<div>{`State #${state.id}`}</div>
							<div>{`State Type: ${state?.country?.name}`}</div>
						</Stack>
					</Card.Header>
					<Card.Body>
						<Card.Title>{state.name}</Card.Title>
					</Card.Body>
					<Card.Footer>
						<Stack direction='horizontal' className='justify-content-between'>
							<Card.Link href='/state'>Back to list</Card.Link>
							<Stack
								direction='horizontal'
								className='justify-content-end'
								gap={3}
							>
								<Button
									variant='primary'
									onClick={(e) => {
										e.preventDefault();
										navigate(`/state/${state.id}/edit`);
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
