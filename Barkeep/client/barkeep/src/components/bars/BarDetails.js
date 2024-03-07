import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBarById } from "../../managers/BarManager";
import { Bar } from "./Bar";
import { Container } from "react-bootstrap";

export const BarDetails = () => {
	const { barId } = useParams();
	const [bar, setBar] = useState({});

	const getBar = () => {
		return getBarById(barId).then((res) => setBar(res));
	};

	useEffect(() => {
		getBar();
	}, [barId]);

	return (
		<Container>
			<Bar bar={bar} />
		</Container>
	);
};
