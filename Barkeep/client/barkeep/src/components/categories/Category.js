import { Button, Card, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Category = ({ category }) => {
	const navigate = useNavigate();
	const siteAdmin = JSON.parse(localStorage.getItem("siteAdmin"));
	return (
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
					{siteAdmin ? (
						<>
							<Stack gap={3} direction='horizontal'>
								<Button
									variant='primary'
									onClick={(e) => {
										e.preventDefault();
										navigate(`/category/${category.id}/edit`);
									}}
								>
									Edit
								</Button>
								<Button
									variant='danger'
									onClick={(e) => {
										e.preventDefault();
										navigate(`/category/${category.id}/delete`);
									}}
								>
									Delete
								</Button>
							</Stack>
						</>
					) : (
						""
					)}
				</Stack>
			</Card.Footer>
		</Card>
	);
};
