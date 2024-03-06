import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getAllRegions, getRegionById } from "../../managers/LocationsManager";

export const RegionDropDown = ({
	countryId,
	stateId,
	regionId,
	setRegionId,
}) => {
	const [regions, setRegions] = useState([]);
	const [filteredRegions, setFilteredRegions] = useState([]);
	const getRegions = () => {
		return getAllRegions().then((res) => setRegions(res));
	};

	const handleChange = (e) => {
		e.preventDefault();
		setRegionId(parseInt(e.target.value));
	};

	useEffect(() => {
		getRegions();
	}, []);

	useEffect(() => {
		setFilteredRegions(regions);
	}, [regions]);

	useEffect(() => {
		if (countryId && !stateId) {
			const matchedByCountry = regions.filter(
				(region) => region.countryId == countryId
			);
			setFilteredRegions(matchedByCountry);
		} else if (stateId && !countryId) {
			const matchedByState = regions.filter(
				(region) => region.stateId == stateId
			);
			setFilteredRegions(matchedByState);
		} else if (stateId && countryId) {
			const matchedByStateAndCountry = regions.filter(
				(region) =>
					region.stateId == stateId && region?.state?.countryId == countryId
			);
			setFilteredRegions(matchedByStateAndCountry);
		} else if (!countryId && !stateId) {
			setFilteredRegions(regions);
		}
	}, [countryId, stateId]);

	return (
		<Form.Group>
			<Form.Label>
				{window.location.pathname !== "/region"
					? "Filter by region"
					: "Regions"}
			</Form.Label>
			<Form.Select
				aria-label='Default select example'
				value={regionId}
				onChange={handleChange}
			>
				<option value={0}>
					{window.location.pathname !== "/city/add" ? "All" : "Select region"}
				</option>
				{filteredRegions.map((region) => {
					return (
						<option key={region.id} value={region.id}>
							{region.name}
						</option>
					);
				})}
			</Form.Select>
		</Form.Group>
	);
};
