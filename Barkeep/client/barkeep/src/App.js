import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { SiteAdminView } from "./views/SiteAdminView";
import { Authorize } from "./authorization/Authorize";

const App = () => {
	const [isSiteAdminLoggedIn, setIsSiteAdminLoggedIn] = useState(true);
	useEffect(() => {
		if (!localStorage.getItem("siteAdmin")) {
			setIsSiteAdminLoggedIn(false);
		}
	}, [isSiteAdminLoggedIn]);

	if (isSiteAdminLoggedIn) {
		return <SiteAdminView />;
	} else {
		return <Authorize setIsSiteAdminLoggedIn={setIsSiteAdminLoggedIn} />;
	}
};

export default App;
