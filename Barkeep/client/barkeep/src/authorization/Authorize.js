import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLogin } from "./AdminLogin";
import { Register } from "./Register";

export const Authorize = ({
	setIsSiteAdminLoggedIn,
	setIsAccountAdminLoggedIn,
}) => {
	return (
		<Routes>
			<Route
				path='/login'
				element={
					<AdminLogin
						setIsSiteAdminLoggedIn={setIsSiteAdminLoggedIn}
						setIsAccountAdminLoggedIn={setIsAccountAdminLoggedIn}
					/>
				}
			/>
			<Route
				path='/register'
				element={
					<Register setIsAccountAdminLoggedIn={setIsAccountAdminLoggedIn} />
				}
			/>
			<Route path='*' element={<Navigate to='/login' />} />
		</Routes>
	);
};
