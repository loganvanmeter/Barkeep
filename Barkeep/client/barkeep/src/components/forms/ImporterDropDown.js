import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getAllImporters } from "../../managers/ImporterManager";

export const ImporterDropDown = ({ importerId, setImporterId }) => {
	const [importers, setImporters] = useState([]);

	const getImporters = () => {
		return getAllImporters().then((res) => setImporters(res));
	};

	const handleChange = (e) => {
		e.preventDefault();
		setImporterId(parseInt(e.target.value));
	};

	useEffect(() => {
		getImporters();
	}, []);

	return (
		<Form.Group>
			<Form.Label>
				{window.location.pathname === "/importer"
					? "Filter by importer"
					: "Importer"}
			</Form.Label>
			<Form.Select
				aria-label='Default select example'
				value={importerId}
				onChange={handleChange}
			>
				<option value={0}>
					{window.location.pathname === "/importer" ? "All" : "Select importer"}
				</option>
				{importers.map((importer) => {
					return (
						<option key={importer.id} value={importer.id}>
							{importer.name}
						</option>
					);
				})}
			</Form.Select>
		</Form.Group>
	);
};
