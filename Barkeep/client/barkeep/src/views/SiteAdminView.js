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
import { StateContainer } from "../components/locations/states/StateContainer";
import { AddState } from "../components/locations/states/AddState";
import { EditState } from "../components/locations/states/EditState";
import { DeleteState } from "../components/locations/states/DeleteState";
import { StateDetails } from "../components/locations/states/StateDetails";
import { RegionContainer } from "../components/locations/regions/RegionContainer";
import { AddRegion } from "../components/locations/regions/AddRegion";
import { DeleteRegion } from "../components/locations/regions/DeleteRegion";
import { EditRegion } from "../components/locations/regions/EditRegion";
import { RegionDetails } from "../components/locations/regions/RegionDetails";
import { CityContainer } from "../components/locations/cities/CityContainer";
import { AddCity } from "../components/locations/cities/AddCity";
import { DeleteCity } from "../components/locations/cities/DeleteCity";
import { EditCity } from "../components/locations/cities/EditCity";
import { CityDetails } from "../components/locations/cities/CityDetails";

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
				path='/componentType/:componentTypeId/delete'
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
			{/*state routes*/}
			<Route path='/state' element={<StateContainer />} />
			<Route path='/state/add' element={<AddState />} />
			<Route path='/state/:stateId' element={<StateDetails />} />
			<Route path='/state/:stateId/edit' element={<EditState />} />
			<Route path='/state/:stateId/delete' element={<DeleteState />} />
			{/*region routes*/}
			<Route path='/region' element={<RegionContainer />} />
			<Route path='/region/add' element={<AddRegion />} />
			<Route path='/region/:regionId' element={<RegionDetails />} />
			<Route path='/region/:regionId/delete' element={<DeleteRegion />} />
			<Route path='/region/:regionId/edit' element={<EditRegion />} />
			{/*city routes*/}
			<Route path='/city' element={<CityContainer />} />
			<Route path='/city/add' element={<AddCity />} />
			<Route path='/city/:cityId' element={<CityDetails />} />
			<Route path='/city/:cityId/delete' element={<DeleteCity />} />
			<Route path='/city/:cityId/edit' element={<EditCity />} />
		</Routes>
	);
};
