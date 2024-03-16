import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const MenuTableRow = ({ menu }) => {
	const navigate = useNavigate();
	return (
		<tr>
			<td>{menu.name}</td>
			<td className='text-center'>{menu.enabled ? "✔" : ""}</td>
			<td className='d-flex justify-content-end'>
				<Button
					variant='success'
					onClick={(e) => {
						e.preventDefault();
						navigate(`/bar/${menu.barId}/menu/${menu.id}`);
					}}
				>
					Dashboard
				</Button>
			</td>
		</tr>
	);
};
