import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLogin } from "./AdminLogin";
import { Register } from "./Register";

export const Authorize = ({ setIsSiteAdminLoggedIn }) => {
	return (
		<Routes>
			<Route
				path='/login'
				element={<AdminLogin setIsSiteAdminLoggedIn={setIsSiteAdminLoggedIn} />}
			/>
			<Route
				path='/register'
				element={<Register setIsSiteAdminLoggedIn={setIsSiteAdminLoggedIn} />}
			/>
			<Route path='*' element={<Navigate to='/login' />} />
		</Routes>
	);
};
