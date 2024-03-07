import { useEffect, useState } from "react";
import { Form, Stack } from "react-bootstrap";
import { getAllComponentTypes } from "../../managers/ComponentTypeManager";

export const ComponentTypeDropDown = ({
	componentTypeId,
	setComponentTypeId,
}) => {
	const [componentTypes, setComponentTypes] = useState([]);

	const getComponentTypes = () => {
		return getAllComponentTypes().then((res) => setComponentTypes(res));
	};

	const handleChange = (e) => {
		e.preventDefault();
		setComponentTypeId(parseInt(e.target.value));
	};

	useEffect(() => {
		getComponentTypes();
	}, []);

	return (
		<Stack>
			<Form.Group>
				<Form.Label>
					{window.location.pathname === "/component"
						? "Filter by component type"
						: "Component Type"}
				</Form.Label>
				<Form.Select
					aria-label='Default select example'
					value={componentTypeId}
					onChange={handleChange}
				>
					<option value={0}>
						{window.location.pathname === "/component"
							? "All"
							: "Select component type"}
					</option>
					{componentTypes.map((componentType) => {
						return (
							<option key={componentType.id} value={componentType.id}>
								{componentType.name}
							</option>
						);
					})}
				</Form.Select>
			</Form.Group>
		</Stack>
	);
};
