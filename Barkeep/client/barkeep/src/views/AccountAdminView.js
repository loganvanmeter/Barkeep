import { Route, Routes } from "react-router-dom";
import { Hello } from "../components/placeholder/Hello";
import { BarDashboard } from "../components/dashboards/BarDashboard";
import { AddBar } from "../components/bars/AddBar";
import { AccountDashboard } from "../components/dashboards/AccountDashboard";
import { BarList } from "../components/bars/BarList";
import { BarDetails } from "../components/bars/BarDetails";
import { EditBar } from "../components/bars/EditBar";
import { DeleteBar } from "../components/bars/DeleteBar";

export const AccountAdminView = () => {
	return (
		<Routes>
			<Route path='/' element={<Hello />} />
			<Route path='/account/:userId/dashboard' element={<AccountDashboard />} />
			{/*bar routes */}
			<Route path='/bar/' element={<BarList />} />
			<Route path='/bar/add' element={<AddBar />} />
			<Route path='/bar/:barId' element={<BarDetails />} />
			<Route path='/bar/:barId/edit' element={<EditBar />} />
			<Route path='/bar/:barId/delete' element={<DeleteBar />} />
			<Route path='/bar/:barId/dashboard' element={<BarDashboard />} />
		</Routes>
	);
};
