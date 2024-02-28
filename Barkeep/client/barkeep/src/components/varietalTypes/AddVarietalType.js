import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addVarietalType } from "../../managers/VarietalTypeManager";
import { Button, Container, Form, Stack } from "react-bootstrap";

export const AddVarietalType = () => {
	const [varietalType, setVarietalType] = useState({
		name: null,
		description: null,
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...varietalType };
		copy[e.target.id] = e.target.value;
		setVarietalType(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...varietalType };
		return addVarietalType(copy)
			.then((res) => res.json())
			.then((newVarietalType) => navigate(`/varietalType`));
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Add a new varietal type below</h3>
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
							onClick={(e) => {
								e.preventDefault();
								navigate(`/varietalType`);
							}}
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
