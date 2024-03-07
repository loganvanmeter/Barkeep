import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBarById } from "../../managers/BarManager";

export const BarDashboard = () => {
	const [bar, setBar] = useState({});
	const { barId } = useParams();

	const getThisBar = () => {
		getBarById(barId).then((bar) => setBar(bar));
	};

	useEffect(() => {
		getThisBar();
	}, [barId]);

	return <div>{bar.name}</div>;
};
