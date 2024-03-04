import { ComponentTypeRow } from "./ComponentTypeRow";
import { useEffect, useState } from "react";
import { Button, Container, Stack, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllComponentTypes } from "../../managers/ComponentTypeManager";

export const ComponentTypeList = () => {
	const [componentTypes, setComponentTypes] = useState([]);
	const navigate = useNavigate();

	const getComponentTypes = () => {
		return getAllComponentTypes().then((res) => setComponentTypes(res));
	};

	useEffect(() => {
		getComponentTypes();
	}, []);

	return (
		<Container>
			<Stack gap={3}>
				<h2>Component Types</h2>
				<Container className='d-flex justify-content-end'>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate("/componentType/add");
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
							<th></th>
						</tr>
					</thead>
					<tbody>
						{componentTypes.map((componentType) => {
							return (
								<ComponentTypeRow
									componentType={componentType}
									key={componentType.id}
								/>
							);
						})}
					</tbody>
				</Table>
			</Stack>
		</Container>
	);
};
