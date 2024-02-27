import { useEffect } from "react";
import { useState } from "react";
import { getAllApprovedCategories } from "../../managers/CategoryManager";
import { Container, Table } from "react-bootstrap";
import { CategoryTableRow } from "./CategoryTableRow";
import { Search } from "../forms/Search";

export const CategoryContainer = () => {
	const [categories, setCategories] = useState([]);
	const [filteredCategories, setFilteredCategories] = useState([]);
	const [matchedByName, setMatchedByName] = useState([]);
	const [matchedByDescription, setMatchedByDescription] = useState([]);
	const [searchTerms, setSearchTerms] = useState("");

	const getApprovedCategories = () => {
		return getAllApprovedCategories().then((res) => setCategories(res));
	};

	const filterCategoriesByName = () => {
		const matchedCategories = categories.filter((category) => {
			if (category.name) {
				const splitCategoryName = category.name.split(" ");
				return splitCategoryName.find((name) => {
					return name.toLowerCase().startsWith(searchTerms.toLowerCase());
				});
			}
		});
		setMatchedByName(matchedCategories);
	};
	const filterCategoriesByDescription = () => {
		const matchedCategories = categories.filter((category) => {
			if (category.description) {
				const splitCategoryDescription = category.description.split(" ");
				return splitCategoryDescription.find((description) => {
					return description
						.toLowerCase()
						.startsWith(searchTerms.toLowerCase());
				});
			}
		});
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
		if (searchTerms) {
			searchCategories();
			matchedByName && matchedByDescription
				? setFilteredCategories([...matchedByName, ...filteredSearchResults()])
				: matchedByName && !matchedByDescription
				? setFilteredCategories(matchedByName)
				: matchedByDescription && !matchedByName
				? setFilteredCategories(matchedByDescription)
				: setFilteredCategories([]);
		} else if (!searchTerms) {
			setFilteredCategories(categories);
		}
	}, [searchTerms]);

	return (
		<>
			<Search setSearchTerms={setSearchTerms} />
			<Container>
				<Table striped>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{filteredCategories.map((category) => {
							return <CategoryTableRow category={category} key={category.id} />;
						})}
					</tbody>
				</Table>
			</Container>
		</>
	);
};
