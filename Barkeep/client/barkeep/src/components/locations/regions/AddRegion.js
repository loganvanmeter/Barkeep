import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { addRegion, addState } from "../../../managers/LocationsManager";
import { CountryDropDown } from "../../forms/CountryDropDown";
import { StateDropDown } from "../../forms/StateDropDown";

export const AddRegion = () => {
	const [countryId, setCountryId] = useState(0);
	const [stateId, setStateId] = useState(0);
	const [addStateRegion, setAddStateRegion] = useState(false);
	const [addCountryRegion, setAddCountryRegion] = useState(false);
	const [region, setRegion] = useState({
		name: null,
		countryId: null,
		stateId: null,
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...region };
		copy[e.target.id] = e.target.value;
		setRegion(copy);
	};

	const handleRadioChange = (e) => {
		if (e.target.id.startsWith("state")) {
			setAddStateRegion(e.target.checked);
			setAddCountryRegion(false);
		}
		if (e.target.id.startsWith("country")) {
			setAddCountryRegion(e.target.checked);
			setAddStateRegion(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...region };

		return addRegion(copy)
			.then((res) => res.json())
			.then((newregion) => navigate(`/region/${newregion.id}`));
	};

	useEffect(() => {
		const copy = { ...region };
		if (addCountryRegion) {
			copy.countryId = parseInt(countryId);
			copy.stateId = null;
		}
		if (addStateRegion) {
			copy.stateId = parseInt(stateId);
			copy.countryId = null;
		}
		setRegion(copy);
	}, [countryId, stateId]);

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Add a new region below</h3>
				<Stack gap={3}>
					<Stack direction='horizontal' gap={3}>
						<Form.Check
							inline
							label='Add state subregion'
							id='stateRegion'
							name='locations'
							type='radio'
							checked={addStateRegion}
							onChange={handleRadioChange}
						/>
						<Form.Check
							inline
							label='add country subregion'
							id='countryRegion'
							name='locations'
							type='radio'
							checked={addCountryRegion}
							onChange={handleRadioChange}
						/>
					</Stack>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							id='name'
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					{addCountryRegion && !addStateRegion ? (
						<CountryDropDown
							countryId={countryId}
							setCountryId={setCountryId}
						/>
					) : addStateRegion && !addCountryRegion ? (
						<Stack direction='horizontal' gap={3}>
							<CountryDropDown
								countryId={countryId}
								setCountryId={setCountryId}
							/>
							<StateDropDown
								stateId={stateId}
								setStateId={setStateId}
								countryId={countryId}
							/>
						</Stack>
					) : (
						""
					)}
					<Stack direction='horizontal' className='justify-content-end' gap={3}>
						<Button
							variant='outline-secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/region/`);
							}}
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
