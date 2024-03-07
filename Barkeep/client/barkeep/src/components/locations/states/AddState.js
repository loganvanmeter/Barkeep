import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { addState } from "../../../managers/LocationsManager";
import { CountryDropDown } from "../../forms/CountryDropDown";

export const AddState = ({
	setShow,
	setStates,
	getAllStates,
	setComponentCountryId,
	setComponentStateId,
}) => {
	const urlPath = "state";
	const [countryId, setCountryId] = useState(0);
	const [state, setState] = useState({
		name: null,
		countryId: null,
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...state };
		copy[e.target.id] = e.target.value;
		setState(copy);
	};

	const handleCancel = (e) => {
		e.preventDefault();
		if (window.location.pathname !== `/state/add`) {
			setShow(false);
		} else {
			navigate(`/state`);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...state };
		return addState(copy)
			.then((res) => res.json())
			.then((newState) => {
				if (window.location.pathname !== `/state/add`) {
					return getAllStates()
						.then((states) => setStates(states))
						.then(() => setComponentStateId(parseInt(newState.id)))
						.then(() => {
							setComponentCountryId(newState.countryId);
						});
				} else {
					navigate(`/state/${newState.id}`);
				}
			});
	};

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
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<CountryDropDown
						countryId={countryId}
						setCountryId={setCountryId}
						urlPath={urlPath}
					/>
					<Stack direction='horizontal' className='justify-content-end' gap={3}>
						<Button
							variant='outline-secondary'
							onClick={(e) => handleCancel(e)}
						>
							Cancel
						</Button>
						<Button variant='primary' type='sumbit'>
							Save
						</Button>
					</Stack>
				</Stack>
			</Form>
		</Container>
	);
};
