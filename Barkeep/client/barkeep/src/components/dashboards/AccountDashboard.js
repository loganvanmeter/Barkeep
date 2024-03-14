import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../managers/UserManager";
import { AccountAdminSideBar } from "../../nav/AccountAdminSideBar";
import { AccountAdminView } from "../../views/AccountAdminView";

export const AccountDashboard = ({ setisLoggedIn, isViewingBar }) => {
	const { userId } = useParams();
	const [user, setUser] = useState({});

	const getThisUser = () => {
		return getUserById(userId).then((user) => setUser(user));
	};

	useEffect(() => {
		getThisUser();
	}, [userId]);

	return "hi";
};
