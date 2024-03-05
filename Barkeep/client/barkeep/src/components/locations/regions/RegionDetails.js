import { useParams } from "react-router-dom";
import { getRegionById } from "../../../managers/LocationsManager";
import { Region } from "./Region";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

export const RegionDetails = () => {
	const { regionId } = useParams();
	const [region, setRegion] = useState({});

	const getRegion = () => {
		return getRegionById(regionId).then((res) => setRegion(res));
	};

	useEffect(() => {
		getRegion();
	}, [regionId]);

	return (
		<Container>
			<Region region={region} />
		</Container>
	);
};
