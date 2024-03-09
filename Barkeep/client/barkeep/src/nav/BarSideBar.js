import { Container, Nav, NavDropdown, Navbar, Stack } from "react-bootstrap";

export const BarAdminSideBar = ({ bar }) => {
	return (
		<Navbar className='sidebar'>
			<Container>
				<Navbar.Brand href='/bar/:barId/dashboard'>{bar.name}</Navbar.Brand>
				<NavDropdown title='Inventory' className='me-auto'>
					<NavDropdown.Item href={`/bar/${bar.id}/inventory`}>
						Inventory
					</NavDropdown.Item>
				</NavDropdown>
			</Container>
		</Navbar>
	);
};
