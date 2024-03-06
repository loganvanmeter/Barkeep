import { Container, Table } from "react-bootstrap";
import { CityTableRow } from "./CityTableRow";

export const CityList = ({ filteredCities }) => {
	return (
		<Container>
			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Region</th>
						<th>State</th>
						<th>Country</th>
					</tr>
				</thead>
				<tbody>
					{filteredCities.map((city) => {
						return <CityTableRow city={city} key={city.id} />;
					})}
				</tbody>
			</Table>
		</Container>
	);
};
