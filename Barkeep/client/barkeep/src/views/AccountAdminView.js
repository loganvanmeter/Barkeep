import { Route, Routes } from "react-router-dom";
import { Hello } from "../components/placeholder/Hello";
import { BarDashboard } from "../components/dashboards/BarDashboard";
import { AddBar } from "../components/bars/AddBar";
import { AccountDashboard } from "../components/dashboards/AccountDashboard";
import { BarList } from "../components/bars/BarList";
import { BarDetails } from "../components/bars/BarDetails";
import { EditBar } from "../components/bars/EditBar";
import { DeleteBar } from "../components/bars/DeleteBar";
import { CategoryContainer } from "../components/categories/CategoryContainer";
import { EditCategory } from "../components/categories/EditCategory";
import { AddCategory } from "../components/categories/AddCategory";
import { CategoryDetails } from "../components/categories/CategoryDetails";
import { DeleteCategory } from "../components/categories/DeleteCategory";
import { ProducerContainer } from "../components/producers/ProducerContainer";
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
import { ComponentContainer } from "../components/components/ComponentContainer";
import { AddComponent } from "../components/components/AddComponent";
import { ComponentDetails } from "../components/components/ComponentDetails";
import { EditComponent } from "../components/components/EditComponent";
import { DeleteComponent } from "../components/components/DeleteComponent";
import { AccountAdminSideBar } from "../nav/AccountAdminSideBar";
import { Stack } from "react-bootstrap";
import { InventoryContainer } from "../components/inventory/InventoryContainer";
import { AddInventory } from "../components/inventory/AddInventory";

export const AccountAdminView = ({ setIsLoggedIn, setIsViewingBar }) => {
	return (
		<>
			<AccountAdminSideBar setIsLoggedIn={setIsLoggedIn} />
			<Routes>
				<Route path='/' element={<Hello />} />
				<Route
					path='/account/:userId/dashboard'
					element={<AccountDashboard />}
				/>
				{/*bar routes */}
				<Route path='/bar/' element={<BarList />} />
				<Route path='/bar/add' element={<AddBar />} />
				<Route path='/bar/:barId' element={<BarDetails />} />
				<Route path='/bar/:barId/edit' element={<EditBar />} />
				<Route path='/bar/:barId/delete' element={<DeleteBar />} />
				<Route
					path='/bar/:barId/dashboard'
					element={<BarDashboard setIsViewingbar={setIsViewingBar} />}
				/>
				{/*category routes*/}
				<Route path='/category' element={<CategoryContainer />} />
				<Route path='/category/add' element={<AddCategory />} />
				<Route path='/category/:categoryId' element={<CategoryDetails />} />
				<Route path='/category/:categoryId/edit' element={<EditCategory />} />
				<Route
					path='/category/:categoryId/delete'
					element={<DeleteCategory />}
				/>
				{/*producer routes*/}
				<Route path='/producer' element={<ProducerContainer />} />
				<Route path='/producer/add' element={<AddProducer />} />
				<Route path='/producer/:producerId' element={<ProducerDetails />} />
				<Route path='/producer/:producerId/edit' element={<EditProducer />} />
				<Route
					path='/producer/:producerId/delete'
					element={<DeleteProducer />}
				/>
				{/*importer routes*/}
				<Route path='/importer' element={<ImporterContainer />} />
				<Route path='/importer/add' element={<AddImporter />} />
				<Route path='/importer/:importerId' element={<ImporterDetails />} />
				<Route path='/importer/:importerId/edit' element={<EditImporter />} />
				<Route
					path='/importer/:importerId/delete'
					element={<DeleteImporter />}
				/>
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
				{/*component routes*/}
				<Route path='/component' element={<ComponentContainer />} />
				<Route path='/component/add' element={<AddComponent />} />
				<Route path='/component/:componentId' element={<ComponentDetails />} />
				<Route
					path='/component/:componentId/delete'
					element={<DeleteComponent />}
				/>
				<Route
					path='/component/:componentId/edit'
					element={<EditComponent />}
				/>
				{/*inventory routes*/}
				<Route path='bar/:barId/inventory' element={<InventoryContainer />} />
				<Route path='bar/:barId/inventory/add' element={<AddInventory />} />
			</Routes>
		</>
	);
};
