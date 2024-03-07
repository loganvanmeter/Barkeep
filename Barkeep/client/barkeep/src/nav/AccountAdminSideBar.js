import { Container, Nav, Navbar } from "react-bootstrap";
import { Logout } from "../authorization/Logout";

export const AccountAdminSideBar = ({ setIsLoggedIn }) => {
	return (
		<Navbar className='sidebar'>
			<Container>
				<Navbar.Brand href='/account/:userId/dashboard'>Barkeep</Navbar.Brand>
				<Nav className='me-auto'>
					<Nav.Link href='/bar'>Bars</Nav.Link>
				</Nav>
				<Logout setIsLoggedIn={setIsLoggedIn} />
			</Container>
		</Navbar>
	);
};
