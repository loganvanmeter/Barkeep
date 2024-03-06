import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { getAllProducers } from "../../managers/ProducerManager";
import { AddProducer } from "../producers/AddProducer";

export const ProducerDropDown = ({ producerId, setProducerId }) => {
	const [producers, setProducers] = useState([]);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const getProducers = () => {
		return getAllProducers().then((res) => setProducers(res));
	};

	const handleChange = (e) => {
		e.preventDefault();
		setProducerId(parseInt(e.target.value));
	};

	useEffect(() => {
		getProducers();
	}, []);

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					<AddProducer
						setShow={setShow}
						setProducers={setProducers}
						setProducerId={setProducerId}
						getAllProducers={getAllProducers}
					/>
				</Modal.Body>
			</Modal>
			<Stack direction='horizontal' gap={2} className='align-items-end'>
				<Form.Group>
					<Form.Label>
						{window.location.pathname === "/producer"
							? "Filter by producer"
							: "Producer"}
					</Form.Label>
					<Form.Select
						aria-label='Default select example'
						value={producerId}
						onChange={handleChange}
					>
						<option value={0}>
							{window.location.pathname === "/producer"
								? "All"
								: "Select producer"}
						</option>
						{producers.map((producer) => {
							return (
								<option key={producer.id} value={producer.id}>
									{producer.name}
								</option>
							);
						})}
					</Form.Select>
				</Form.Group>
				<div className='pb-2'>{` OR `}</div>

				<Button variant='outline-primary' onClick={handleShow}>
					add new producer
				</Button>
			</Stack>
		</>
	);
};
