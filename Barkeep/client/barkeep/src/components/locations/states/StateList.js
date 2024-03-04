import { Container, Table } from "react-bootstrap";
import { StateTableRow } from "./StateTableRow";

export const StateList = ({ filteredStates }) => {
	return (
		<Container>
			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Country</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{filteredStates.map((state) => {
						return <StateTableRow state={state} key={state.id} />;
					})}
				</tbody>
			</Table>
		</Container>
	);
};
