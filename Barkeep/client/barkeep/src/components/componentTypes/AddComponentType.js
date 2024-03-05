import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addComponentType } from "../../managers/ComponentTypeManager";
import { Button, Container, Form, Stack } from "react-bootstrap";

export const AddComponentType = () => {
	const [componentType, setComponentType] = useState({
		name: null,
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...componentType };
		copy[e.target.id] = e.target.value;
		setComponentType(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...componentType };
		return addComponentType(copy)
			.then((res) => res.json())
			.then((newComponentType) => navigate(`/componentType`));
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Add a new component type below</h3>
				<Stack gap={3}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							id='name'
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Stack direction='horizontal' className='justify-content-end' gap={3}>
						<Button
							variant='outline-secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/componentType`);
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
