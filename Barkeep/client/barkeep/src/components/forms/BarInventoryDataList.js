import { useEffect, useState } from "react";
import { getBarInventory } from "../../managers/InventoryManager";
import { Form } from "react-bootstrap";

export const BarInventoryDataList = ({ inventoryName, setInventoryName }) => {
	const [inventories, setInventories] = useState([]);

	const bar = JSON.parse(localStorage.getItem("bar"));

	const getInventories = () => {
		if (bar) {
			return getBarInventory(bar.id).then((inventories) =>
				setInventories(inventories)
			);
		}
	};

	useEffect(() => {
		getInventories();
	}, []);

	return (
		<>
			<Form.Control
				type='text'
				autoComplete='off'
				value={inventoryName}
				list='inventory'
				onChange={(e) => {
					e.preventDefault();
					setInventoryName(e.target.value);
				}}
			/>
			<datalist id='inventory'>
				{inventories.map((inventory) => {
					return (
						<option
							value={inventory?.component?.name}
							key={inventory.id}
						></option>
					);
				})}
			</datalist>
		</>
	);
};
