import { Button, Card, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Producer = ({ producer }) => {
	const navigate = useNavigate();
	return (
		<Card>
			<Card.Header>Producer #{producer.id}</Card.Header>
			<Card.Body>
				<Card.Title>{producer.name}</Card.Title>
				{producer.website ? (
					<Card.Subtitle>{producer.website}</Card.Subtitle>
				) : (
					""
				)}
				<Card.Text>
					{producer.description
						? producer.description
						: "No description for this producer has been added."}
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				<Stack direction='horizontal' className='justify-content-between'>
					<Card.Link href='/producer'>Back to list</Card.Link>

					<Stack gap={3} direction='horizontal'>
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
				</Stack>
			</Card.Footer>
		</Card>
	);
};
