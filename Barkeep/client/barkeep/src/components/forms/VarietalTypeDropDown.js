import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { getAllVarietalTypes } from "../../managers/VarietalTypeManager";

export const VarietalTypeDropDown = ({ varietalTypeId, setVarietalTypeId }) => {
	const [varietalTypes, setVarietalTypes] = useState([]);

	const getVarietalTypes = () => {
		return getAllVarietalTypes().then((res) => setVarietalTypes(res));
	};

	const handleChange = (e) => {
		e.preventDefault();
		setVarietalTypeId(e.target.value);
	};

	useEffect(() => {
		getVarietalTypes();
	}, []);

	return (
		<Container>
			<Form.Label>Filter by varietal type</Form.Label>
			<Form.Select
				aria-label='Default select example'
				value={varietalTypeId}
				onChange={handleChange}
			>
				<option value={0}>All</option>
				{varietalTypes.map((varietalType) => {
					return (
						<option key={varietalType.id} value={varietalType.id}>
							{varietalType.name}
						</option>
					);
				})}
			</Form.Select>
		</Container>
	);
};
