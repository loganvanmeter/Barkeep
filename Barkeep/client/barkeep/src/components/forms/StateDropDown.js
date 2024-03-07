import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { getAllStates } from "../../managers/LocationsManager";
import { AddState } from "../locations/states/AddState";

export const StateDropDown = ({
	stateId,
	setStateId,
	countryId,
	setCountryId,
	regionId,
	setRegionId,
	cityId,
	setCityId,
	urlPath,
}) => {
	const [states, setStates] = useState([]);
	const [filteredStates, setFilteredStates] = useState([]);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const getStates = () => {
		return getAllStates().then((res) => setStates(res));
	};

	const getAllCountryStates = () => {
		return states.filter((state) => state.countryId == countryId);
	};
	const handleChange = (e) => {
		e.preventDefault();
		setStateId(parseInt(e.target.value));
		if (regionId) {
			setRegionId(0);
		}
		if (cityId) {
			setCityId(0);
		}
	};

	useEffect(() => {
		getStates();
	}, []);

	useEffect(() => {
		if (countryId) {
			setFilteredStates(getAllCountryStates());
		} else {
			setFilteredStates(states);
		}
	}, [countryId, states]);

	return (
		<Stack>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					<AddState
						setShow={setShow}
						setStates={setStates}
						setComponentRegionId={setRegionId}
						getAllStates={getAllStates}
						setComponentCountryId={setCountryId}
						setComponentStateId={setStateId}
					/>
				</Modal.Body>
			</Modal>
			<Stack direction='horizontal' gap={2} className='align-items-end'>
				<Stack>
					<Form.Group>
						<Form.Label>
							{window.location.pathname === `/${urlPath}`
								? "Filter by state"
								: "State"}
						</Form.Label>
						<Form.Select
							aria-label='Default select example'
							value={stateId}
							onChange={handleChange}
						>
							<option value={0}>
								{window.location.pathname === `/${urlPath}`
									? "All"
									: "Select state"}
							</option>
							{filteredStates.map((state) => {
								return (
									<option key={state.id} value={state.id}>
										{state.name}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Stack>
				<div className='pb-2'>{` OR `}</div>

				<Button variant='outline-primary' onClick={handleShow}>
					add new state
				</Button>
			</Stack>
		</Stack>
	);
};
