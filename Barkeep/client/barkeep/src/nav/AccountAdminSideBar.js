import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Logout } from "../authorization/Logout";

export const AccountAdminSideBar = ({ setIsLoggedIn }) => {
	return (
		<Navbar className='sidebar'>
			<Container>
				<Navbar.Brand href='/account/:userId/dashboard'>Barkeep</Navbar.Brand>
				<Nav className='me-auto'>
					<Nav.Link href='/bar'>Bars</Nav.Link>
				</Nav>
				<Nav className='me-auto'>
					<Nav.Link href='/category'>Categories</Nav.Link>
				</Nav>
				<NavDropdown title='Components' className='me-auto'>
					<NavDropdown.Item href='/component'>Components</NavDropdown.Item>
					<NavDropdown.Item href='/importer'>Importers</NavDropdown.Item>
					<NavDropdown.Item href='/producer'>Producers</NavDropdown.Item>
				</NavDropdown>
				<NavDropdown title='Locations' className='me-auto'>
					<NavDropdown.Item href='/country'>Countries</NavDropdown.Item>
					<NavDropdown.Item href='/state'>States</NavDropdown.Item>
					<NavDropdown.Item href='/region'>Regions</NavDropdown.Item>
					<NavDropdown.Item href='/city'>Cities</NavDropdown.Item>
				</NavDropdown>
				<Logout setIsLoggedIn={setIsLoggedIn} />
			</Container>
		</Navbar>
	);
};
