import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getAllRegions, getRegionById } from "../../managers/LocationsManager";

export const RegionDropDown = ({
	countryId,
	setCountryId,
	stateId,
	setStateId,
	regionId,
	setRegionId,
}) => {
	const [regions, setRegions] = useState([]);
	const [region, setRegion] = useState({});
	const [filteredRegions, setFilteredRegions] = useState([]);
	const getRegions = () => {
		return getAllRegions().then((res) => setRegions(res));
	};
	const getAllCountryRegions = () => {
		return regions.filter(
			(region) =>
				(region.countryId && region.countryId == countryId) ||
				(region.stateId && region?.state?.countryId)
		);
	};

	const getAllStateRegions = () => {
		return region.filter(
			(region) => region.stateId && region.stateId == stateId
		);
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
			setFilteredStates(getAllCountryRegions());
		} else if (stateId) {
			setFilteredStates(getAllStateRegions());
		} else {
			setFilteredRegions(regions);
		}
	}, [countryId, stateId]);

	useEffect(() => {
		getRegionById(regionId).then((res) => setRegion(res));
	}, [regionId]);

	useEffect(() => {
		if (region.stateId) {
			setStateId(region.stateId);
		}
		if (region.setCountryId) {
			setCountryId(region.setCountryId);
		}
	}, [region]);

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
