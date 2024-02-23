const userApiUrl = "https://localhost:5001/api/User/";

//get user by email
export const getUserByEmail = (email) => {
	return fetch(`${userApiUrl}GetByEmail?email=${email}`).then((res) =>
		res.json()
	);
};

//admin login
export const adminLogin = (email, password) => {
	//get user by email
	return getUserByEmail(email).then((user) => {
		//checkk to see user has an id, the entered password matches the user password, the user is currently active, and the userType is either "Site Admin", "Account Admin", or "Bar Admin"
		if (
			user.id &&
			user.password === password &&
			user.isActive &&
			user.userTypeId <= 3
		) {
			//if "Site Admin"
			if (user.userType.name.toLowercase() === "site admin") {
				//set the user object to the local storage under the name "siteAdmin"
				localStorage.setItem("siteAdmin", JSON.stringify(user));
				return user;
			}
			//if "Account Admin"
			if (user.userType.name.toLowerCase() === "account admin") {
				//set the user object to the local storage under the name "accountAdmin"
				localStorage.setItem("accountAdmin", JSON.stringify(user));
				return user;
			}
			//if "Bar Admin"
			if (user.userType.name.toLowerCase() === "bar admin") {
				//set the user object to the local storage under the name "barAdmin"
				localStorage.setItem("barAdmin", JSON.stringify(user));
				return user;
			}
		} else {
			//otherwise return undefined
			return undefined;
		}
	});
};
