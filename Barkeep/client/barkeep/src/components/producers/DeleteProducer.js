import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	deleteProducer,
	getProducerById,
} from "../../managers/ProducerManager";
import { Alert, Button, Card, Container, Stack } from "react-bootstrap";

export const DeleteProducer = () => {
	const { producerId } = useParams();
	const [producer, setProducer] = useState({});
	const navigate = useNavigate();
	const getProducer = () => {
		return getProducerById(producerId).then((res) => setProducer(res));
	};

	const handleDelete = (e) => {
		e.preventDefault();
		return deleteProducer(producer.id).then(() => navigate("/producer"));
	};
	useEffect(() => {
		getProducer();
	}, [producerId]);

	return (
		<Container>
			<Stack gap={3}>
				<Alert variant='danger'>
					<Alert.Heading>
						WARNING: You are about to delete the following producer
					</Alert.Heading>
					<p>
						Deleting this producer will remove it from all current components
						marked with this producer. It is best practice to EDIT the producer
						instead to preserve the integrity of the software and it's systems.
					</p>
					<hr />
					<Stack direction='horizontal' className='justify-content-end'>
						<Button
							variant='secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/producer/${producerId}/edit`);
							}}
						>
							Edit producer instead
						</Button>
					</Stack>
				</Alert>
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
										navigate(`/producer/${producer.id}`);
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
