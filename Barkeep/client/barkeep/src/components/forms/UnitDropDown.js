import { useState, useEffect } from "react";
import { getAllUnits, getUnitById } from "../../managers/UnitManager";
import { Form, Stack } from "react-bootstrap";

export const UnitDropDown = ({ unitId, setUnitId, adjustment }) => {
	const [units, setUnits] = useState([]);
	const getUnits = () => {
		return getAllUnits().then((units) => setUnits(units));
	};
	useEffect(() => {
		getUnits();
	}, []);

	const handleChange = (e) => {
		e.preventDefault();
		setUnitId(parseInt(e.target.value));
	};

	return (
		<Stack>
			<Form.Group>
				<Form.Label>Unit </Form.Label>
				<Form.Select
					aria-label='Unit'
					value={unitId}
					onChange={(e) => handleChange(e)}
				>
					<option value={0}>Select Unit </option>
					{units.map((unit) => {
						return (
							<option key={unit.id} value={unit.id}>
								{adjustment && unit.measurement === "unit"
									? "Same as tracking " + unit.name
									: unit.name}
							</option>
						);
					})}
				</Form.Select>
			</Form.Group>
		</Stack>
	);
};
