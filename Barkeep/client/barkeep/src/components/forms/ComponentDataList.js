import { useEffect } from "react";
import {
	getAllAvailableBarComponents,
	getAllComponents,
} from "../../managers/ComponentManager";

export const ComponentDataList = () => {
	const [components, setComponents] = useState([]);

	const bar = JSON.parse(localStorage.getItem("bar"));

	const getComponents = () => {
		if (bar) {
			return getAllAvailableBarComponents(bar.id).then((components) =>
				setComponents(components)
			);
		} else {
			return getAllComponents().then((components) => setComponents(components));
		}
	};

	useEffect(() => {
		getComponents();
	}, []);

	return (
		<datalist id='component'>
			{components.map((component) => {
				return <option value={component.name}></option>;
			})}
		</datalist>
	);
};
