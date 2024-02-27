import { Route, Routes } from "react-router-dom";
import { Hello } from "../components/placeholder/Hello";

export const SiteAdminView = () => {
	return (
		<Routes>
			<Route path='/' element={<Hello />} />
		</Routes>
	);
};
