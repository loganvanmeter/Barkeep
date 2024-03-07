import { Button, Card, ListGroup, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Bar = ({ bar }) => {
	const navigate = useNavigate();
	const accountAdmin = JSON.parse(localStorage.getItem("accountAdmin"));
	return (
		<Card>
			<Card.Header>Bar #{bar.id}</Card.Header>
			<Card.Body>
				<Card.Title>{bar.name}</Card.Title>
			</Card.Body>
			<Stack direction='horizontal' gap={5}>
				<Stack gap={3}>
					<Card.Subtitle className='mx-3'>Contact Info:</Card.Subtitle>
					<ListGroup className='list-group-flush'>
						<ListGroup.Item>Email: {bar.email}</ListGroup.Item>
						<ListGroup.Item>Phone: {bar.phone}</ListGroup.Item>
						<ListGroup.Item>Website: {bar.website}</ListGroup.Item>
					</ListGroup>
				</Stack>
				<Stack gap={3}>
					<Card.Subtitle className='mx-3'>Address:</Card.Subtitle>
					<ListGroup className='list-group-flush'>
						<ListGroup.Item>Street: {bar.street}</ListGroup.Item>
						<ListGroup.Item>City: {bar?.city?.name}</ListGroup.Item>
						{bar.regionId ? (
							<ListGroup.Item>Region: {bar?.region?.name}</ListGroup.Item>
						) : (
							""
						)}
						{bar.stateId ? (
							<ListGroup.Item>State: {bar?.state?.name}</ListGroup.Item>
						) : (
							""
						)}
						<ListGroup.Item>Country: {bar?.country?.name}</ListGroup.Item>
					</ListGroup>
				</Stack>
			</Stack>
			<Card.Footer>
				<Stack direction='horizontal' className='justify-content-between'>
					<Card.Link href='/bar'>Back to list</Card.Link>
					{accountAdmin.id == bar.userId ? (
						<>
							<Stack gap={3} direction='horizontal'>
								<Button
									variant='success'
									onClick={(e) => {
										e.preventDefault();
										navigate(`/bar/${bar.id}/dashboard`);
									}}
								>
									Dashboard
								</Button>
								<Button
									variant='primary'
									onClick={(e) => {
										e.preventDefault();
										navigate(`/bar/${bar.id}/edit`);
									}}
								>
									Edit
								</Button>
								<Button
									variant='danger'
									onClick={(e) => {
										e.preventDefault();
										navigate(`/bar/${bar.id}/delete`);
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
