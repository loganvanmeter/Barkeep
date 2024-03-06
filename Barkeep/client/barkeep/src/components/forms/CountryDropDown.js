import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getAllCountries } from "../../managers/LocationsManager";

export const CountryDropDown = ({
	countryId,
	setCountryId,
	setStateId,
	stateId,
	regionId,
	setRegionId,
}) => {
	const [countries, setCountries] = useState([]);

	const getCountries = () => {
		return getAllCountries().then((res) => setCountries(res));
	};

	const handleChange = (e) => {
		e.preventDefault();
		setCountryId(parseInt(e.target.value));
		if (stateId) {
			setStateId(0);
		}
		if (regionId) {
			setRegionId(0);
		}
	};

	useEffect(() => {
		getCountries();
	}, []);

	return (
		<Form.Group>
			<Form.Label>
				{window.location.pathname !== "/country"
					? "Filter by country"
					: "Country"}
			</Form.Label>
			<Form.Select
				aria-label='Default select example'
				value={countryId}
				onChange={handleChange}
				className='mh-50'
			>
				<option value={0}>
					{window.location.pathname !== "/country" ? "All" : "Select country"}
				</option>
				{countries.map((country) => {
					return (
						<option key={country.id} value={country.id}>
							{country.name}
						</option>
					);
				})}
			</Form.Select>
		</Form.Group>
	);
};
