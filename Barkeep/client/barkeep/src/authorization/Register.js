import { useState } from "react";
import { addUser } from "../managers/UserManager";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { RegisterAlert } from "./RegisterAlert";
import { PinAlert } from "./PinAlert";

export const Register = ({ setIsAccountAdminLoggedIn }) => {
	const [user, setUser] = useState({
		displayName: null,
		firstName: null,
		lastName: null,
		phone: null,
		email: null,
		pin: null,
		createDateTime: new Date(),
		endDateTime: null,
		userTypeId: 2,
		isActive: true,
		password: null,
	});
	const [show, setShow] = useState(false);
	const [pinAlertShow, setPinAlertShow] = useState(false);
	const [password, setPassword] = useState(null);
	const navigate = useNavigate();

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...user };
		copy[e.target.id] = e.target.value;
		setUser(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...user };
		if (
			copy.pin &&
			typeof parseInt(copy.pin) === "number" &&
			copy.pin.length >= 4 &&
			copy.pin.length <= 8
		) {
			if (
				copy.displayName &&
				copy.firstName &&
				copy.lastName &&
				copy.phone &&
				copy.email &&
				copy.pin &&
				copy.password
			) {
				return addUser(copy)
					.then((res) => res.json())
					.then((newUser) => {
						localStorage.setItem("accountAdmin", JSON.stringify(newUser));
					})
					.then(() => {
						setIsAccountAdminLoggedIn(true);
					})
					.then(() => navigate("/"));
			} else {
				setShow(true);
			}
		} else {
			setPinAlertShow(true);
		}
	};
	return (
		<Container>
			<RegisterAlert show={show} setShow={setShow} />
			<PinAlert show={pinAlertShow} setShow={setPinAlertShow} />
			<Form onSubmit={handleSubmit}>
				<Stack direction='horizontal' gap={3}>
					<Stack>
						<Form.Group className='mb-3'>
							<InputGroup>
								<InputGroup.Text>First Name</InputGroup.Text>
								<Form.Control
									id='firstName'
									type='text'
									aria-label='firstName'
									aria-describedby='firstName'
									onChange={(e) => handleChange(e)}
								/>
							</InputGroup>
						</Form.Group>
					</Stack>
					<Stack>
						<Form.Group className='mb-3'>
							<InputGroup>
								<InputGroup.Text>Last Name</InputGroup.Text>
								<Form.Control
									id='lastName'
									type='text'
									aria-label='lastName'
									aria-describedby='lastName'
									onChange={(e) => handleChange(e)}
								/>
							</InputGroup>
						</Form.Group>
					</Stack>
				</Stack>
				<Stack direction='horizontal' gap={3}>
					<Stack>
						<Form.Group className='mb-3'>
							<InputGroup>
								<InputGroup.Text>Email</InputGroup.Text>
								<Form.Control
									id='email'
									type='email'
									aria-label='email'
									aria-describedby='email'
									onChange={(e) => handleChange(e)}
								/>
							</InputGroup>
						</Form.Group>
					</Stack>
					<Stack>
						<Form.Group className='mb-3'>
							<InputGroup>
								<InputGroup.Text>Phone</InputGroup.Text>
								<Form.Control
									id='phone'
									type='tel'
									aria-label='phone'
									aria-describedby='phone'
									onChange={(e) => handleChange(e)}
								/>
							</InputGroup>
						</Form.Group>
					</Stack>
				</Stack>
				<Stack direction='horizontal' gap={3}>
					<Stack>
						<Form.Group className='mb-3'>
							<InputGroup>
								<InputGroup.Text>Display Name</InputGroup.Text>
								<Form.Control
									id='displayName'
									type='text'
									aria-label='displayName'
									aria-describedby='displayName'
									onChange={(e) => handleChange(e)}
								/>
							</InputGroup>
						</Form.Group>
						<Form.Group className='mb-3'>
							<InputGroup>
								<InputGroup.Text>Pin</InputGroup.Text>
								<Form.Control
									id='pin'
									type='tel'
									aria-label='pin'
									aria-describedby='pin'
									onChange={(e) => handleChange(e)}
								/>
							</InputGroup>
							<Form.Text className='text-muted'>
								Pin must be between 4 and 8 digits;
							</Form.Text>
						</Form.Group>
					</Stack>
					<Stack>
						<Form.Group className='mb-3'>
							<InputGroup>
								<InputGroup.Text>Password</InputGroup.Text>
								<Form.Control
									id='password'
									type='password'
									aria-label='password'
									aria-describedby='password'
									onChange={(e) => handleChange(e)}
								/>
							</InputGroup>
						</Form.Group>
						<Form.Group className='mb-3'>
							<InputGroup>
								<InputGroup.Text>Confirm Password</InputGroup.Text>
								<Form.Control
									type='password'
									aria-label='confrimPassword'
									aria-describedby='confrimPassword'
									onChange={(e) => {
										e.preventDefault();
										setPassword(e.target.value);
									}}
								/>
							</InputGroup>
							{password && user.password !== password ? (
								<Form.Text className='text-danger'>
									* passwords must match
								</Form.Text>
							) : (
								""
							)}
						</Form.Group>
					</Stack>
				</Stack>
				<Button variant='primary' type='submit'>
					Register
				</Button>
			</Form>
		</Container>
	);
};
