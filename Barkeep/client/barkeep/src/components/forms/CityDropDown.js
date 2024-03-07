import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { getAllCities } from "../../managers/LocationsManager";
import { AddCity } from "../locations/cities/AddCity";

export const CityDropDown = ({
	countryId,
	setCountryId,
	stateId,
	setStateId,
	regionId,
	setRegionId,
	cityId,
	setCityId,
	urlPath,
}) => {
	const [cities, setCities] = useState([]);
	const [filteredCities, setFilteredCities] = useState([]);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const getCities = () => {
		return getAllCities().then((res) => setCities(res));
	};

	const handleChange = (e) => {
		e.preventDefault();
		setCityId(parseInt(e.target.value));
	};

	useEffect(() => {
		getCities();
	}, []);

	useEffect(() => {
		setFilteredCities(cities);
	}, [cities]);

	useEffect(() => {
		if (countryId && !stateId) {
			const matchedByCountry = cities.filter(
				(city) => city.countryId == countryId
			);
			setFilteredCities(matchedByCountry);
		} else if (stateId && !countryId) {
			const matchedByState = cities.filter((city) => city.stateId == stateId);
			setFilteredCities(matchedByState);
		} else if (stateId && countryId) {
			const matchedByStateAndCountry = cities.filter(
				(city) => city.stateId == stateId && city?.state?.countryId == countryId
			);
			setFilteredCities(matchedByStateAndCountry);
		} else if (!countryId && !stateId) {
			setFilteredCities(cities);
		}
	}, [countryId, stateId]);

	return (
		<Stack>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					<AddCity
						setShow={setShow}
						setComponentCountryId={setCountryId}
						setComponentStateId={setStateId}
						setComponentRegionId={setRegionId}
						setCities={setCities}
						setComponentCityId={setCityId}
						getAllCities={getAllCities}
					/>
				</Modal.Body>
			</Modal>
			<Stack direction='horizontal' gap={2} className='align-items-end'>
				<Stack>
					<Form.Group>
						<Form.Label>
							{window.location.pathname === `/${urlPath}`
								? "Filter by city"
								: "City"}
						</Form.Label>
						<Form.Select
							aria-label='Default select example'
							value={cityId}
							onChange={handleChange}
						>
							<option value={0}>
								{window.location.pathname === `/${urlPath}`
									? "All"
									: "Select city"}
							</option>
							{filteredCities.map((city) => {
								return (
									<option key={city.id} value={city.id}>
										{city.name}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Stack>
				<div className='pb-2'>{` OR `}</div>

				<Button variant='outline-primary' onClick={handleShow}>
					add new city
				</Button>
			</Stack>
		</Stack>
	);
};
