import { Container, Table } from "react-bootstrap";
import { ImporterTableRow } from "./ImporterTableRow";

export const ImporterList = ({ filteredImporters }) => {
	return (
		<Container>
			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Website</th>
						<th>Description</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{filteredImporters.map((importer) => {
						return <ImporterTableRow importer={importer} key={importer.id} />;
					})}
				</tbody>
			</Table>
		</Container>
	);
};
