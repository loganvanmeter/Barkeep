import { Container, Table } from "react-bootstrap";
import { InventoryTableRow } from "./InventoryTableRow";

export const InventoryList = ({ filteredInventories }) => {
	return (
		<Container>
			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Type</th>
						<th>Quantity</th>
						<th>CPO/CPU</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{filteredInventories.map((inventory) => {
						return (
							<InventoryTableRow inventory={inventory} key={inventory.id} />
						);
					})}
				</tbody>
			</Table>
		</Container>
	);
};
