import { Button, Card, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Varietal = ({ varietal }) => {
	const navigate = useNavigate();
	return (
		<Card>
			<Card.Header>
				<Stack direction='horizontal' className='justify-content-between'>
					<div>{`Varietal #${varietal.id}`}</div>
					<div>{`Varietal Type: ${varietal?.varietalType?.name}`}</div>
				</Stack>
			</Card.Header>
			<Card.Body>
				<Card.Title>{varietal.name}</Card.Title>
				<Card.Text>
					{varietal.description
						? varietal.description
						: "No description for this varietal has been added."}
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				<Stack direction='horizontal' className='justify-content-between'>
					<Card.Link href='/varietal'>Back to list</Card.Link>
					<Stack direction='horizontal' className='justify-content-end' gap={3}>
						<Button
							variant='primary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/varietal/${varietal.id}/edit`);
							}}
						>
							Edit
						</Button>
						<Button
							variant='danger'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/varietal/${varietal.id}/delete`);
							}}
						>
							Delete
						</Button>
					</Stack>
				</Stack>
			</Card.Footer>
		</Card>
	);
};
