import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComponentById } from "../../managers/ComponentManager";
import { Component } from "./Component";
import { Container } from "react-bootstrap";

export const ComponentDetails = () => {
	const { componentId } = useParams();
	const [component, setComponent] = useState({});

	const getComponent = () => {
		return getComponentById(componentId).then((res) => setComponent(res));
	};

	useEffect(() => {
		getComponent();
	}, [componentId]);

	return (
		<Container>
			<Component component={component} componentId={componentId} />
		</Container>
	);
};
