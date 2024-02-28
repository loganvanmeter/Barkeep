import { useNavigate } from "react-router-dom";
import { addCategory } from "../../managers/CategoryManager";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { useState } from "react";

export const AddCategory = () => {
	const [category, setCategory] = useState({
		name: null,
		description: null,
		providerBarId: null,
		isAdminApproved: false,
	});
	const navigate = useNavigate();
	const siteAdmin = JSON.parse(localStorage.getItem("siteAdmin"));

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...category };
		copy[e.target.id] = e.target.value;
		setCategory(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...category };
		copy.isAdminApproved = siteAdmin ? true : false;
		return addCategory(copy)
			.then((res) => res.json())
			.then((newCategory) => navigate(`/category/${newCategory.id}`));
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Add a new category below</h3>
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
								navigate(`/category`);
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
