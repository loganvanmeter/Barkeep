import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	getComponentTypeById,
	updateComponentType,
} from "../../managers/ComponentTypeManager";
import { Button, Container, Form, Stack } from "react-bootstrap";

export const EditComponentType = () => {
	const { componentTypeId } = useParams();
	const [componentType, setComponentType] = useState({});
	const navigate = useNavigate();
	const getComponentType = () => {
		return getComponentTypeById(componentTypeId).then((res) =>
			setComponentType(res)
		);
	};
	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...componentType };
		copy[e.target.id] = e.target.value;
		setComponentType(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...componentType };
		return updateComponentType(copy).then((res) => navigate(`/componentType/`));
	};
	useEffect(() => {
		getComponentType();
	}, [componentTypeId]);

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Editing Component Type #{componentType.id}</h3>
				<Stack gap={3}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							id='name'
							value={componentType.name}
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
