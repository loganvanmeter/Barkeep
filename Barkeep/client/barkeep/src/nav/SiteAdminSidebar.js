import { Container, Nav, Navbar } from "react-bootstrap";

export const SiteAdminSidebar = () => {
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
			</Container>
		</Navbar>
	);
};
