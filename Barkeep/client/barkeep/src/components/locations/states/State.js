import { Button, Card, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const State = ({ state }) => {
	const navigate = useNavigate();
	return (
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
					<Stack direction='horizontal' className='justify-content-end' gap={3}>
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
				</Stack>
			</Card.Footer>
		</Card>
	);
};
