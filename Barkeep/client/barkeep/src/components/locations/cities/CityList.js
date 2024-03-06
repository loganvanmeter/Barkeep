import { Container, Table } from "react-bootstrap";
import { CityTableRow } from "./CityTableRow";

export const CityList = ({ filteredRegions }) => {
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
					{filteredRegions.map((region) => {
						return <CityTableRow region={region} key={region.id} />;
					})}
				</tbody>
			</Table>
		</Container>
	);
};
