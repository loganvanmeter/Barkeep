import { useNavigate } from "react-router-dom";
import { addImporter } from "../../managers/ImporterManager";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { useState } from "react";

export const AddImporter = () => {
	const [importer, setImporter] = useState({
		name: null,
		website: null,
		description: null,
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...importer };
		copy[e.target.id] = e.target.value;
		setImporter(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...importer };
		return addImporter(copy)
			.then((res) => res.json())
			.then((newImporter) => navigate(`/importer/${newImporter.id}`));
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Add a new importer below</h3>
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
							onClick={(e) => {
								e.preventDefault();
								navigate(`/importer`);
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
