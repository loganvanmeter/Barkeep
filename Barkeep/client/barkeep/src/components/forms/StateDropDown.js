import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getAllStates } from "../../managers/LocationsManager";

export const StateDropDown = ({ stateId, setStateId }) => {
	const [state, setStates] = useState([]);

	const getStates = () => {
		return getAllStates().then((res) => setStates(res));
	};

	const handleChange = (e) => {
		e.preventDefault();
		setStateId(parseInt(e.target.value));
	};

	useEffect(() => {
		getStates();
	}, []);

	return (
		<Form.Group>
			<Form.Label>
				{window.location.pathname !== "/state" ? "Filter by state" : "State"}
			</Form.Label>
			<Form.Select
				aria-label='Default select example'
				value={stateId}
				onChange={handleChange}
			>
				<option value={0}>
					{window.location.pathname !== "/state" ? "All" : "Select state"}
				</option>
				{state.map((state) => {
					return (
						<option key={state.id} value={state.id}>
							{state.name}
						</option>
					);
				})}
			</Form.Select>
		</Form.Group>
	);
};
