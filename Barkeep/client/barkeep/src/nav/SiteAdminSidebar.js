import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Logout } from "../authorization/Logout";

export const SiteAdminSidebar = ({ setIsLoggedIn }) => {
	return (
		<Navbar className='sidebar'>
			<Container>
				<Navbar.Brand href='/'>Barkeep</Navbar.Brand>
				<Nav className='me-auto'>
					<Nav.Link href='/category'>Categories</Nav.Link>
				</Nav>
				<Nav className='me-auto'>
					<Nav.Link href='/varietalType'>Varietal Types</Nav.Link>
				</Nav>
				<Nav className='me-auto'>
					<Nav.Link href='/varietal'>Varietals</Nav.Link>
				</Nav>
				<NavDropdown title='Locations'>
					<NavDropdown.Item href='/country'>Countries</NavDropdown.Item>
					<NavDropdown.Item href='/state'>States</NavDropdown.Item>
					<NavDropdown.Item href='/region'>Regions</NavDropdown.Item>
				</NavDropdown>
				<Logout setIsLoggedIn={setIsLoggedIn} />
			</Container>
		</Navbar>
	);
};
