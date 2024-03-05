import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRegions } from "../../../managers/LocationsManager";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { Search } from "../../forms/Search";
import { CountryDropDown } from "../../forms/CountryDropDown";
import { StateDropDown } from "../../forms/StateDropDown";
import { RegionList } from "./RegionList";

export const RegionContainer = () => {
	const [regions, setRegions] = useState([]);
	const [filteredRegions, setFilteredRegions] = useState([]);
	const [countryId, setCountryId] = useState(0);
	const [stateId, setStateId] = useState(0);
	const [matchedByName, setMatchedByName] = useState([]);
	const [matchedbyCountry, setMatchedByCountry] = useState([]);
	const [matchedByState, setMatchedByState] = useState([]);
	const [searchTerms, setSearchTerms] = useState("");
	const [showStateRegion, setShowStateRegion] = useState(false);
	const [showCountryRegion, setShowCountryRegion] = useState(false);
	const navigate = useNavigate();
	const getRegions = () => {
		return getAllRegions().then((res) => setRegions(res));
	};

	const filterRegionByName = () => {
		const searchRegex = new RegExp(`${searchTerms}`, "i");
		const matchedRegion = regions.filter(
			(region) => region.name.search(searchRegex) >= 0
		);
		setMatchedByName(matchedRegion);
	};

	const filterRegionByCountry = () => {
		const matchedRegion = regions.filter(
			(region) => region.countryId && region.countryId == countryId
		);
		setMatchedByCountry(matchedRegion);
	};

	const filterRegionByState = () => {
		const matchedRegion = regions.filter(
			(region) => region.stateId && region.stateId == stateId
		);
		setMatchedByState(matchedRegion);
	};

	const searchRegions = () => {
		filterRegionByName();
		filterRegionByCountry();
		filterRegionByState();
	};

	const filterSearchResults = () => {
		if (!countryId && !stateId && searchTerms) {
			setFilteredRegions(matchedByName);
		} else if (countryId && !stateId && searchTerms) {
			const matchedByNameAndCountry = matchedByName.filter(
				(match) => match.countryId == countryId
			);
			setFilteredRegions(matchedByNameAndCountry);
		} else if (!countryId && stateId && searchTerms) {
			const matchedByNameAndState = matchedByName.filter(
				(match) => match.stateId == stateId
			);
			setFilteredRegions(matchedByNameAndState);
		} else if (countryId && !stateId && !searchTerms) {
			setFilteredRegions(matchedbyCountry);
		} else if (!countryId && stateId && !searchTerms) {
			setFilteredRegions(matchedByState);
		} else if (!countryId && !stateId && !searchTerms) {
			setFilteredRegions(regions);
		}
	};

	const handleChange = (e) => {
		if (e.target.id.startsWith("all") && e.target.checked) {
			setShowCountryRegion(false);
			setShowStateRegion(false);
		}
		if (e.target.id.startsWith("state")) {
			setShowStateRegion(e.target.checked);
			setShowCountryRegion(false);
		}
		if (e.target.id.startsWith("country")) {
			setShowCountryRegion(e.target.checked);
			setShowStateRegion(false);
		}
	};
	useEffect(() => {
		getRegions();
	}, []);

	useEffect(() => {
		setFilteredRegions(regions);
	}, [regions]);

	useEffect(() => {
		searchRegions();
	}, [searchTerms, countryId, stateId]);

	useEffect(() => {
		filterSearchResults();
	}, [matchedByName, matchedbyCountry, matchedByState]);

	useEffect(() => {
		if (showCountryRegion && !showStateRegion) {
			setFilteredRegions(regions.filter((region) => region.countryId));
		}
		if (!showCountryRegion && showStateRegion) {
			setFilteredRegions(regions.filter((region) => region.stateId));
		}
		if (!showCountryRegion && !showStateRegion) {
			setFilteredRegions(
				regions.filter((region) => region.stateId || region.countryId)
			);
		}
	}, [showStateRegion, showCountryRegion]);

	return (
		<Container>
			<Stack gap={3}>
				<h2>Regions</h2>
				<Container className='d-flex justify-content-between'>
					<Stack direction='horizontal'>
						<Form>
							<Form.Check
								inline
								label='All'
								id='all'
								name='locations'
								type='radio'
								checked={!showCountryRegion && !showStateRegion}
								onChange={handleChange}
							/>
							<Form.Check
								inline
								label='State Subregions'
								id='stateRegions'
								name='locations'
								type='radio'
								checked={showStateRegion}
								onChange={handleChange}
							/>
							<Form.Check
								inline
								label='Country Subregions'
								id='countryRegions'
								name='locations'
								type='radio'
								checked={showCountryRegion}
								onChange={handleChange}
							/>
						</Form>
					</Stack>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate("/region/add");
						}}
					>
						Add new region
					</Button>
				</Container>
				<Search setSearchTerms={setSearchTerms} />

				{showCountryRegion && !showStateRegion ? (
					<Container>
						<CountryDropDown
							countryId={countryId}
							setCountryId={setCountryId}
						/>
					</Container>
				) : !showCountryRegion && showStateRegion ? (
					<Container>
						<StateDropDown stateId={stateId} setStateId={setStateId} />
					</Container>
				) : (
					<Stack direction='horizontal' gap={3}>
						<Container>
							<CountryDropDown
								countryId={countryId}
								setCountryId={setCountryId}
							/>
						</Container>
						<Container>
							<StateDropDown
								stateId={stateId}
								setStateId={setStateId}
								countryId={countryId}
							/>
						</Container>
					</Stack>
				)}

				{filteredRegions.length ? (
					<RegionList filteredRegions={filteredRegions} />
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
						No regions match your search. Please try again or add a new region.
					</span>
				)}
			</Stack>
		</Container>
	);
};
