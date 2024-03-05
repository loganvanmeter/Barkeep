import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImporterById } from "../../managers/ImporterManager";
import { Importer } from "./Importer";
import { Container } from "react-bootstrap";

export const ImporterDetails = () => {
	const { importerId } = useParams();
	const [importer, setImporter] = useState({});

	const getImporter = () => {
		return getImporterById(importerId).then((res) => setImporter(res));
	};

	useEffect(() => {
		getImporter();
	}, [importerId]);

	return (
		<Container>
			<Importer importer={importer} />
		</Container>
	);
};
