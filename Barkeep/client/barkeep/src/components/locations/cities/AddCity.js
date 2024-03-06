import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { addCity } from "../../../managers/LocationsManager";
import { CountryDropDown } from "../../forms/CountryDropDown";
import { StateDropDown } from "../../forms/StateDropDown";
import { RegionDropDown } from "../../forms/RegionDropDown";

export const AddCity = () => {
	const [countryId, setCountryId] = useState(0);
	const [stateId, setStateId] = useState(0);
	const [regionId, setRegionId] = useState(0);
	const [city, setCity] = useState({
		name: null,
		countryId: null,
		stateId: null,
		regionId: null,
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...city };
		copy[e.target.id] = e.target.value;
		setCity(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...city };
		copy.countryId = countryId ? countryId : null;
		copy.stateId = stateId ? stateId : null;
		copy.regionId = regionId ? regionId : null;
		return addCity(copy)
			.then((res) => res.json())
			.then((newcity) => navigate(`/city/${newcity.id}`));
	};

	useEffect(() => {
		const copy = { ...city };
		copy.countryId = countryId;
		copy.stateId = stateId;
		copy.regionId = regionId;
		setCity(copy);
	}, [countryId, stateId, regionId]);

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Add a new city below</h3>
				<Stack gap={3}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							id='name'
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>

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
						<RegionDropDown
							setCountryId={setCountryId}
							setStateId={setStateId}
							regionId={regionId}
							setRegionId={setRegionId}
						/>
					</Stack>
					<Stack direction='horizontal' className='justify-content-end' gap={3}>
						<Button
							variant='outline-secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/city/`);
							}}
						>
							Cancel
						</Button>

						{city.name ? (
							<Button variant='primary' type='sumbit'>
								Save
							</Button>
						) : (
							""
						)}
					</Stack>
				</Stack>
			</Form>
		</Container>
	);
};
