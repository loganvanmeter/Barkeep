import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBar, getBarById } from "../../managers/BarManager";
import {
	Alert,
	Button,
	Card,
	Container,
	ListGroup,
	Stack,
} from "react-bootstrap";
import {
	deleteBarBarUsers,
	deleteBarUser,
	getAllBarUsersByBarId,
} from "../../managers/BarUserManager";
import {
	deleteBarRoles,
	deleteRole,
	getRoleByBarId,
} from "../../managers/RoleManager";

export const DeleteBar = () => {
	const { barId } = useParams();
	const [bar, setBar] = useState({});
	const [barUsers, setBarUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const navigate = useNavigate();
	const getBar = () => {
		return getBarById(barId).then((res) => setBar(res));
	};
	const getThisBarUsers = () => {
		return getAllBarUsersByBarId(barId, true).then((barUsers) =>
			setBarUsers(barUsers)
		);
	};
	const getRoles = () => {
		return getRoleByBarId(barId).then((roles) => setRoles(roles));
	};
	const handleDelete = (e) => {
		e.preventDefault();
		return deleteBar(barId).then(() => navigate("/bar"));
	};
	useEffect(() => {
		getBar();
		getThisBarUsers();
		getRoles();
	}, [barId]);

	return (
		<Container>
			<Stack gap={3}>
				<Alert variant='danger'>
					<Alert.Heading>
						WARNING: You are about to delete the following bar
					</Alert.Heading>
					<p>
						Deleting this bar will remove it the system and delete all employee
						records, sales records, inventory, and menus created under this bar.
						It is recommended you either edit the bar or it's contained data
						instead. It is also recommended that you request all data from this
						bar from Barkeep for your records before deleteing this bar as there
						will be no way to recover that data once the bar is deleted.
					</p>
					<hr />
					<Stack direction='horizontal' className='justify-content-end'>
						<Button
							variant='secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/bar/${barId}/edit`);
							}}
						>
							Edit bar instead
						</Button>
					</Stack>
				</Alert>
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
								<Button variant='danger' onClick={(e) => handleDelete(e)}>
									Delete
								</Button>
							</Stack>
						</Stack>
					</Card.Footer>
				</Card>
			</Stack>
		</Container>
	);
};
