import { useEffect } from "react";
import { useState } from "react";
import { getAllApprovedCategories } from "../../managers/CategoryManager";
import { Search } from "../forms/Search";
import { CategoryList } from "./CategoryList";
import { Button, Container, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const CategoryContainer = () => {
	const [categories, setCategories] = useState([]);
	const [filteredCategories, setFilteredCategories] = useState([]);
	const [matchedByName, setMatchedByName] = useState([]);
	const [matchedByDescription, setMatchedByDescription] = useState([]);
	const [searchTerms, setSearchTerms] = useState("");
	const navigate = useNavigate();
	const getApprovedCategories = () => {
		return getAllApprovedCategories().then((res) => setCategories(res));
	};

	const filterCategoriesByName = () => {
		const searchRegex = new RegExp(`${searchTerms}`, "i");
		const matchedCategories = categories.filter(
			(category) => category.name.search(searchRegex) >= 0
		);
		setMatchedByName(matchedCategories);
	};
	const filterCategoriesByDescription = () => {
		const searchRegex = new RegExp(`${searchTerms}`, "i");
		const matchedCategories = categories.filter(
			(category) =>
				category.description && category.description.search(searchRegex) >= 0
		);
		setMatchedByDescription(matchedCategories);
	};

	const searchCategories = () => {
		filterCategoriesByName();
		filterCategoriesByDescription();
	};

	const filteredSearchResults = () => {
		const differentCategories = matchedByDescription.filter(
			(matchedDescriptionCategory) => {
				return !matchedByName.find(
					(matchedNameCategory) =>
						matchedNameCategory.id === matchedDescriptionCategory.id
				);
			}
		);
		return differentCategories;
	};
	useEffect(() => {
		getApprovedCategories();
	}, []);

	useEffect(() => {
		setFilteredCategories(categories);
	}, [categories]);

	useEffect(() => {
		searchCategories();
	}, [searchTerms]);

	useEffect(() => {
		if (searchTerms) {
			setFilteredCategories([...matchedByName, ...filteredSearchResults()]);
		} else if (!searchTerms) {
			setFilteredCategories(categories);
		}
	}, [matchedByName, matchedByDescription]);

	return (
		<Stack gap={3}>
			<Container className='d-flex justify-content-end'>
				<Button
					variant='primary'
					onClick={(e) => {
						e.preventDefault();
						navigate("/category/add");
					}}
				>
					Add new category
				</Button>
			</Container>

			<Search setSearchTerms={setSearchTerms} />
			{filteredCategories.length ? (
				<CategoryList filteredCategories={filteredCategories} />
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
					No categories match your search. Please try again or add a new
					category.
				</span>
			)}
		</Stack>
	);
};
