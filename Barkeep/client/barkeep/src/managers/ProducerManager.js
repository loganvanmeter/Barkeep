const producerApiUrl = "https://localhost:5001/api/Producer/";

export const getAllProducers = () => {
	return fetch(producerApiUrl).then((res) => res.json());
};

export const getProducerById = (id) => {
	return fetch(`${producerApiUrl}${id}`).then((res) => res.json());
};

export const deleteProducer = (id) => {
	return fetch(`${producerApiUrl}${id}`, {
		method: "DELETE",
	});
};

export const updateProducer = (producer) => {
	return fetch(`${producerApiUrl}${producer.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(producer),
	});
};

export const addProducer = (producer) => {
	return fetch(producerApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(producer),
	});
};
