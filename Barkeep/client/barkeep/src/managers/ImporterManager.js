const importerApiUrl = "https://localhost:5001/api/Importer/";

export const getAllImporters = () => {
	return fetch(importerApiUrl).then((res) => res.json());
};

export const getImporterById = (id) => {
	return fetch(`${importerApiUrl}${id}`).then((res) => res.json());
};

export const deleteImporter = (id) => {
	return fetch(`${importerApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateImporter = (importer) => {
	return fetch(`${importerApiUrl}${importer.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(importer),
	});
};

export const addImporter = (importer) => {
	return fetch(importerApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(importer),
	});
};
