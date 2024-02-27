import { Route, Routes } from "react-router-dom";
import { CategoryContainer } from "../components/categories/CategoryContainer";
import { Category } from "../components/categories/Category";

export const AllView = () => {
	return (
		<Routes>
			<Route path='/category' element={<CategoryContainer />} />
			<Route path='/category/:id' element={<Category />} />
		</Routes>
	);
};
