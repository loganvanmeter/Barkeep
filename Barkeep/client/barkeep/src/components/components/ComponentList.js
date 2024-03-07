import { Container, Table } from "react-bootstrap";
import { ComponentTableRow } from "./ComponentTableRow";

export const ComponentList = ({ filteredComponents }) => {
	return (
		<Container>
			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Type</th>
						<th>ABV</th>
						<th>IBU</th>
						<th>Year</th>
						<th>Producer</th>
						<th>Importer</th>
						<th>Categories</th>
						<th>Status</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{filteredComponents.map((component) => {
						return (
							<ComponentTableRow component={component} key={component.id} />
						);
					})}
				</tbody>
			</Table>
		</Container>
	);
};
