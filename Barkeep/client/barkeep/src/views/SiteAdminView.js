import { Route, Routes } from "react-router-dom";
import { Hello } from "../components/placeholder/Hello";
import { CategoryContainer } from "../components/categories/CategoryContainer";
import { EditCategory } from "../components/categories/EditCategory";
import { AddCategory } from "../components/categories/AddCategory";
import { CategoryDetails } from "../components/categories/CategoryDetails";
import { DeleteCategory } from "../components/categories/DeleteCategory";
import { VarietalTypeList } from "../components/varietalTypes/VarietalTypeList";

export const SiteAdminView = () => {
	return (
		<Routes>
			<Route path='/' element={<Hello />} />
			{/*category routes*/}
			<Route path='/category' element={<CategoryContainer />} />
			<Route path='/category/add' element={<AddCategory />} />
			<Route path='/category/:categoryId' element={<CategoryDetails />} />
			<Route path='/category/:categoryId/edit' element={<EditCategory />} />
			<Route path='/category/:categoryId/delete' element={<DeleteCategory />} />
			{/*varietal type routes*/}
			<Route path='/varietaltype' element={<VarietalTypeList />} />
		</Routes>
	);
};
