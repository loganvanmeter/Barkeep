import { Route, Routes } from "react-router-dom";
import { Hello } from "../components/placeholder/Hello";
import { CategoryContainer } from "../components/categories/CategoryContainer";
import { EditCategory } from "../components/categories/EditCategory";
import { AddCategory } from "../components/categories/AddCategory";
import { CategoryDetails } from "../components/categories/CategoryDetails";
import { DeleteCategory } from "../components/categories/DeleteCategory";
import { VarietalTypeList } from "../components/varietalTypes/VarietalTypeList";
import { EditVarietalType } from "../components/varietalTypes/EditVarietalType";
import { AddVarietalType } from "../components/varietalTypes/AddVarietalType";
import { DeleteVarietalType } from "../components/varietalTypes/DeleteVarietalType";
import { VarietalContainer } from "../components/varietals/VarietalContainer";
import { AddVarietal } from "../components/varietals/AddVarietal";
import { EditVarietal } from "../components/varietals/EditVarietal";
import { DeleteVarietal } from "../components/varietals/DeleteVarietal";
import { VarietalDetails } from "../components/varietals/VarietalDetails";

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
			<Route path='/varietalType' element={<VarietalTypeList />} />
			<Route path='/varietalType/add' element={<AddVarietalType />} />
			<Route
				path='/varietalType/:varietalTypeId/edit'
				element={<EditVarietalType />}
			/>
			<Route
				path='/varietalType/:varietalTypeId/delete'
				element={<DeleteVarietalType />}
			/>
			{/*varietal routes*/}
			<Route path='/varietal' element={<VarietalContainer />} />
			<Route path='/varietal/add' element={<AddVarietal />} />
			<Route path='/varietal/:varietalId' element={<VarietalDetails />} />
			<Route path='/varietal/:varietalId/edit' element={<EditVarietal />} />
			<Route path='/varietal/:varietalId/delete' element={<DeleteVarietal />} />
		</Routes>
	);
};
