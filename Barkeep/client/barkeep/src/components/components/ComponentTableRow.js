import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ComponentTableRow = ({ component }) => {
	const siteAdmin = JSON.parse(localStorage.getItem("siteAdmin"));
	const accountAdmin = JSON.parse(localStorage.getItem("accountAdmin"));
	const barAdmin = JSON.parse(localStorage.getItem("barAdmin"));
	const navigate = useNavigate();
	return (
		<tr>
			<td>{component.id}</td>
			<td>{component.name}</td>
			<td>{component?.componentType?.name}</td>
			<td>{component.abv ? `${component.abv}%` : ""}</td>
			<td>{component.ibu ? component.ibu : ""}</td>
			<td>{component.year ? component.year : ""}</td>
			<td>{component.producerId ? component?.producer?.name : ""}</td>
			<td>{component.importerId ? component?.importer?.name : ""}</td>
			<td>{component.isAdminApproved ? "Approved" : "Not Approved"}</td>
			<td>
				<Stack gap={1}>
					<Button
						variant='outline-secondary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/component/${component.id}`);
						}}
					>
						View
					</Button>

					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/component/${component.id}/edit`);
						}}
					>
						Edit
					</Button>
					<Button
						variant='danger'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/component/${component.id}/delete`);
						}}
					>
						Delete
					</Button>
				</Stack>
			</td>
		</tr>
	);
};
