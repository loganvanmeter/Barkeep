import { useEffect } from "react";
import { useState } from "react";
import { Search } from "../forms/Search";
import { InventoryList } from "./InventoryList";
import { Button, Container, Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getBarInventory, getQuantity } from "../../managers/InventoryManager";
import { BarAdminSideBar } from "../../nav/BarSideBar";

export const InventoryContainer = () => {
	const [inventories, setInventories] = useState([]);
	const [filteredInventories, setFilteredInventories] = useState([]);
	const [matchedByName, setMatchedByName] = useState();
	const [searchTerms, setSearchTerms] = useState("");
	const navigate = useNavigate();
	const { barId } = useParams();
	const bar = JSON.parse(localStorage.getItem("bar"));
	const getBarInventories = () => {
		return getBarInventory(barId).then((res) => {
			setInventories(res);
		});
	};

	const filterInventoriesByName = () => {
		const searchRegex = new RegExp(`${searchTerms}`, "i");
		const matchedInventories = inventories.filter(
			(inventory) => inventory?.component?.name.search(searchRegex) >= 0
		);
		setMatchedByName(matchedInventories);
	};

	const searchInventories = () => {
		filterInventoriesByName();
	};

	const filterSearchResults = () => {
		if (searchTerms) {
			setFilteredInventories(matchedByName);
		} else if (!searchTerms) {
			setFilteredInventories(inventories);
		}
	};

	useEffect(() => {
		getBarInventories();
	}, [barId]);

	useEffect(() => {
		setFilteredInventories(inventories);
	}, [inventories]);

	useEffect(() => {
		searchInventories();
	}, [searchTerms]);

	useEffect(() => {
		filterSearchResults();
	}, [matchedByName]);

	return (
		<>
			<BarAdminSideBar bar={bar} />
			<Container>
				<Stack gap={3}>
					<h2>Inventories</h2>
					<Container className='d-flex justify-content-end'>
						<Button
							variant='primary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/bar/${barId}/inventory/add`);
							}}
						>
							Add new inventory
						</Button>
					</Container>

					<Search setSearchTerms={setSearchTerms} />
					{!inventories.length ? (
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
							No current bar inventory. Add new inventory to get started.
						</span>
					) : filteredInventories.length ? (
						<InventoryList filteredInventories={filteredInventories} />
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
							No inventory matches your search. Please try again or add a new
							inventory.
						</span>
					)}
				</Stack>
			</Container>
		</>
	);
};
