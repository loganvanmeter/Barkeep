import { useEffect } from "react";
import { useState } from "react";
import { getAllCountries } from "../../../managers/LocationsManager";
import { Search } from "../forms/Search";
import { CountryList } from "./CountryList";
import { Container, Stack } from "react-bootstrap";

export const CountryContainer = () => {
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [matchedByName, setMatchedByName] = useState([]);
	const [searchTerms, setSearchTerms] = useState("");
	const getCountries = () => {
		return getAllCountries().then((res) => setCountries(res));
	};

	const filterCountriesByName = () => {
		const searchRegex = new RegExp(`${searchTerms}`, "i");
		const matchedCountries = countries.filter(
			(importer) => importer.name.search(searchRegex) >= 0
		);
		setMatchedByName(matchedCountries);
	};

	useEffect(() => {
		getCountries();
	}, []);

	useEffect(() => {
		setFilteredCountries(countries);
	}, [countries]);

	useEffect(() => {
		filterCountriesByName();
	}, [searchTerms]);

	useEffect(() => {
		if (searchTerms) {
			setFilteredCountries([...matchedByName]);
		} else if (!searchTerms) {
			setFilteredCountries(countries);
		}
	}, [matchedByName]);

	return (
		<Container>
			<Stack gap={3}>
				<h2>Countries</h2>

				<Search setSearchTerms={setSearchTerms} />
				{filteredCountries.length ? (
					<CountryList filteredCountries={filteredCountries} />
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
						No countries match your search. Please try again or add a new
						importer.
					</span>
				)}
			</Stack>
		</Container>
	);
};
