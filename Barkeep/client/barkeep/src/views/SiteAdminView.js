import { Route, Routes } from "react-router-dom";
import { Hello } from "../components/placeholder/Hello";
import { CategoryContainer } from "../components/categories/CategoryContainer";
import { EditCategory } from "../components/categories/EditCategory";

export const SiteAdminView = () => {
	return (
		<Routes>
			<Route path='/' element={<Hello />} />
			<Route path='/category/:categoryId/edit' element={<EditCategory />} />
		</Routes>
	);
};
