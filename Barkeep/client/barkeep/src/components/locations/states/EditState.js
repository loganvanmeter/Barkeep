import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { CountryDropDown } from "../../forms/CountryDropDown";
import { getStateById, updateState } from "../../../managers/LocationsManager";

export const EditState = () => {
	const { stateId } = useParams();
	const [countryId, setCountryId] = useState(0);
	const [state, setState] = useState({});

	const navigate = useNavigate();

	const getState = () => {
		return getStateById(stateId).then((res) => setState(res));
	};

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...state };
		copy[e.target.id] = e.target.value;
		setState(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...state };
		return updateState(copy).then(() => navigate(`/state/${state.id}`));
	};

	useEffect(() => {
		getState();
	}, [stateId]);

	useEffect(() => {
		const copy = { ...state };
		copy.countryId = countryId;
		setState(copy);
	}, [countryId]);

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Add a new state below</h3>
				<Stack gap={3}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							id='name'
							value={state.name}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<CountryDropDown
						countryId={state.countryId}
						setCountryId={setCountryId}
					/>
					<Stack direction='horizontal' className='justify-content-between'>
						<Link to='/state'>Back to list</Link>
						<Stack direction='horizontal' gap={3}>
							<Button
								variant='outline-secondary'
								onClick={(e) => {
									e.preventDefault();
									navigate(`/state/${state.id}`);
								}}
							>
								Cancel
							</Button>
							<Button variant='primary' type='sumbit'>
								Save
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Form>
		</Container>
	);
};
