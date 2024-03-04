import { useParams } from "react-router-dom";
import { getStateById } from "../../../managers/LocationsManager";
import { State } from "./State";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

export const StateDetails = () => {
	const { stateId } = useParams();
	const [state, setState] = useState({});

	const getState = () => {
		return getStateById(stateId).then((res) => setState(res));
	};

	useEffect(() => {
		getState();
	}, [stateId]);

	return (
		<Container>
			<State state={state} />
		</Container>
	);
};
