import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCities } from "../../../managers/LocationsManager";
import { Button, Container, Stack } from "react-bootstrap";
import { Search } from "../../forms/Search";
import { CountryDropDown } from "../../forms/CountryDropDown";
import { StateDropDown } from "../../forms/StateDropDown";
import { RegionDropDown } from "../../forms/RegionDropDown";
import { CityList } from "./CityList";

export const CityContainer = () => {
	const [cities, setCities] = useState([]);
	const [filteredCities, setFilteredCities] = useState([]);
	const [countryId, setCountryId] = useState(0);
	const [stateId, setStateId] = useState(0);
	const [regionId, setRegionId] = useState(0);
	const [searchTerms, setSearchTerms] = useState("");
	const navigate = useNavigate();
	const getCities = () => {
		return getAllCities().then((res) => setCities(res));
	};

	const filterSearchResults = () => {
		const searchRegex = new RegExp(`${searchTerms}`, "i");
		if (searchTerms && !countryId && !stateId && !regionId) {
			const matchedbyName = cities.filter(
				(city) => city.name.search(searchRegex) >= 0
			);
			setFilteredCities(matchedbyName);
		} else if (!searchTerms && !countryId && !stateId && regionId) {
			const matchedbyRegion = cities.filter(
				(city) => city.regionId == regionId
			);
			setFilteredCities(matchedbyRegion);
		} else if (!searchTerms && !countryId && stateId && !regionId) {
			const matchedbyState = cities.filter((city) => city.stateId == stateId);
			setFilteredCities(matchedbyState);
		} else if (!searchTerms && countryId && !stateId && !regionId) {
			const matchedbyCountry = cities.filter(
				(city) => city.countryId == countryId
			);
			setFilteredCities(matchedbyCountry);
		} else if (searchTerms && countryId && !stateId && !regionId) {
			const matchedbyNameAndCountry = cities.filter(
				(city) =>
					city.name.search(searchRegex) >= 0 && city.countryId == countryId
			);
			setFilteredCities(matchedbyNameAndCountry);
		} else if (searchTerms && !countryId && stateId && !regionId) {
			const matchedbyNameAndState = cities.filter(
				(city) => city.name.search(searchRegex) >= 0 && city.stateId == stateId
			);
			setFilteredCities(matchedbyNameAndState);
		} else if (searchTerms && !countryId && !stateId && regionId) {
			const matchedbyNameAndRegion = cities.filter(
				(city) =>
					city.name.search(searchRegex) >= 0 && city.regionId == regionId
			);
			setFilteredCities(matchedbyNameAndRegion);
		} else if (searchTerms && countryId && stateId && !regionId) {
			const matchedbyNameAndCountryAndState = cities.filter(
				(city) =>
					city.name.search(searchRegex) >= 0 &&
					city.countryId == countryId &&
					city.stateId == stateId
			);
			setFilteredCities(matchedbyNameAndCountryAndState);
		} else if (searchTerms && countryId && !stateId && regionId) {
			const matchedbyNameAndCountryAndRegion = cities.filter(
				(city) =>
					city.name.search(searchRegex) >= 0 &&
					city.countryId == countryId &&
					city.regionId == regionId
			);
			setFilteredCities(matchedbyNameAndCountryAndRegion);
		} else if (searchTerms && !countryId && stateId && regionId) {
			const matchedbyNameAndStateAndRegion = cities.filter(
				(city) =>
					city.name.search(searchRegex) >= 0 &&
					city.stateId == stateId &&
					city.regionId == regionId
			);
			setFilteredCities(matchedbyNameAndStateAndRegion);
		} else if (searchTerms && countryId && stateId && regionId) {
			const matchedbyNameAndCountryAndStateAndRegion = cities.filter(
				(city) =>
					city.name.search(searchRegex) >= 0 &&
					city.countryId == countryId &&
					city.stateId == stateId &&
					city.regionId == regionId
			);
			setFilteredCities(matchedbyNameAndCountryAndStateAndRegion);
		} else if (!searchTerms && countryId && stateId && regionId) {
			const matchedbyCountryAndStateAndRegion = cities.filter(
				(city) =>
					city.countryId == countryId &&
					city.stateId == stateId &&
					city.regionId == regionId
			);
			setFilteredCities(matchedbyCountryAndStateAndRegion);
		} else if (!searchTerms && !countryId && stateId && regionId) {
			const matchedbyStateAndRegion = cities.filter(
				(city) => city.stateId == stateId && city.regionId == regionId
			);
			setFilteredCities(matchedbyStateAndRegion);
		} else if (!searchTerms && countryId && !stateId && regionId) {
			const matchedbyCountryAndRegion = cities.filter(
				(city) => city.countryId == countryId && city.regionId == regionId
			);
			setFilteredCities(matchedbyCountryAndRegion);
		} else if (!searchTerms && countryId && stateId && !regionId) {
			const matchedbyCountryAndState = cities.filter(
				(city) => city.countryId == countryId && city.stateId == stateId
			);
			setFilteredCities(matchedbyCountryAndState);
		} else if (!searchTerms && !countryId && !stateId && !regionId) {
			setFilteredCities(cities);
		}
	};

	useEffect(() => {
		getCities();
	}, []);

	useEffect(() => {
		setFilteredCities(cities);
	}, [cities]);

	useEffect(() => {
		filterSearchResults();
	}, [searchTerms, countryId, stateId, regionId]);

	return (
		<Container>
			<Stack gap={3}>
				<h2>Cities</h2>
				<Container className='d-flex justify-content-end'>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate("/city/add");
						}}
					>
						Add new city
					</Button>
				</Container>
				<Search setSearchTerms={setSearchTerms} />
				<Stack direction='horizontal' gap={3}>
					<Container>
						<CountryDropDown
							countryId={countryId}
							setCountryId={setCountryId}
							setStateId={setStateId}
							stateId={stateId}
							regionId={regionId}
							setRegionId={setRegionId}
						/>
					</Container>
					<Container>
						<StateDropDown
							stateId={stateId}
							setStateId={setStateId}
							countryId={countryId}
						/>
					</Container>
					<Container>
						<RegionDropDown
							countryId={countryId}
							stateId={stateId}
							regionId={regionId}
							setRegionId={setRegionId}
						/>
					</Container>
				</Stack>

				{filteredCities.length ? (
					<CityList filteredCities={filteredCities} />
				) : (
					<span
						style={{
							position: "fixed",
							left: 0,
							right: 0,
							top: "50%",
							marginTop: "-0.5rem",
							textAlign: "center",
						}}
					>
						No cities match your search. Please try again or add a new city.
					</span>
				)}
			</Stack>
		</Container>
	);
};
