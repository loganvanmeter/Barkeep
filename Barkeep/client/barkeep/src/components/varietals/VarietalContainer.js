import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllVarietals } from "../../managers/VarietalManager";
import { VarietalList } from "./VarietalList";
import { Button, Container, Stack } from "react-bootstrap";
import { Search } from "../forms/Search";
import { VarietalTypeDropDown } from "../forms/VarietalTypeDropDown";

export const VarietalContainer = () => {
	const [varietals, setVarietals] = useState([]);
	const [filteredVarietals, setFilteredVarietals] = useState([]);
	const [varietalTypeId, setVarietalTypeId] = useState(0);
	const [matchedByName, setMatchedByName] = useState([]);
	const [matchedByDescription, setMatchedByDescription] = useState([]);
	const [matchedbyVarietalType, setMatchedByVarietalType] = useState([]);
	const [searchTerms, setSearchTerms] = useState("");
	const navigate = useNavigate();
	const getVarietals = () => {
		return getAllVarietals().then((res) => setVarietals(res));
	};

	const filterVarietalByName = () => {
		const searchRegex = new RegExp(`${searchTerms}`, "i");
		const matchedVarietal = varietals.filter(
			(varietal) => varietal.name.search(searchRegex) >= 0
		);
		setMatchedByName(matchedVarietal);
	};
	const filterVarietalByDescription = () => {
		const searchRegex = new RegExp(`${searchTerms}`, "i");
		const matchedVarietal = varietals.filter(
			(varietal) =>
				varietal.description && varietal.description.search(searchRegex) >= 0
		);
		setMatchedByDescription(matchedVarietal);
	};

	const filterVarietalByVarietalType = () => {
		const matchedVarietal = varietals.filter(
			(varietal) => varietal.varietalTypeId == varietalTypeId
		);
		setMatchedByVarietalType(matchedVarietal);
	};

	const searchVarietals = () => {
		filterVarietalByName();
		filterVarietalByDescription();
		filterVarietalByVarietalType();
	};

	const filterSearchResults = () => {
		if (!varietalTypeId && searchTerms) {
			const differentVarietals = matchedByDescription.filter(
				(matchedDescriptionVarietal) => {
					return !matchedByName.find(
						(matchedNameVarietal) =>
							matchedNameVarietal.id === matchedDescriptionVarietal.id
					);
				}
			);
			setFilteredVarietals([...matchedByName, ...differentVarietals]);
		} else if (varietalTypeId && searchTerms) {
			const matchedByNameAndVarietalType = matchedByName.filter(
				(match) => match.varietalTypeId == varietalTypeId
			);
			const matchedByDescriptionAndVarietalType = matchedByDescription.filter(
				(match) => match.varietalTypeId == varietalTypeId
			);
			const differentVarietals = matchedByDescriptionAndVarietalType.filter(
				(matchedDescriptionVarietal) => {
					return !matchedByNameAndVarietalType.find(
						(matchedNameVarietal) =>
							matchedNameVarietal.id === matchedDescriptionVarietal.id
					);
				}
			);
			setFilteredVarietals([
				...matchedByNameAndVarietalType,
				...differentVarietals,
			]);
		} else if (varietalTypeId && !searchTerms) {
			setFilteredVarietals(matchedbyVarietalType);
		} else if (!varietalTypeId && !searchTerms) {
			setFilteredVarietals(varietals);
		}
	};
	useEffect(() => {
		getVarietals();
	}, []);

	useEffect(() => {
		setFilteredVarietals(varietals);
	}, [varietals]);

	useEffect(() => {
		searchVarietals();
	}, [searchTerms, varietalTypeId]);

	useEffect(() => {
		filterSearchResults();
	}, [matchedByName, matchedByDescription, matchedbyVarietalType]);

	return (
		<Container>
			<Stack gap={3}>
				<h2>Varietals</h2>
				<Container className='d-flex justify-content-end'>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate("/varietal/add");
						}}
					>
						Add new varietal
					</Button>
				</Container>
				<Search setSearchTerms={setSearchTerms} />
				<Container>
					<VarietalTypeDropDown
						varietalTypeId={varietalTypeId}
						setVarietalTypeId={setVarietalTypeId}
					/>
				</Container>
				{filteredVarietals.length ? (
					<VarietalList filteredVarietals={filteredVarietals} />
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
						No varietals match your search. Please try again or add a new
						varietal.
					</span>
				)}
			</Stack>
		</Container>
	);
};
