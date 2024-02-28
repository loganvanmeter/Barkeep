import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getAllVarietalTypes } from "../../managers/VarietalTypeManager";

export const VarietalTypeDropDown = ({ varietalTypeId, setVarietalTypeId }) => {
	const [varietalTypes, setVarietalTypes] = useState([]);

	const getVarietalTypes = () => {
		return getAllVarietalTypes().then((res) => setVarietalTypes(res));
	};

	const handleChange = (e) => {
		e.preventDefault();
		setVarietalTypeId(parseInt(e.target.value));
	};

	useEffect(() => {
		getVarietalTypes();
	}, []);

	return (
		<Form.Group>
			<Form.Label>
				{window.location.pathname === "/varietal"
					? "Filter by varietal type"
					: "Varietal Type"}
			</Form.Label>
			<Form.Select
				aria-label='Default select example'
				value={varietalTypeId}
				onChange={handleChange}
			>
				<option value={0}>
					{window.location.pathname === "/varietal" ? "All" : "Select varietal"}
				</option>
				{varietalTypes.map((varietalType) => {
					return (
						<option key={varietalType.id} value={varietalType.id}>
							{varietalType.name}
						</option>
					);
				})}
			</Form.Select>
		</Form.Group>
	);
};
