import { useState, useEffect } from "react";
import {
	getAllUnitTypes,
	getUnitTypeById,
} from "../../managers/UnitTypeManager";
import { Form, Stack } from "react-bootstrap";

export const UnitTypeDropDown = ({ unitTypeId, setUnitTypeId, adjustment }) => {
	const [unitTypes, setUnitTypes] = useState([]);
	const getUnitTypes = () => {
		return getAllUnitTypes().then((unitTypes) => setUnitTypes(unitTypes));
	};

	useEffect(() => {
		getUnitTypes();
	}, []);

	const handleChange = (e) => {
		e.preventDefault();
		setUnitTypeId(parseInt(e.target.value));
	};

	return (
		<Stack>
			<Form.Group>
				<Form.Label>Unit Type</Form.Label>
				<Form.Select
					aria-label='Unit Type'
					value={adjustment ? adjustment.unitTypeId : unitTypeId}
					onChange={(e) => handleChange(e)}
				>
					<option value={0}>Select Unit Type</option>
					{unitTypes.map((unitType) => {
						return (
							<option key={unitType.id} value={unitType.id}>
								{adjustment &&
								parseFloat(adjustment.quantity) > 1 &&
								unitType.id !== 5 &&
								unitType.id !== 3
									? unitType.name + "s"
									: unitType.name}
							</option>
						);
					})}
				</Form.Select>
			</Form.Group>
		</Stack>
	);
};
