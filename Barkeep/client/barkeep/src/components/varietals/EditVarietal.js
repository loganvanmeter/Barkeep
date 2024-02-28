import { Link, useNavigate, useParams } from "react-router-dom";
import {
	getVarietalById,
	updateVarietal,
} from "../../managers/VarietalManager";
import { useEffect, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { VarietalTypeDropDown } from "../forms/VarietalTypeDropDown";

export const EditVarietal = () => {
	const { varietalId } = useParams();
	const [varietalTypeId, setVarietalTypeId] = useState(0);
	const [varietal, setVarietal] = useState({});

	const navigate = useNavigate();

	const getVarietal = () => {
		return getVarietalById(varietalId).then((res) => setVarietal(res));
	};

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...varietal };
		copy[e.target.id] = e.target.value;
		setVarietal(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...varietal };
		return updateVarietal(copy).then(() =>
			navigate(`/varietal/${varietal.id}`)
		);
	};

	useEffect(() => {
		getVarietal();
	}, [varietalId]);

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
							value={varietal.name}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							as='textarea'
							id='description'
							rows={10}
							value={varietal.description ? varietal.description : ""}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<VarietalTypeDropDown
						varietalTypeId={varietal.varietalTypeId}
						setVarietalTypeId={setVarietalTypeId}
					/>
					<Stack direction='horizontal' className='justify-content-between'>
						<Link to='/varietal'>Back to list</Link>
						<Stack direction='horizontal' gap={3}>
							<Button
								variant='outline-secondary'
								onClick={(e) => {
									e.preventDefault();
									navigate(`/varietal/${varietal.id}`);
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
