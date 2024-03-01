const userTypeApiUrl = "https://localhost:5001/api/UserType/";

export const getAllUserTypes = () => {
	return fetch(userTypeApiUrl).then((res) => res.json());
};
