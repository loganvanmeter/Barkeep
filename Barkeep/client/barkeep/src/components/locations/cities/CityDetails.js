import { useParams } from "react-router-dom";
import { getCityById } from "../../../managers/LocationsManager";
import { City } from "./City";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

export const CityDetails = () => {
	const { cityId } = useParams();
	const [city, setCity] = useState({});

	const getCity = () => {
		return getCityById(cityId).then((res) => setCity(res));
	};

	useEffect(() => {
		getCity();
	}, [cityId]);

	return (
		<Container>
			<City city={city} />
		</Container>
	);
};
