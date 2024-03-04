import { Alert } from "react-bootstrap";

export const PinAlert = ({ show, setShow }) => {
	if (show) {
		return (
			<Alert variant='danger' onClose={() => setShow(false)} dismissible>
				<p>Pin must be numbers and between 4 to 8 digits in length</p>
			</Alert>
		);
	}
};
