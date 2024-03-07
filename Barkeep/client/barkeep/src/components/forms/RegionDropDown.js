import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { getAllRegions } from "../../managers/LocationsManager";
import { AddRegion } from "../locations/regions/AddRegion";

export const RegionDropDown = ({
	countryId,
	setCountryId,
	setStateId,
	stateId,
	regionId,
	setRegionId,
	urlPath,
}) => {
	const [regions, setRegions] = useState([]);
	const [filteredRegions, setFilteredRegions] = useState([]);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const getRegions = () => {
		return getAllRegions().then((res) => setRegions(res));
	};

	const handleChange = (e) => {
		e.preventDefault();
		setRegionId(parseInt(e.target.value));
	};

	useEffect(() => {
		getRegions();
	}, []);

	useEffect(() => {
		setFilteredRegions(regions);
	}, [regions]);

	useEffect(() => {
		if (countryId && !stateId) {
			const matchedByCountry = regions.filter(
				(region) =>
					(region.countryId && region.countryId == countryId) ||
					(region.stateId && region?.state?.countryId == countryId)
			);
			setFilteredRegions(matchedByCountry);
		} else if (stateId && !countryId) {
			const matchedByState = regions.filter(
				(region) => region.stateId == stateId
			);
			setFilteredRegions(matchedByState);
		} else if (stateId && countryId) {
			const matchedByStateAndCountry = regions.filter(
				(region) =>
					region.stateId == stateId && region?.state?.countryId == countryId
			);
			setFilteredRegions(matchedByStateAndCountry);
		} else if (!countryId && !stateId) {
			setFilteredRegions(regions);
		}
	}, [countryId, stateId]);

	return (
		<Stack>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					<AddRegion
						setShow={setShow}
						setRegions={setRegions}
						setComponentRegionId={setRegionId}
						getAllRegions={getAllRegions}
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
								? "Filter by region"
								: "Regions"}
						</Form.Label>
						<Form.Select
							aria-label='Default select example'
							value={regionId}
							onChange={handleChange}
						>
							<option value={0}>
								{window.location.pathname === `/${urlPath}`
									? "All"
									: "Select region"}
							</option>
							{filteredRegions.map((region) => {
								return (
									<option key={region.id} value={region.id}>
										{region.name}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Stack>
				<div className='pb-2'>{` OR `}</div>

				<Button variant='outline-primary' onClick={handleShow}>
					add new region
				</Button>
			</Stack>
		</Stack>
	);
};
