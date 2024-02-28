import { useEffect, useState } from "react";
import { getAllVarietalTypes } from "../../managers/VarietalTypeManager";
import { Button, Container, Stack, Table } from "react-bootstrap";
import { VarietalTypeRow } from "./VarietalTypeRow";
import { useNavigate } from "react-router-dom";

export const VarietalTypeList = () => {
	const [varietalTypes, setVarietalTypes] = useState([]);
	const navigate = useNavigate();

	const getVarietalTypes = () => {
		return getAllVarietalTypes().then((res) => setVarietalTypes(res));
	};

	useEffect(() => {
		getVarietalTypes();
	}, []);

	return (
		<Container>
			<Stack gap={3}>
				<h2>Varietal Types</h2>
				<Container className='d-flex justify-content-end'>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate("/varietalType/add");
						}}
					>
						Add new varietal type
					</Button>
				</Container>
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
			</Stack>
		</Container>
	);
};
