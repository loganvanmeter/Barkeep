import { Link, useNavigate, useParams } from "react-router-dom";
import {
	getProducerById,
	updateProducer,
} from "../../managers/ProducerManager";
import { useEffect, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";

export const EditProducer = () => {
	const { producerId } = useParams();
	const [producer, setProducer] = useState({});
	const navigate = useNavigate();
	const getProducer = () => {
		return getProducerById(producerId).then((res) => setProducer(res));
	};
	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...producer };
		copy[e.target.id] = e.target.value;
		setProducer(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...producer };
		return updateProducer(copy).then((res) =>
			navigate(`/producer/${producerId}`)
		);
	};
	useEffect(() => {
		getProducer();
	}, [producerId]);

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Editing Producer #{producer.id}</h3>
				<Stack gap={3}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							id='name'
							value={producer.name}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Website</Form.Label>
						<Form.Control
							type='text'
							id='website'
							value={producer.website}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							as='textarea'
							id='description'
							rows={10}
							value={producer.description}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Stack direction='horizontal' className='justify-content-between'>
						<Link to='/producer'>Back to list</Link>
						<Stack direction='horizontal' gap={3}>
							<Button
								variant='outline-secondary'
								onClick={(e) => {
									e.preventDefault();
									navigate(`/producer/${producer.id}`);
								}}
							>
								Cancel
							</Button>
							<Button variant='primary' type='sumbit'>
								Save
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Form>
		</Container>
	);
};
