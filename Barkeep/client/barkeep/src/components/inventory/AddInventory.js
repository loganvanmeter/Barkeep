import { useState } from "react";
import { Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const AddInventory = () => {
	const { barId } = useParams();
	const [inventory, setInventory] = useState({
		barId: null,
		componentId: null,
		quantity: 0,
		unitId: null,
		unitTypeId: null,
		costPerOunce: 0,
		markup: null,
	});
	const [componentName, setComponentName] = useState("");

	return <Stack gap={3}></Stack>;
};
