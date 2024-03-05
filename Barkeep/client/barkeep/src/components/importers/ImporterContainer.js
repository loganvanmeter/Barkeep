import { useEffect } from "react";
import { useState } from "react";
import { getAllImporters } from "../../managers/ImporterManager";
import { Search } from "../forms/Search";
import { ImporterList } from "./ImporterList";
import { Button, Container, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ImporterContainer = () => {
	const [importers, setImporters] = useState([]);
	const [filteredImporters, setFilteredImporters] = useState([]);
	const [matchedByName, setMatchedByName] = useState([]);
	const [matchedByDescription, setMatchedByDescription] = useState([]);
	const [searchTerms, setSearchTerms] = useState("");
	const navigate = useNavigate();
	const getImporters = () => {
		return getAllImporters().then((res) => setImporters(res));
	};

	const filterImportersByName = () => {
		const searchRegex = new RegExp(`${searchTerms}`, "i");
		const matchedImporters = importers.filter(
			(importer) => importer.name.search(searchRegex) >= 0
		);
		setMatchedByName(matchedImporters);
	};
	const filterImportersByDescription = () => {
		const searchRegex = new RegExp(`${searchTerms}`, "i");
		const matchedImporters = importers.filter(
			(importer) =>
				importer.description && importer.description.search(searchRegex) >= 0
		);
		setMatchedByDescription(matchedImporters);
	};

	const searchImporters = () => {
		filterImportersByName();
		filterImportersByDescription();
	};

	const filteredSearchResults = () => {
		const differentImporters = matchedByDescription.filter(
			(matchedDescriptionImporter) => {
				return !matchedByName.find(
					(matchedNameImporter) =>
						matchedNameImporter.id === matchedDescriptionImporter.id
				);
			}
		);
		return differentImporters;
	};
	useEffect(() => {
		getImporters();
	}, []);

	useEffect(() => {
		setFilteredImporters(importers);
	}, [importers]);

	useEffect(() => {
		searchImporters();
	}, [searchTerms]);

	useEffect(() => {
		if (searchTerms) {
			setFilteredImporters([...matchedByName, ...filteredSearchResults()]);
		} else if (!searchTerms) {
			setFilteredImporters(importers);
		}
	}, [matchedByName, matchedByDescription]);

	return (
		<Container>
			<Stack gap={3}>
				<h2>Importers</h2>
				<Container className='d-flex justify-content-end'>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate("/importer/add");
						}}
					>
						Add new importer
					</Button>
				</Container>

				<Search setSearchTerms={setSearchTerms} />
				{filteredImporters.length ? (
					<ImporterList filteredImporters={filteredImporters} />
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
						No importers match your search. Please try again or add a new
						importer.
					</span>
				)}
			</Stack>
		</Container>
	);
};
