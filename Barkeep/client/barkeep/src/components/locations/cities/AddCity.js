import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { addCity } from "../../../managers/LocationsManager";
import { CountryDropDown } from "../../forms/CountryDropDown";
import { StateDropDown } from "../../forms/StateDropDown";
import { RegionDropDown } from "../../forms/RegionDropDown";

export const AddCity = ({
	setShow,
	setCities,
	getAllCities,
	setComponentCountryId,
	setComponentStateId,
	setComponentCityId,
	setComponentRegionId,
}) => {
	const urlPath = "city";
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

	const handleCancel = (e) => {
		e.preventDefault();
		if (window.location.pathname !== `/city/add`) {
			setShow(false);
		} else {
			navigate(`/city`);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...city };
		copy.countryId = countryId ? countryId : null;
		copy.stateId = stateId ? stateId : null;
		copy.regionId = regionId ? regionId : null;
		return addCity(copy)
			.then((res) => res.json())
			.then((newCity) => {
				if (window.location.pathname !== `/city/add`) {
					return getAllCities()
						.then((citys) => setCities(citys))
						.then(() => setComponentCityId(parseInt(newCity.id)))
						.then(() => {
							if (newCity.regionId) {
								setComponentRegionId(newCity.regionId);
							}
							if (newCity.stateId) {
								setComponentStateId(newCity.stateId);
							}
							if (newCity.countryId) {
								setComponentCountryId(newCity.countryId);
							}
							setShow(false);
						});
				} else {
					navigate(`/city/${newCity.id}`);
				}
			});
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

					<Stack direction='horizontal' gap={3} className='flex-wrap'>
						<CountryDropDown
							countryId={countryId}
							setCountryId={setCountryId}
							setStateId={setStateId}
							setRegionId={setRegionId}
							urlPath={urlPath}
						/>
						<StateDropDown
							stateId={stateId}
							setStateId={setStateId}
							countryId={countryId}
							regionId={regionId}
							setRegionId={setRegionId}
							urlPath={urlPath}
						/>
						<RegionDropDown
							countryId={countryId}
							setComponentCountryId={setCountryId}
							stateId={stateId}
							setComponentStateId={setStateId}
							regionId={regionId}
							setRegionId={setRegionId}
							setComponentRegionId={setRegionId}
							urlPath={urlPath}
						/>
					</Stack>
					<Stack direction='horizontal' className='justify-content-end' gap={3}>
						<Button
							variant='outline-secondary'
							onClick={(e) => handleCancel(e)}
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
