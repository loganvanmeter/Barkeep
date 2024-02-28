import { Route, Routes } from "react-router-dom";
import { CategoryContainer } from "../components/categories/CategoryContainer";
import { CategoryDetails } from "../components/categories/CategoryDetails";
import { AddCategory } from "../components/categories/AddCategory";

export const AllView = () => {
	return (
		<Routes>
			<Route path='/category' element={<CategoryContainer />} />
			<Route path='/category/:categoryId' element={<CategoryDetails />} />
			<Route path='/category/add' element={<AddCategory />} />
		</Routes>
	);
};
