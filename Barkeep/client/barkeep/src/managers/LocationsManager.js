const cityApiUrl = "https://localhost:5001/api/City/";

export const getAllCities = () => {
	return fetch(cityApiUrl).then((res) => res.json());
};

export const getCityById = (id) => {
	return fetch(`${cityApiUrl}${id}`).then((res) => res.json());
};

export const deleteCity = (id) => {
	return fetch(`${cityApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateCity = (city) => {
	return fetch(`${cityApiUrl}${city.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(city),
	});
};

export const addCity = (city) => {
	return fetch(cityApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(city),
	});
};

const stateApiUrl = "https://localhost:5001/api/State/";

export const getAllStates = () => {
	return fetch(stateApiUrl).then((res) => res.json());
};

export const getStateById = (id) => {
	return fetch(`${stateApiUrl}${id}`).then((res) => res.json());
};

export const deleteState = (id) => {
	return fetch(`${stateApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateState = (state) => {
	return fetch(`${stateApiUrl}${state.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(state),
	});
};

export const addState = (state) => {
	return fetch(stateApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(state),
	});
};

const regionApiUrl = "https://localhost:5001/api/Region/";

export const getAllRegions = () => {
	return fetch(regionApiUrl).then((res) => res.json());
};

export const getAllStateRegions = () => {
	return fetch(`${regionApiUrl}StateRegions`).then((res) => res.json());
};

export const getAllCountryRegions = () => {
	return fetch(`${regionApiUrl}CountryRegions`).then((res) => res.json());
};

export const getRegionById = (id) => {
	return fetch(`${regionApiUrl}${id}`).then((res) => res.json());
};

export const deleteRegion = (id) => {
	return fetch(`${regionApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateRegion = (region) => {
	return fetch(`${regionApiUrl}${region.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(region),
	});
};

export const addRegion = (region) => {
	return fetch(regionApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(region),
	});
};

const countryApiUrl = "https://localhost:5001/api/Country/";

export const getAllCountries = () => {
	return fetch(countryApiUrl).then((res) => res.json());
};

export const getCountryById = (id) => {
	return fetch(`${countryApiUrl}${id}`).then((res) => res.json());
};
