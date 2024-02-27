const categoryApiUrl = "https://localhost:5001/api/Category/";

export const getAllApprovedCategories = () => {
	return fetch(`${categoryApiUrl}GetApproved`).then((res) => res.json());
};
