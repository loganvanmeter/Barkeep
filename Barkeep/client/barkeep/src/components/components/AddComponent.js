import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Stack } from "react-bootstrap";
import { CountryDropDown } from "../forms/CountryDropDown";
import { StateDropDown } from "../forms/StateDropDown";
import { RegionDropDown } from "../forms/RegionDropDown";
import { CityDropDown } from "../forms/CityDropDown";
import { ProducerDropDown } from "../forms/ProducerDropDown";
import { ImporterDropDown } from "../forms/ImporterDropDown";
import { addComponent } from "../../managers/ComponentManager";
import { ComponentTypeDropDown } from "../forms/ComponentTypeDropDown.js";

export const AddComponent = ({
	inventory,
	setInventory,
	setIsExistingComponent,
	setInventoryComponent,
	handleClose,
	componentName,
}) => {
	const bar = JSON.parse(localStorage.getItem("bar"));
	const urlPath = "component";
	const [countryId, setCountryId] = useState(0);
	const [stateId, setStateId] = useState(0);
	const [regionId, setRegionId] = useState(0);
	const [cityId, setCityId] = useState(0);
	const [producerId, setProducerId] = useState(0);
	const [importerId, setImporterId] = useState(0);
	const [componentTypeId, setComponentTypeId] = useState(0);
	const [component, setComponent] = useState({
		name: componentName ? componentName : null,
		componentTypeId: null,
		abv: null,
		ibu: null,
		description: null,
		year: null,
		producerId: null,
		importerId: null,
		providerBarId: bar ? bar.id : null,
		countryId: null,
		stateId: null,
		regionId: null,
		cityId: null,
		isAdminApproved: null,
	});

	const navigate = useNavigate();
	const siteAdmin = JSON.parse(localStorage.getItem("siteAdmin"));
	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...component };
		copy[e.target.id] = e.target.value;
		setComponent(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...component };
		copy.countryId = countryId ? countryId : null;
		copy.stateId = stateId ? stateId : null;
		copy.regionId = regionId ? regionId : null;
		copy.cityId = cityId ? cityId : null;
		copy.producerId = producerId ? producerId : null;
		copy.importerId = importerId ? importerId : null;
		copy.providerBarId = bar ? bar.id : null;
		copy.isAdminApproved = siteAdmin ? true : false;
		copy.year = copy.year ? copy.year : null;
		copy.abv = copy.abv ? parseFloat(copy.abv) : null;
		copy.ibu = copy.ibu ? parseFloat(copy.ibu) : null;
		if (copy.name && copy.componentTypeId) {
			return addComponent(copy)
				.then((res) => res.json())
				.then((newComponent) => {
					if (inventory) {
						setInventoryComponent(newComponent);
						const copy = { ...inventory };
						copy.componentId = newComponent.id;
						setInventory(copy);
						setIsExistingComponent(true);
						handleClose();
					} else {
						navigate(`/component/${newComponent.id}`);
					}
				});
		}
	};

	useEffect(() => {
		const copy = { ...component };
		copy.countryId = countryId;
		copy.stateId = stateId;
		copy.regionId = regionId;
		copy.cityId = cityId;
		copy.componentTypeId = componentTypeId;
		copy.producerId = producerId;
		copy.importerId = importerId;
		setComponent(copy);
	}, [
		countryId,
		stateId,
		regionId,
		cityId,
		componentTypeId,
		producerId,
		importerId,
	]);

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Add a new component below</h3>
				<Stack gap={3}>
					<Stack className='flex-wrap' direction='horizontal' gap={5}>
						<Stack>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type='text'
									id='name'
									value={componentName ? componentName : ""}
									onChange={(e) => handleChange(e)}
								/>
							</Form.Group>
						</Stack>
						<ComponentTypeDropDown
							componentTypeId={componentTypeId}
							setComponentTypeId={setComponentTypeId}
						/>
						<Stack direction='horizontal' gap={5}>
							<Stack>
								<Form.Group>
									<Form.Label>ABV</Form.Label>
									<Form.Control
										type='text'
										id='abv'
										onChange={(e) => handleChange(e)}
									/>
								</Form.Group>
							</Stack>
							<Stack>
								<Form.Group>
									<Form.Label>IBU</Form.Label>
									<Form.Control
										type='text'
										id='ibu'
										onChange={(e) => handleChange(e)}
									/>
								</Form.Group>
							</Stack>
						</Stack>
					</Stack>
					<Stack direction='horizontal' gap={3}></Stack>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							as='textarea'
							id='description'
							rows={10}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Stack
						direction='horizontal'
						gap={5}
						className='justify-content-between flex-wrap'
					>
						<ProducerDropDown
							producerId={producerId}
							setProducerId={setProducerId}
						/>
						<ImporterDropDown
							importerId={importerId}
							setImporterId={setImporterId}
						/>
						<Form.Group>
							<Form.Label>Year</Form.Label>
							<Form.Control
								type='text'
								id='year'
								onChange={(e) => handleChange(e)}
							/>
						</Form.Group>
					</Stack>
					<Stack gap={3}>
						<Stack direction='horizontal' gap={5} className='flex-wrap'>
							<CityDropDown
								stateId={stateId}
								setStateId={setStateId}
								countryId={countryId}
								setCountryId={setCountryId}
								setRegionId={setRegionId}
								setCityId={setCityId}
								cityId={cityId}
								urlPath={urlPath}
							/>
							<RegionDropDown
								countryId={countryId}
								setCountryId={setCountryId}
								stateId={stateId}
								setStateId={setStateId}
								regionId={regionId}
								setRegionId={setRegionId}
								urlPath={urlPath}
							/>
							<StateDropDown
								stateId={stateId}
								setStateId={setStateId}
								countryId={countryId}
								cityId={cityId}
								setCountryId={setCountryId}
								setCityId={setCityId}
								regionId={regionId}
								setRegionId={setRegionId}
								urlPath={urlPath}
							/>
							<CountryDropDown
								countryId={countryId}
								setCountryId={setCountryId}
								setStateId={setStateId}
								setRegionId={setRegionId}
								cityId={cityId}
								setCityId={setCityId}
								urlPath={urlPath}
							/>
						</Stack>
					</Stack>
					<Stack direction='horizontal' className='justify-content-end' gap={3}>
						<Button
							variant='outline-secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/component/`);
							}}
						>
							Cancel
						</Button>

						{component.name && component.componentTypeId ? (
							<Button variant='primary' type='sumbit'>
								Save
							</Button>
						) : (
							""
						)}
					</Stack>
				</Stack>
			</Form>
		</Container>
	);
};
