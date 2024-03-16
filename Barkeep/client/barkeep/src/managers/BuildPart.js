const buildPartApiUrl = "https://localhost:5001/api/BuildPart/";

export const getAllBuildParts = () => {
	return fetch(`${buildPartApiUrl}`).then((res) => res.json());
};

export const getBuildParts = (id) => {
	return fetch(`${buildPartApiUrl}BuildParts/${id}`).then((res) => res.json());
};

export const getBuildPartById = (id) => {
	return fetch(`${buildPartApiUrl}${id}`).then((res) => res.json());
};

export const deleteBuildPart = (id) => {
	return fetch(`${buildPartApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateBuildPart = (buildPart) => {
	return fetch(`${buildPartApiUrl}${buildPart.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(buildPart),
	});
};

export const addBuildPart = (buildPart) => {
	return fetch(buildPartApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(buildPart),
	});
};
