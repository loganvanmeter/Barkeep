import { useEffect } from "react";
import { useState } from "react";
import { getAllProducers } from "../../managers/ProducerManager";
import { Search } from "../forms/Search";
import { ProducerList } from "./ProducerList";
import { Button, Container, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ProducerContainer = () => {
	const [producers, setProducers] = useState([]);
	const [filteredProducers, setFilteredProducers] = useState([]);
	const [matchedByName, setMatchedByName] = useState([]);
	const [matchedByDescription, setMatchedByDescription] = useState([]);
	const [searchTerms, setSearchTerms] = useState("");
	const navigate = useNavigate();
	const getProducers = () => {
		return getAllProducers().then((res) => setProducers(res));
	};

	const filterProducersByName = () => {
		const searchRegex = new RegExp(`${searchTerms}`, "i");
		const matchedProducers = producers.filter(
			(producer) => producer.name.search(searchRegex) >= 0
		);
		setMatchedByName(matchedProducers);
	};
	const filterProducersByDescription = () => {
		const searchRegex = new RegExp(`${searchTerms}`, "i");
		const matchedProducers = producers.filter(
			(producer) =>
				producer.description && producer.description.search(searchRegex) >= 0
		);
		setMatchedByDescription(matchedProducers);
	};

	const searchProducers = () => {
		filterProducersByName();
		filterProducersByDescription();
	};

	const filteredSearchResults = () => {
		const differentProducers = matchedByDescription.filter(
			(matchedDescriptionProducer) => {
				return !matchedByName.find(
					(matchedNameProducer) =>
						matchedNameProducer.id === matchedDescriptionProducer.id
				);
			}
		);
		return differentProducers;
	};
	useEffect(() => {
		getProducers();
	}, []);

	useEffect(() => {
		setFilteredProducers(producers);
	}, [producers]);

	useEffect(() => {
		searchProducers();
	}, [searchTerms]);

	useEffect(() => {
		if (searchTerms) {
			setFilteredProducers([...matchedByName, ...filteredSearchResults()]);
		} else if (!searchTerms) {
			setFilteredProducers(producers);
		}
	}, [matchedByName, matchedByDescription]);

	return (
		<Container>
			<Stack gap={3}>
				<h2>Producers</h2>
				<Container className='d-flex justify-content-end'>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate("/producer/add");
						}}
					>
						Add new producer
					</Button>
				</Container>

				<Search setSearchTerms={setSearchTerms} />
				{filteredProducers.length ? (
					<ProducerList filteredProducers={filteredProducers} />
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
						No producers match your search. Please try again or add a new
						producer.
					</span>
				)}
			</Stack>
		</Container>
	);
};
