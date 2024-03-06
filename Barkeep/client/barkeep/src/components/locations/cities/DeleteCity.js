import { Alert, Button, Card, Container, Stack } from "react-bootstrap";
import { deleteCity, getCityById } from "../../../managers/LocationsManager";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const DeleteCity = () => {
	const { cityId } = useParams();
	const [city, setCity] = useState({});
	const navigate = useNavigate();
	const getCity = () => {
		return getCityById(cityId).then((res) => setCity(res));
	};
	const handleDelete = (e) => {
		e.preventDefault();
		return deleteCity(city.id).then(() => navigate("/city"));
	};

	useEffect(() => {
		getCity();
	}, [cityId]);
	return (
		<Container>
			<Stack gap={3}>
				<Alert variant='danger'>
					<Alert.Heading>
						WARNING: You are about to delete the following city
					</Alert.Heading>
					<p>
						Deleting this will remove it from all current components marked with
						this city. It is best practice to EDIT the city instead to preserve
						the integrity of the software and it's systems.
					</p>
					<hr />
					<Stack direction='horizontal' className='justify-content-end'>
						<Button
							variant='secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/city/${cityId}/edit`);
							}}
						>
							Edit city instead
						</Button>
					</Stack>
				</Alert>
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
							<Stack
								direction='horizontal'
								className='justify-content-end'
								gap={3}
							>
								<Button
									variant='primary'
									onClick={(e) => {
										e.preventDefault();
										navigate(`/city/${city.id}/edit`);
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
