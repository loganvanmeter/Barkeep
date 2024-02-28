import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VarietalTypeDropDown } from "../forms/VarietalTypeDropDown";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { addVarietal } from "../../managers/VarietalManager";

export const AddVarietal = () => {
	const [varietalTypeId, setVarietalTypeId] = useState(0);
	const [varietal, setVarietal] = useState({
		name: null,
		description: null,
		varietalTypeId: null,
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...varietal };
		copy[e.target.id] = e.target.value;
		setVarietal(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...varietal };
		return addVarietal(copy)
			.then((res) => res.json())
			.then((newvarietal) => navigate(`/varietal/${newvarietal.id}`));
	};

	useEffect(() => {
		const copy = { ...varietal };
		copy.varietalTypeId = varietalTypeId;
		setVarietal(copy);
	}, [varietalTypeId]);

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Add a new varietal below</h3>
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
					<VarietalTypeDropDown
						varietalTypeId={varietalTypeId}
						setVarietalTypeId={setVarietalTypeId}
					/>
					<Stack direction='horizontal' className='justify-content-end' gap={3}>
						<Button
							variant='outline-secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/varietal/`);
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
