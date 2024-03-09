import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBarById } from "../../managers/BarManager";
import { BarAdminSideBar } from "../../nav/BarSideBar";

export const BarDashboard = () => {
	const [bar, setBar] = useState({});
	const { barId } = useParams();
	const getThisBar = () => {
		getBarById(barId).then((bar) => {
			setBar(bar);

			localStorage.setItem("bar", JSON.stringify(bar));
		});
	};

	useEffect(() => {
		getThisBar();
	}, [barId]);

	return (
		<>
			<BarAdminSideBar bar={bar} />
		</>
	);
};
