import { Route, Routes } from "react-router-dom";
import { Hello } from "../components/placeholder/Hello";
import { CategoryContainer } from "../components/categories/CategoryContainer";
import { EditCategory } from "../components/categories/EditCategory";
import { AddCategory } from "../components/categories/AddCategory";
import { CategoryDetails } from "../components/categories/CategoryDetails";

export const SiteAdminView = () => {
	return (
		<Routes>
			<Route path='/' element={<Hello />} />
			<Route path='/category/:categoryId/edit' element={<EditCategory />} />
			<Route path='/category/add' element={<AddCategory />} />
			<Route path='/category' element={<CategoryContainer />} />
			<Route path='/category/:categoryId' element={<CategoryDetails />} />
		</Routes>
	);
};
