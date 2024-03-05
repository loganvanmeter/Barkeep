import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducerById } from "../../managers/ProducerManager";
import { Producer } from "./Producer";
import { Container } from "react-bootstrap";

export const ProducerDetails = () => {
	const { producerId } = useParams();
	const [producer, setProducer] = useState({});

	const getProducer = () => {
		return getProducerById(producerId).then((res) => setProducer(res));
	};

	useEffect(() => {
		getProducer();
	}, [producerId]);

	return (
		<Container>
			<Producer producer={producer} />
		</Container>
	);
};
