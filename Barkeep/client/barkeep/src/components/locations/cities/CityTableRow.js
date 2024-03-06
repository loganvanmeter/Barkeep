import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const CityTableRow = ({ city }) => {
	const navigate = useNavigate();
	return (
		<tr>
			<td>{city.id}</td>
			<td>{city.name}</td>
			<td>{city.regionId ? city?.region?.name : ""}</td>
			<td>{city.stateId ? city?.state?.name : ""}</td>
			<td>
				{city.stateId
					? city?.state?.country?.name
					: city.countryId
					? city?.country?.name
					: ""}
			</td>
			<td>
				<Stack gap={1} className='justify-content-end'>
					<Button
						variant='outline-secondary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/city/${city.id}`);
						}}
					>
						View
					</Button>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/city/${city.id}/edit`);
						}}
					>
						Edit
					</Button>
					<Button
						variant='danger'
						onClick={(e) => {
							e.preventDefault();
							navigate(`/city/${city.id}/delete`);
						}}
					>
						Delete
					</Button>
				</Stack>
			</td>
		</tr>
	);
};
