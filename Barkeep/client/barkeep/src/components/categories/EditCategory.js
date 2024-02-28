import { Link, useNavigate, useParams } from "react-router-dom";
import {
	getCategoryById,
	updateCategory,
} from "../../managers/CategoryManager";
import { useEffect, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";

export const EditCategory = () => {
	const { categoryId } = useParams();
	const [category, setCategory] = useState({});
	const navigate = useNavigate();
	const getCategory = () => {
		return getCategoryById(categoryId).then((res) => setCategory(res));
	};
	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...category };
		copy[e.target.id] = e.target.value;
		setCategory(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...category };
		return updateCategory(copy).then((res) =>
			navigate(`/category/${categoryId}`)
		);
	};
	useEffect(() => {
		getCategory();
	}, [categoryId]);

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Editing Category #{category.id}</h3>
				<Stack gap={3}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							id='name'
							value={category.name}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							as='textarea'
							id='description'
							rows={10}
							value={category.description}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Stack direction='horizontal' className='justify-content-between'>
						<Link to='/category'>Back to list</Link>
						<Stack direction='horizontal' gap={3}>
							<Button
								variant='outline-secondary'
								onClick={(e) => {
									e.preventDefault();
									navigate(`/category/${category.id}`);
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
