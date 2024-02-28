import { Route, Routes } from "react-router-dom";
import { CategoryContainer } from "../components/categories/CategoryContainer";
import { CategoryDetails } from "../components/categories/CategoryDetails";

export const AllView = () => {
	return (
		<Routes>
			<Route path='/category' element={<CategoryContainer />} />
			<Route path='/category/:categoryId' element={<CategoryDetails />} />
		</Routes>
	);
};
