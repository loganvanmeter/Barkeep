import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	getVarietalTypeById,
	updateVarietalType,
} from "../../managers/VarietalTypeManager";
import { Button, Container, Form, Stack } from "react-bootstrap";

export const EditVarietalType = () => {
	const { varietalTypeId } = useParams();
	const [varietalType, setVarietalType] = useState({});
	const navigate = useNavigate();
	const getVarietalType = () => {
		return getVarietalTypeById(varietalTypeId).then((res) =>
			setVarietalType(res)
		);
	};
	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...varietalType };
		copy[e.target.id] = e.target.value;
		setVarietalType(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...category };
		return updateVarietalType(copy).then((res) =>
			navigate(`/varietalType/${varietalTypeId}`)
		);
	};
	useEffect(() => {
		getVarietalType();
	}, [varietalTypeId]);

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Editing Varietal Type #{varietalType.id}</h3>
				<Stack gap={3}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							id='name'
							value={varietalType.name}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							as='textarea'
							id='description'
							rows={10}
							value={varietalType.description ? varietalType.description : ""}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Stack direction='horizontal' className='justify-content-between'>
						<Link to='/varietalType'>Back to list</Link>
						<Stack direction='horizontal' gap={3}>
							<Button
								variant='outline-secondary'
								onClick={(e) => {
									e.preventDefault();
									navigate(`/varietalType/${varietalType.id}`);
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
