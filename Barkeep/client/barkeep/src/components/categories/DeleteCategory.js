import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	deleteCategory,
	getCategoryById,
} from "../../managers/CategoryManager";
import { Alert, Button, Card, Container, Stack } from "react-bootstrap";

export const DeleteCategory = () => {
	const { categoryId } = useParams();
	const [category, setCategory] = useState({});
	const navigate = useNavigate();
	const getCategory = () => {
		return getCategoryById(categoryId).then((res) => setCategory(res));
	};

	const handleDelete = (e) => {
		e.preventDefault();
		return deleteCategory(category.id).then(() => navigate("/category"));
	};
	useEffect(() => {
		getCategory();
	}, [categoryId]);

	return (
		<Container>
			<Stack gap={3}>
				<Alert variant='danger'>
					<Alert.Heading>
						WARNING: You are about to delete the following category
					</Alert.Heading>
					<p>
						Deleting this category will remove it from all current components
						marked with this category and delete all menu categories that have
						been created using this category. It is best practice to EDIT the
						category instead to preserve the integrity of the software and it's
						systems.
					</p>
					<hr />
					<Stack direction='horizontal' className='justify-content-end'>
						<Button
							variant='secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/category/${categoryId}/edit`);
							}}
						>
							Edit category instead
						</Button>
					</Stack>
				</Alert>
				<Card>
					<Card.Header>Category #{category.id}</Card.Header>
					<Card.Body>
						<Card.Title>{category.name}</Card.Title>
						<Card.Text>
							{category.description
								? category.description
								: "No description for this category has been added."}
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<Stack direction='horizontal' className='justify-content-between'>
							<Card.Link href='/category'>Back to list</Card.Link>
							<Stack gap={3} direction='horizontal'>
								<Button
									variant='primary'
									onClick={(e) => {
										e.preventDefault();
										navigate(`/category/${category.id}`);
									}}
								>
									Cancel
								</Button>
								<Button variant='danger' onClick={handleDelete}>
									Confirm Delete
								</Button>
							</Stack>
						</Stack>
					</Card.Footer>
				</Card>
			</Stack>
		</Container>
	);
};
