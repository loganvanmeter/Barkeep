import { Container, Table } from "react-bootstrap";
import { ProducerTableRow } from "./ProducerTableRow";

export const ProducerList = ({ filteredProducers }) => {
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
					{filteredProducers.map((producer) => {
						return <ProducerTableRow producer={producer} key={producer.id} />;
					})}
				</tbody>
			</Table>
		</Container>
	);
};
