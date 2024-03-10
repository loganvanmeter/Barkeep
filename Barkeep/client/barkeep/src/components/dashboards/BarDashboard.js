import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBarById } from "../../managers/BarManager";
import { BarAdminSideBar } from "../../nav/BarSideBar";
import { getBarUserByUserIdAndBarId } from "../../managers/BarUserManager";

export const BarDashboard = () => {
	const [bar, setBar] = useState({});
	const { barId } = useParams();
	const accountAdmin = JSON.parse(localStorage.getItem("accountAdmin"));
	const getThisBar = () => {
		getBarById(barId)
			.then((bar) => {
				setBar(bar);
				localStorage.setItem("bar", JSON.stringify(bar));
			})
			.then(() => {
				if (accountAdmin) {
					return getBarUserByUserIdAndBarId(accountAdmin.id, barId).then(
						(barUser) =>
							localStorage.setItem("barUser", JSON.stringify(barUser))
					);
				}
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
