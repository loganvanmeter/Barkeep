import { Button, Card, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const City = ({ city }) => {
	const navigate = useNavigate();
	return (
		<Card>
			<Card.Header>
				<Stack direction='horizontal' className='justify-content-between'>
					<Stack>{`City #${city.id}`}</Stack>
					<Stack gap={1} className='align-items-end'>
						<div>
							{"Region: "}
							{city.regionId ? `${city?.region?.name}` : ""}
						</div>
						<div>
							{"State: "}
							{city.stateId ? `${city?.state?.name}` : ""}
						</div>
						<div>
							{"Country: "}
							{city.countryId ? `${city?.country?.name}` : ""}
						</div>
					</Stack>
				</Stack>
			</Card.Header>
			<Card.Body>
				<Card.Title>{city.name}</Card.Title>
			</Card.Body>
			<Card.Footer>
				<Stack direction='horizontal' className='justify-content-between'>
					<Card.Link href='/city'>Back to list</Card.Link>
					<Stack direction='horizontal' className='justify-content-end' gap={3}>
						<Button
							variant='primary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/city/${city.id}/edit`);
							}}
						>
							Edit
						</Button>
						<Button
							variant='danger'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/city/${city.id}/delete`);
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
