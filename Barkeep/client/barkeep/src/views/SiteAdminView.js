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
import { ProducerContainer } from "../components/producers/ProducerContainer";
import { ComponentTypeList } from "../components/componentTypes/ComponentTypeList";
import { EditComponentType } from "../components/componentTypes/EditComponentType";
import { AddComponentType } from "../components/componentTypes/AddComponentType";
import { DeleteComponentType } from "../components/componentTypes/DeleteComponentType";
import { EditProducer } from "../components/producers/EditProducer";
import { AddProducer } from "../components/producers/AddProducer";
import { ProducerDetails } from "../components/producers/ProducerDetails";
import { DeleteProducer } from "../components/producers/DeleteProducer";
import { ImporterContainer } from "../components/importers/ImporterContainer";
import { EditImporter } from "../components/importers/EditImporter";
import { AddImporter } from "../components/importers/AddImporter";
import { ImporterDetails } from "../components/importers/ImporterDetails";
import { DeleteImporter } from "../components/importers/DeleteImporter";
import { CountryContainer } from "../components/locations/countries/CountryContainer";

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
			{/*component type routes*/}
			<Route path='/componentType' element={<ComponentTypeList />} />
			<Route path='/componentType/add' element={<AddComponentType />} />
			<Route
				path='/componentType/:componentTypeId/edit'
				element={<EditComponentType />}
			/>
			<Route
				path='/componentType/:varietalTypeId/delete'
				element={<DeleteComponentType />}
			/>
			{/*producer routes*/}
			<Route path='/producer' element={<ProducerContainer />} />
			<Route path='/producer/add' element={<AddProducer />} />
			<Route path='/producer/:producerId' element={<ProducerDetails />} />
			<Route path='/producer/:producerId/edit' element={<EditProducer />} />
			<Route path='/producer/:producerId/delete' element={<DeleteProducer />} />
			{/*importer routes*/}
			<Route path='/importer' element={<ImporterContainer />} />
			<Route path='/importer/add' element={<AddImporter />} />
			<Route path='/importer/:importerId' element={<ImporterDetails />} />
			<Route path='/importer/:importerId/edit' element={<EditImporter />} />
			<Route path='/importer/:importerId/delete' element={<DeleteImporter />} />
			{/*country routes*/}
			<Route path='/country' element={<CountryContainer />} />
		</Routes>
	);
};
