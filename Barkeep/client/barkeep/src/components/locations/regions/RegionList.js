import { Container, Table } from "react-bootstrap";
import { RegionTableRow } from "./RegionTableRow";

export const RegionList = ({ filteredRegions }) => {
	return (
		<Container>
			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>State</th>
						<th>Country</th>
					</tr>
				</thead>
				<tbody>
					{filteredRegions.map((region) => {
						return <RegionTableRow region={region} key={region.id} />;
					})}
				</tbody>
			</Table>
		</Container>
	);
};
