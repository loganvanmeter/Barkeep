import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const RegionTableRow = ({ region }) => {
	const navigate = useNavigate();
	return (
		<tr>
			<td>{region.id}</td>
			<td>{region.name}</td>
			<td>{region.stateId ? region?.state?.name : ""}</td>
			<td>
				{region.stateId
					? region?.state?.country?.name
					: region.countryId
					? region?.country?.name
					: ""}
			</td>
			<td>
				<Stack gap={1} className='justify-content-end'>
					<Button
						variant='outline-secondary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/region/${region.id}`);
						}}
					>
						View
					</Button>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/region/${region.id}/edit`);
						}}
					>
						Edit
					</Button>
					<Button
						variant='danger'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/region/${region.id}/delete`);
						}}
					>
						Delete
					</Button>
				</Stack>
			</td>
		</tr>
	);
};
