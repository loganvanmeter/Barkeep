import { useState } from "react";
import { Container, Navbar, Row } from "react-bootstrap";

export const SiteAdminSidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	const siteAdmin = JSON.parse(localStorage.getItem("siteAdmin"));
	return <Navbar className='sidebar'></Navbar>;
};
