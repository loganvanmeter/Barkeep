import { Container, Table } from "react-bootstrap";
import { VarietalRow } from "./VarietalRow";

export const VarietalList = ({ filteredVarietals }) => {
	return (
		<Container>
			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Varietal Type</th>
						<th>Description</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{filteredVarietals.map((varietal) => {
						return <VarietalRow varietal={varietal} key={varietal.id} />;
					})}
				</tbody>
			</Table>
		</Container>
	);
};
