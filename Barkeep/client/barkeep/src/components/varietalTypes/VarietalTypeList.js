import { useEffect, useState } from "react";
import { getAllVarietalTypes } from "../../managers/VarietalTypeManager";
import { Container, Table } from "react-bootstrap";
import { VarietalTypeRow } from "./VarietalTypeRow";

export const VarietalTypeList = () => {
	const [varietalTypes, setVarietalTypes] = useState([]);

	const getVarietalTypes = () => {
		return getAllVarietalTypes().then((res) => setVarietalTypes(res));
	};

	useEffect(() => {
		getVarietalTypes();
	}, []);

	return (
		<Container>
			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Description</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{varietalTypes.map((varietalType) => {
						return (
							<VarietalTypeRow
								varietalType={varietalType}
								key={varietalType.id}
							/>
						);
					})}
				</tbody>
			</Table>
		</Container>
	);
};
