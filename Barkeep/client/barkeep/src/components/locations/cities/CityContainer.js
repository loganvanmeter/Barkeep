import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCities } from "../../../managers/LocationsManager";
import { Button, Container, Stack } from "react-bootstrap";
import { Search } from "../../forms/Search";
import { CountryDropDown } from "../../forms/CountryDropDown";
import { StateDropDown } from "../../forms/StateDropDown";
import { RegionDropDown } from "../../forms/RegionDropDown";

export const CityContainer = () => {
	const [cities, setCities] = useState([]);
	const [filteredCities, setFilteredCities] = useState([]);
	const [countryId, setCountryId] = useState(0);
	const [stateId, setStateId] = useState(0);
	const [regionId, setRegionId] = useState(0);
	const [matchedByName, setMatchedByName] = useState([]);
	const [matchedbyCountry, setMatchedByCountry] = useState([]);
	const [matchedByState, setMatchedByState] = useState([]);
	const [matchedByRegion, setMatchedByRegion] = useState([]);
	const [searchTerms, setSearchTerms] = useState("");
	const navigate = useNavigate();
	const getCities = () => {
		return getAllCities().then((res) => setCities(res));
	};

	const filterCitiesByName = () => {
		const searchRegex = new RegExp(`${searchTerms}`, "i");
		const matchedCities = cities.filter(
			(city) => city.name.search(searchRegex) >= 0
		);
		setMatchedByName(matchedCities);
	};

	const filterCitiesByCountry = () => {
		const matchedCities = cities.filter(
			(city) =>
				(city.countryId && city.countryId == countryId) ||
				(city.stateId && city?.state?.countryId == countryId)
		);
		setMatchedByCountry(matchedCities);
	};

	const filterCitiesByState = () => {
		const matchedCities = cities.filter(
			(city) => city.stateId && city.stateId == stateId
		);
		setMatchedByState(matchedCities);
	};

	const filterCitiesByRegion = () => {
		const matchedCities = cities.filter(
			(city) => city.regionId && city.regionId == regionId
		);
		setMatchedByRegion(matchedCities);
	};

	const searchCities = () => {
		filterCitiesByName();
		filterCitiesByCountry();
		filterCitiesByState();
		filterCitiesByRegion();
	};

	const filterSearchResults = () => {
		if (!countryId && !stateId && !regionId && searchTerms) {
			setFilteredCities(matchedByName);
		} else if (countryId && !stateId && !regionid && searchTerms) {
			const matchedByNameAndCountry = matchedByName.filter(
				(match) => match.countryId == countryId
			);
			setFilteredCities(matchedByNameAndCountry);
		} else if (!countryId && stateId && !regionId && searchTerms) {
			const matchedByNameAndState = matchedByName.filter(
				(match) => match.stateId == stateId
			);
			setFilteredCities(matchedByNameAndState);
		} else if (!countryId && !stateId && regionId && searchTerms) {
			const matchedByNameAndRegion = matchedByName.filter(
				(match) => match.regionId == regionId
			);
			setFilteredCities(matchedByNameAndRegion);
		} else if (countryId && !stateId && !regionId && !searchTerms) {
			setFilteredCities(matchedbyCountry);
		} else if (!countryId && stateId && !regionId && !searchTerms) {
			setFilteredCities(matchedByState);
		} else if (!countryId && !stateId && regionId && !searchTerms) {
			setFilteredCities(matchedByRegion);
		} else if (!countryId && !stateId && !regionId && !searchTerms) {
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
		searchCities();
	}, [searchTerms, countryId, stateId, cityId]);

	useEffect(() => {
		filterSearchResults();
	}, [matchedByName, matchedbyCountry, matchedByState, matchedByRegion]);

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
							setCountryId={setCountryId}
							stateId={stateId}
							setStateId={setStateId}
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
