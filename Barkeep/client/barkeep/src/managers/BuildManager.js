const buildApiUrl = "https://localhost:5001/api/Build/";

export const getAllBuilds = () => {
	return fetch(`${buildApiUrl}`).then((res) => res.json());
};

export const getMenuItemBuild = (id) => {
	return fetch(`${buildApiUrl}MenuItemBuild/${id}`).then((res) => res.json());
};

export const getBuildById = (id) => {
	return fetch(`${buildApiUrl}${id}`).then((res) => res.json());
};

export const deleteBuild = (id) => {
	return fetch(`${buildApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateBuild = (build) => {
	return fetch(`${buildApiUrl}${build.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(build),
	});
};

export const addBuild = (build) => {
	return fetch(buildApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(build),
	});
};
