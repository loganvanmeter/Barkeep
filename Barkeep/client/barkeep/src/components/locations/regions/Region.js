import { Button, Card, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Region = ({ region }) => {
	const navigate = useNavigate();
	return (
		<Card>
			<Card.Header>
				{region.stateId ? (
					<Stack direction='horizontal' className='justify-content-between'>
						<Stack>{`State subregion #${region.id}`}</Stack>
						<Stack gap={1} className='align-items-end'>
							<div>{`State: ${region?.state?.name}`}</div>
							<div>{`Country: ${region?.state?.country?.name}`}</div>
						</Stack>
					</Stack>
				) : region.countryId ? (
					<Stack direction='horizontal' className='justify-content-between'>
						<div>{`Country subregion #${region.id}`}</div>
						<div>{`Country: ${region?.country?.name}`}</div>
					</Stack>
				) : (
					""
				)}
			</Card.Header>
			<Card.Body>
				<Card.Title>{region.name}</Card.Title>
			</Card.Body>
			<Card.Footer>
				<Stack direction='horizontal' className='justify-content-between'>
					<Card.Link href='/region'>Back to list</Card.Link>
					<Stack direction='horizontal' className='justify-content-end' gap={3}>
						<Button
							variant='primary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/region/${region.id}/edit`);
							}}
						>
							Edit
						</Button>
						<Button
							variant='danger'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/region/${region.id}/delete`);
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
