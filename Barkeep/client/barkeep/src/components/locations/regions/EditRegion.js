import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { CountryDropDown } from "../../forms/CountryDropDown";
import {
	getRegionById,
	updateRegion,
} from "../../../managers/LocationsManager";
import { StateDropDown } from "../../forms/StateDropDown";

export const EditRegion = () => {
	const { regionId } = useParams();
	const [countryId, setCountryId] = useState(0);
	const [stateId, setStateId] = useState(0);
	const [addStateRegion, setAddStateRegion] = useState(false);
	const [addCountryRegion, setAddCountryRegion] = useState(false);
	const [region, setRegion] = useState({});

	const navigate = useNavigate();

	const getRegion = () => {
		return getRegionById(regionId).then((res) => setRegion(res));
	};

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
		return updateRegion(copy).then(() => navigate(`/region/${region.id}`));
	};

	useEffect(() => {
		getRegion();
	}, [regionId]);

	useEffect(() => {
		if (region.stateId) {
			setAddStateRegion(true);
			setStateId(region.stateId);
		}
		if (region.countryId) {
			setAddCountryRegion(true);
			setCountryId(region.countryId);
		}
	}, [region]);

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
							label='Save as state subregion'
							id='stateRegion'
							name='locations'
							type='radio'
							checked={addStateRegion}
							onChange={handleRadioChange}
						/>
						<Form.Check
							inline
							label='Save as country subregion'
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
							value={region.name}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					{addCountryRegion && !addStateRegion ? (
						<CountryDropDown
							countryId={region.countryId}
							setCountryId={setCountryId}
						/>
					) : addStateRegion && !addCountryRegion ? (
						<Stack direction='horizontal' gap={3}>
							<CountryDropDown
								countryId={region?.state?.countryId}
								setCountryId={setCountryId}
							/>
							<StateDropDown
								stateId={region.stateId}
								setStateId={setStateId}
								countryId={countryId}
							/>
						</Stack>
					) : (
						""
					)}
					<Stack direction='horizontal' className='justify-content-between'>
						<Link to='/region'>Back to list</Link>
						<Stack direction='horizontal' gap={3}>
							<Button
								variant='outline-secondary'
								onClick={(e) => {
									e.preventDefault();
									navigate(`/region/${region.id}`);
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
