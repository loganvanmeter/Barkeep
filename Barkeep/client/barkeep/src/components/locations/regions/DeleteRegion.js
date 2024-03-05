import { Alert, Button, Card, Container, Stack } from "react-bootstrap";
import {
	deleteRegion,
	getRegionById,
} from "../../../managers/LocationsManager";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const DeleteRegion = () => {
	const { regionId } = useParams();
	const [region, setRegion] = useState({});
	const navigate = useNavigate();
	const getRegion = () => {
		return getRegionById(regionId).then((res) => setRegion(res));
	};
	const handleDelete = (e) => {
		e.preventDefault();
		return deleteRegion(region.id).then(() => navigate("/region"));
	};

	useEffect(() => {
		getRegion();
	}, [regionId]);
	return (
		<Container>
			<Stack gap={3}>
				<Alert variant='danger'>
					<Alert.Heading>
						WARNING: You are about to delete the following region
					</Alert.Heading>
					<p>
						Deleting this region will remove it from all current components and
						cities marked with this region. It is best practice to EDIT the
						region instead to preserve the integrity of the software and it's
						systems.
					</p>
					<hr />
					<Stack direction='horizontal' className='justify-content-end'>
						<Button
							variant='secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/region/${regionId}/edit`);
							}}
						>
							Edit region instead
						</Button>
					</Stack>
				</Alert>
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
							<Stack
								direction='horizontal'
								className='justify-content-end'
								gap={3}
							>
								<Button
									variant='primary'
									onClick={(e) => {
										e.preventDefault();
										navigate(`/region/${region.id}/edit`);
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
