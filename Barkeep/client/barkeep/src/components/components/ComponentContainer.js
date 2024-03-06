import { useEffect } from "react";
import { useState } from "react";
import { getAllComponents } from "../../managers/ComponentManager";
import { Search } from "../forms/Search";
import { ComponentList } from "./ComponentList";
import { Button, Container, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ComponentTypeDropDown } from "../forms/ComponentTypeDropDown";

export const ComponentContainer = () => {
	const [components, setComponents] = useState([]);
	const [filteredComponents, setFilteredComponents] = useState([]);
	const [matchedByName, setMatchedByName] = useState([]);
	const [matchedByType, setMatchedByType] = useState([]);
	const [componentTypeId, setComponentTypeId] = useState(0);
	const [searchTerms, setSearchTerms] = useState("");
	const navigate = useNavigate();
	const getComponents = () => {
		return getAllComponents().then((res) => setComponents(res));
	};

	const filterComponentsByName = () => {
		const searchRegex = new RegExp(`${searchTerms}`, "i");
		const matchedComponents = components.filter(
			(component) => component.name.search(searchRegex) >= 0
		);
		setMatchedByName(matchedComponents);
	};

	const filterComponentsByType = () => {
		const matchedComponents = components.filter(
			(component) => component.componentTypeId == componentTypeId
		);
		setMatchedByType(matchedComponents);
	};

	const searchComponents = () => {
		filterComponentsByName();

		filterComponentsByType();
	};

	const filterSearchResults = () => {
		if (!componentTypeId && searchTerms) {
			setFilteredComponents(matchedByName);
		} else if (componentTypeId && searchTerms) {
			const matchedByNameAndType = matchedByName.filter(
				(match) => match.componentTypeId == componentTypeId
			);
			setFilteredComponents(matchedByNameAndType);
		} else if (componentTypeId && !searchTerms) {
			setFilteredComponents(matchedByType);
		} else if (!componentTypeId && !searchTerms) {
			setFilteredComponents(components);
		}
	};

	useEffect(() => {
		getComponents();
	}, []);

	useEffect(() => {
		setFilteredComponents(components);
	}, [components]);

	useEffect(() => {
		searchComponents();
	}, [searchTerms, componentTypeId]);

	useEffect(() => {
		filterSearchResults();
	}, [matchedByName, matchedByType]);

	return (
		<Container>
			<Stack gap={3}>
				<h2>Components</h2>
				<Container className='d-flex justify-content-end'>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate("/component/add");
						}}
					>
						Add new component
					</Button>
				</Container>

				<Search setSearchTerms={setSearchTerms} />
				<Container>
					<ComponentTypeDropDown
						componentTypeId={componentTypeId}
						setComponentTypeId={setComponentTypeId}
					/>
				</Container>
				{filteredComponents.length ? (
					<ComponentList filteredComponents={filteredComponents} />
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
						No components match your search. Please try again or add a new
						component.
					</span>
				)}
			</Stack>
		</Container>
	);
};
