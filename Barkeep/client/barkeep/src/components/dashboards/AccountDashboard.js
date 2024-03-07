import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../managers/UserManager";

export const AccountDashboard = () => {
	const { userId } = useParams();
	const [user, setUser] = useState({});

	const getThisUser = () => {
		return getUserById(userId).then((user) => setUser(user));
	};

	useEffect(() => {
		getThisUser();
	}, [userId]);

	return <div>{user.fullName}</div>;
};
