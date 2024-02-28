import { useParams } from "react-router-dom";
import { getVarietalById } from "../../managers/VarietalManager";
import { Varietal } from "./Varietal";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

export const VarietalDetails = () => {
	const { varietalId } = useParams();
	const [varietal, setVarietal] = useState({});

	const getVarietal = () => {
		return getVarietalById(varietalId).then((res) => setVarietal(res));
	};

	useEffect(() => {
		getVarietal();
	}, [varietalId]);

	return (
		<Container>
			<Varietal varietal={varietal} />
		</Container>
	);
};
