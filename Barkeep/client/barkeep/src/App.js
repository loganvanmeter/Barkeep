import "./App.css";
import { useEffect, useState } from "react";
import { SiteAdminView } from "./views/SiteAdminView";
import { Authorize } from "./authorization/Authorize";
import { SiteAdminSidebar } from "./nav/SiteAdminSidebar";
import { AccountAdminSideBar } from "./nav/AccountAdminSideBar";
import { AccountAdminView } from "./views/AccountAdminView";

const App = () => {
	const [isSiteAdminLoggedIn, setIsSiteAdminLoggedIn] = useState(true);
	const [isAccountAdminLoggedIn, setIsAccountAdminLoggedIn] = useState(true);

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
				<AccountAdminSideBar setIsLoggedIn={setIsAccountAdminLoggedIn} />
				<AccountAdminView />
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
