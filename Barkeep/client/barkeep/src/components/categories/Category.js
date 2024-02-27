import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const Category = ({ category }) => {
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
				<Card.Link href='/category'>Back to list</Card.Link>
				<Button variant='outline-secondary' className='me-3'>
					Edit
				</Button>
				<Button variant='danger'>Delete</Button>
			</Card.Footer>
		</Card>
	);
};
