import { Alert } from "react-bootstrap";

export const LoginAlert = ({ show, setShow }) => {
	if (show) {
		return (
			<Alert variant='danger' onClose={() => setShow(false)} dismissible>
				<p>Wrong emaill or password. Please try again.</p>
			</Alert>
		);
	}
};
