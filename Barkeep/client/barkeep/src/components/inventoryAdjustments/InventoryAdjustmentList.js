import { Container, Table } from "react-bootstrap";
import { InventoryAdjustmentTableRow } from "./InventoryAdjustmentTableRow";

export const InventoryAdjustmentList = ({
	filteredAdjustments,
	setThisAdjustment,
	handleShowEdit,
}) => {
	return (
		<Table striped>
			<thead>
				<tr>
					<th>Date/Time</th>
					<th>Name</th>
					<th>Type</th>
					<th>Quantity</th>
					<th>Items Per Unit</th>
					<th>Unit</th>
					<th>Cost Per Unit</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{filteredAdjustments.map((adjustment) => {
					return (
						<InventoryAdjustmentTableRow
							adjustment={adjustment}
							key={adjustment.id}
							setThisAdjustment={setThisAdjustment}
							handleShowEdit={handleShowEdit}
						/>
					);
				})}
			</tbody>
		</Table>
	);
};
