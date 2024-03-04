import { Container, Navbar } from "react-bootstrap";
import { Logout } from "../authorization/Logout";

export const AccountAdminSideBar = ({ setIsLoggedIn }) => {
	return (
		<Navbar className='sidebar'>
			<Container>
				<Navbar.Brand href='/'>Barkeep</Navbar.Brand>
				<Logout setIsLoggedIn={setIsLoggedIn} />
			</Container>
		</Navbar>
	);
};
