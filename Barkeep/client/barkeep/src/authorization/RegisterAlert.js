import { Alert } from "react-bootstrap";

export const RegisterAlert = ({ show, setShow }) => {
	if (show) {
		return (
			<Alert variant='danger' onClose={() => setShow(false)} dismissible>
				<p>Must fill out all fields to register for Barkeep</p>
			</Alert>
		);
	}
};
