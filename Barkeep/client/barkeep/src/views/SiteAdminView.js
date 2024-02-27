import { Route, Routes } from "react-router-dom";
import { Hello } from "../components/placeholder/Hello";
import { CategoryContainer } from "../components/categories/CategoryContainer";

export const SiteAdminView = () => {
	return (
		<Routes>
			<Route path='/' element={<Hello />} />
			<Route path='/category' element={<CategoryContainer />} />
		</Routes>
	);
};
