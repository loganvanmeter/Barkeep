import { Link, useNavigate, useParams } from "react-router-dom";
import {
	getImporterById,
	updateImporter,
} from "../../managers/ImporterManager";
import { useEffect, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";

export const EditImporter = () => {
	const { importerId } = useParams();
	const [importer, setImporter] = useState({});
	const navigate = useNavigate();
	const getImporter = () => {
		return getImporterById(importerId).then((res) => setImporter(res));
	};
	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...importer };
		copy[e.target.id] = e.target.value;
		setImporter(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...importer };
		return updateImporter(copy).then((res) =>
			navigate(`/importer/${importerId}`)
		);
	};
	useEffect(() => {
		getImporter();
	}, [importerId]);

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Editing Importer #{importer.id}</h3>
				<Stack gap={3}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							id='name'
							value={importer.name}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Website</Form.Label>
						<Form.Control
							type='text'
							id='website'
							value={importer.website}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							as='textarea'
							id='description'
							rows={10}
							value={importer.description}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Stack direction='horizontal' className='justify-content-between'>
						<Link to='/importer'>Back to list</Link>
						<Stack direction='horizontal' gap={3}>
							<Button
								variant='outline-secondary'
								onClick={(e) => {
									e.preventDefault();
									navigate(`/importer/${importer.id}`);
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
