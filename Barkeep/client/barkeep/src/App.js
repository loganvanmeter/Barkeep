import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Router } from "react-router-dom";

export const App = () => {
	const [isSiteAdminLoggedIn, setIsSiteAdminLoggedIn] = useState(true);
	useEffect(() => {
		if (!localStorage.getItem("siteAdmin")) {
			setIsSiteAdminLoggedIn(false);
		}
	}, [isSiteAdminLoggedIn]);

	if (isSiteAdminLoggedIn) {
		return <Router></Router>;
	}
};
