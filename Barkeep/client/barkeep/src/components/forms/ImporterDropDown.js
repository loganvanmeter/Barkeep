import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { getAllImporters } from "../../managers/ImporterManager";
import { AddImporter } from "../importers/AddImporter";

export const ImporterDropDown = ({ importerId, setImporterId }) => {
	const [importers, setImporters] = useState([]);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const getImporters = () => {
		return getAllImporters().then((res) => setImporters(res));
	};

	const handleChange = (e) => {
		e.preventDefault();
		setImporterId(parseInt(e.target.value));
	};

	useEffect(() => {
		getImporters();
	}, []);

	return (
		<Stack>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					<AddImporter
						setShow={setShow}
						setImporters={setImporters}
						setImporterId={setImporterId}
						getAllImporters={getAllImporters}
					/>
				</Modal.Body>
			</Modal>

			<Stack direction='horizontal' gap={2} className='align-items-end'>
				<Stack>
					<Form.Group>
						<Form.Label>
							{window.location.pathname === "/importer"
								? "Filter by importer"
								: "Importer"}
						</Form.Label>
						<Form.Select
							aria-label='Default select example'
							value={importerId}
							onChange={handleChange}
						>
							<option value={0}>
								{window.location.pathname === "/importer"
									? "All"
									: "Select importer"}
							</option>
							{importers.map((importer) => {
								return (
									<option key={importer.id} value={importer.id}>
										{importer.name}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
				</Stack>
				<div className='pb-2'>{` OR `}</div>

				<Button variant='outline-primary' onClick={handleShow}>
					add new importer
				</Button>
			</Stack>
		</Stack>
	);
};
