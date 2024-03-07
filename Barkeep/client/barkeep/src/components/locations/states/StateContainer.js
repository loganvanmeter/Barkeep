import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStates } from "../../../managers/LocationsManager";
import { StateList } from "./StateList";
import { Button, Container, Stack } from "react-bootstrap";
import { Search } from "../../forms/Search";
import { CountryDropDown } from "../../forms/CountryDropDown";

export const StateContainer = () => {
	const urlPath = "state";
	const [states, setStates] = useState([]);
	const [filteredStates, setFilteredStates] = useState([]);
	const [countryId, setCountryId] = useState(0);
	const [matchedByName, setMatchedByName] = useState([]);
	const [matchedbyCountry, setMatchedByCountry] = useState([]);
	const [searchTerms, setSearchTerms] = useState("");
	const navigate = useNavigate();
	const getStates = () => {
		return getAllStates().then((res) => setStates(res));
	};

	const filterStateByName = () => {
		const searchRegex = new RegExp(`${searchTerms}`, "i");
		const matchedState = states.filter(
			(state) => state.name.search(searchRegex) >= 0
		);
		setMatchedByName(matchedState);
	};

	const filterStateByCountry = () => {
		const matchedState = states.filter((state) => state.countryId == countryId);
		setMatchedByCountry(matchedState);
	};

	const searchStates = () => {
		filterStateByName();
		filterStateByCountry();
	};

	const filterSearchResults = () => {
		if (!countryId && searchTerms) {
			setFilteredStates(matchedByName);
		} else if (countryId && searchTerms) {
			const matchedByNameAndCountry = matchedByName.filter(
				(match) => match.countryId == countryId
			);
			setFilteredStates(matchedByNameAndCountry);
		} else if (countryId && !searchTerms) {
			setFilteredStates(matchedbyCountry);
		} else if (!countryId && !searchTerms) {
			setFilteredStates(states);
		}
	};
	useEffect(() => {
		getStates();
	}, []);

	useEffect(() => {
		setFilteredStates(states);
	}, [states]);

	useEffect(() => {
		searchStates();
	}, [searchTerms, countryId]);

	useEffect(() => {
		filterSearchResults();
	}, [matchedByName, matchedbyCountry]);

	return (
		<Container>
			<Stack gap={3}>
				<h2>States</h2>
				<Container className='d-flex justify-content-end'>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate("/state/add");
						}}
					>
						Add new state
					</Button>
				</Container>
				<Search setSearchTerms={setSearchTerms} />
				<Container>
					<CountryDropDown
						countryId={countryId}
						setCountryId={setCountryId}
						urlPath={urlPath}
					/>
				</Container>
				{filteredStates.length ? (
					<StateList filteredStates={filteredStates} />
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
						No states match your search. Please try again or add a new state.
					</span>
				)}
			</Stack>
		</Container>
	);
};
