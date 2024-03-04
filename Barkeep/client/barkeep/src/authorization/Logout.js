import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Logout = ({ setIsLoggedIn }) => {
	return (
		<Button
			variant='outline-secondary'
			onClick={(e) => {
				e.preventDefault();
				localStorage.clear();
				setIsLoggedIn(false);
			}}
		>
			Logout
		</Button>
	);
};
