import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getAllCities } from "../../managers/LocationsManager";

export const CityDropDown = ({ countryId, stateId, cityId, setCityId }) => {
	const [cities, setCities] = useState([]);
	const [filteredCities, setFilteredCities] = useState([]);
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
		<Form.Group>
			<Form.Label>
				{window.location.pathname !== "/city" ? "Filter by city" : "Cities"}
			</Form.Label>
			<Form.Select
				aria-label='Default select example'
				value={cityId}
				onChange={handleChange}
			>
				<option value={0}>
					{window.location.pathname !== "/city/add" ? "All" : "Select city"}
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
	);
};
