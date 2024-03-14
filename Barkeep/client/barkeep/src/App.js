import "./App.css";
import { useEffect, useState } from "react";
import { SiteAdminView } from "./views/SiteAdminView";
import { Authorize } from "./authorization/Authorize";
import { SiteAdminSidebar } from "./nav/SiteAdminSidebar";
import { AccountAdminSideBar } from "./nav/AccountAdminSideBar";
import { AccountAdminView } from "./views/AccountAdminView";
import { AccountDashboard } from "./components/dashboards/AccountDashboard";

const App = () => {
	const [isSiteAdminLoggedIn, setIsSiteAdminLoggedIn] = useState(true);
	const [isAccountAdminLoggedIn, setIsAccountAdminLoggedIn] = useState(true);
	const [isViewingBar, setIsViewingBar] = useState(true);
	const bar = JSON.parse(localStorage.getItem("bar"));
	useEffect(() => {
		if (!localStorage.getItem("siteAdmin")) {
			setIsSiteAdminLoggedIn(false);
		}
	}, [isSiteAdminLoggedIn]);

	useEffect(() => {
		if (!localStorage.getItem("accountAdmin")) {
			setIsAccountAdminLoggedIn(false);
		}
	}, [isAccountAdminLoggedIn]);
	useEffect(() => {
		if (!localStorage.getItem("bar")) {
			setIsViewingBar(false);
		}
	}, [isViewingBar]);

	if (isSiteAdminLoggedIn && !isAccountAdminLoggedIn) {
		return (
			<>
				<SiteAdminSidebar setIsLoggedIn={setIsSiteAdminLoggedIn} />
				<SiteAdminView />
			</>
		);
	} else if (isAccountAdminLoggedIn && !isSiteAdminLoggedIn) {
		return (
			<>
				<AccountAdminView
					setIsLoggedIn={setIsAccountAdminLoggedIn}
					setIsViewingBar={setIsViewingBar}
				/>
			</>
		);
	} else if (!isAccountAdminLoggedIn && !isSiteAdminLoggedIn) {
		return (
			<Authorize
				setIsSiteAdminLoggedIn={setIsSiteAdminLoggedIn}
				setIsAccountAdminLoggedIn={setIsAccountAdminLoggedIn}
			/>
		);
	}
};

export default App;
