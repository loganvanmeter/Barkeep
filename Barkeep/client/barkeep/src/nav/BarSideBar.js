import { Container, Nav, NavDropdown, Navbar, Stack } from "react-bootstrap";

export const BarAdminSideBar = ({ bar }) => {
	return (
		<Navbar className='sidebar'>
			<Container>
				<Navbar.Brand href={`/bar/${bar.id}/dashboard`}>
					{bar.name}
				</Navbar.Brand>
				<Nav className='me-auto'>
					<Nav.Link href={`/bar/${bar.id}/inventory`}>Inventory</Nav.Link>
				</Nav>
				<Nav className='me-auto'>
					<Nav.Link href={`/bar/${bar.id}/menu`}>Menus</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};
