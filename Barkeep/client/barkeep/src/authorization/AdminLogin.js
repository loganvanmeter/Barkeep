import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminLogin } from "../managers/UserManager";
import {
	Alert,
	Button,
	Container,
	Form,
	InputGroup,
	Stack,
} from "react-bootstrap";
import { LoginAlert } from "./LoginAlert";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

export const AdminLogin = ({
	setIsSiteAdminLoggedIn,
	setIsAccountAdminLoggedIn,
}) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [show, setShow] = useState(false);

	const loginSubmit = (e) => {
		e.preventDefault();
		adminLogin(email, password).then((res) => {
			if (res.userType.name === "Site Admin") {
				setIsSiteAdminLoggedIn(true);
				navigate("/");
			} else if (res.userType.name === "Account Admin") {
				setIsAccountAdminLoggedIn(true);
				navigate("/");
			} else {
				setShow(true);
			}
		});
	};

	return (
		<Container>
			<LoginAlert show={show} setShow={setShow} />
			<Form onSubmit={loginSubmit}>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<InputGroup>
						<InputGroup.Text id='email'>Email</InputGroup.Text>
						<Form.Control
							type='email'
							placeholder='Enter your email address...'
							aria-label='Email'
							aria-describedby='email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</InputGroup>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<InputGroup className='mb-3'>
						<InputGroup.Text id='password'>Password</InputGroup.Text>
						<Form.Control
							type='password'
							placeholder='Enter your password...'
							aria-label='Password'
							aria-describedby='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</InputGroup>
				</Form.Group>
				<Form.Group>
					<Button variant='primary' type='submit'>
						Login
					</Button>
				</Form.Group>
			</Form>
			<Stack direction='horizontal' className='justify-content-end' gap={1}>
				<p>New to Barkeep?</p>
				<Link to='/register'>Register here</Link>{" "}
			</Stack>
		</Container>
	);
};
