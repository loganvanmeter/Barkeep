import { useNavigate } from "react-router-dom";
import { addProducer } from "../../managers/ProducerManager";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { useState } from "react";

export const AddProducer = ({
	setShow,
	setProducers,
	setProducerId,
	getAllProducers,
}) => {
	const [producer, setProducer] = useState({
		name: null,
		website: null,
		description: null,
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...producer };
		copy[e.target.id] = e.target.value;
		setProducer(copy);
	};

	const handleCancel = (e) => {
		e.preventDefault();
		if (window.location.pathname !== `/producer/add`) {
			setShow(false);
		} else {
			navigate(`/producer`);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...producer };
		return addProducer(copy)
			.then((res) => res.json())
			.then((newProducer) => {
				if (window.location.pathname !== `/producer/add`) {
					return getAllProducers()
						.then((producers) => setProducers(producers))
						.then(() => setProducerId(parseInt(newProducer.id)))
						.then(() => setShow(false));
				} else {
					navigate(`/producer/${newProducer.id}`);
				}
			});
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Add a new producer below</h3>
				<Stack gap={3}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							id='name'
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Website</Form.Label>
						<Form.Control
							type='text'
							id='website'
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							as='textarea'
							id='description'
							rows={10}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Stack direction='horizontal' className='justify-content-end' gap={3}>
						<Button
							variant='outline-secondary'
							onClick={(e) => handleCancel(e)}
						>
							Cancel
						</Button>
						<Button variant='primary' type='sumbit'>
							Save
						</Button>
					</Stack>
				</Stack>
			</Form>
		</Container>
	);
};
