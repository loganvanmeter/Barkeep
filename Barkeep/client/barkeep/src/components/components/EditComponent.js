import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Stack } from "react-bootstrap";
import { CountryDropDown } from "../forms/CountryDropDown";
import { StateDropDown } from "../forms/StateDropDown";
import { RegionDropDown } from "../forms/RegionDropDown";
import { CityDropDown } from "../forms/CityDropDown";
import { ProducerDropDown } from "../forms/ProducerDropDown";
import { ImporterDropDown } from "../forms/ImporterDropDown";
import {
	getComponentById,
	updateComponent,
} from "../../managers/ComponentManager";
import { ComponentTypeDropDown } from "../forms/ComponentTypeDropDown.js";

export const EditComponent = () => {
	const { componentId } = useParams();
	const urlPath = "component";
	const [countryId, setCountryId] = useState(0);
	const [stateId, setStateId] = useState(0);
	const [regionId, setRegionId] = useState(0);
	const [cityId, setCityId] = useState(0);
	const [producerId, setProducerId] = useState(0);
	const [importerId, setImporterId] = useState(0);
	const [componentTypeId, setComponentTypeId] = useState(0);
	const [providerBarId, setProviderBarId] = useState(0);
	const [component, setComponent] = useState({});

	const navigate = useNavigate();
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
		copy.providerBarId = providerBarId ? providerBarId : null;
		copy.componentTypeId = componentTypeId ? componentTypeId : null;
		copy.year = copy.year ? copy.year : null;
		copy.abv = copy.abv ? parseFloat(copy.abv) : null;
		copy.ibu = copy.ibu ? parseFloat(copy.ibu) : null;
		if (copy.name && copy.componentTypeId) {
			return updateComponent(copy).then(() =>
				navigate(`/component/${copy.id}`)
			);
		}
	};

	useEffect(() => {
		getComponentById(componentId).then((component) => {
			setComponent(component);
			setCityId(component.cityId ? component.cityId : 0);
			setCountryId(component.countryId ? component.countryId : 0);
			setStateId(component.stateId ? component.stateId : 0);
			setRegionId(component.regionId ? component.regionId : 0);
			setComponentTypeId(
				component.componentTypeId ? component.componentTypeId : 0
			);
			setProducerId(component.producerId ? component.producerId : 0);
			setImporterId(component.importerId ? component.importerId : 0);
		});
	}, [componentId]);

	useEffect(() => {
		const copy = { ...component };
		component.countryId = countryId;
		component.stateId = stateId;
		component.regionId = regionId;
		component.cityId = cityId;
		component.producerId = producerId;
		component.importerId = importerId;
		component.componentTypeId = componentTypeId;
		setComponent(copy);
	}, [
		countryId,
		regionId,
		stateId,
		cityId,
		producerId,
		importerId,
		componentTypeId,
	]);

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Editing Component #{component.id}</h3>
				<Stack gap={3}>
					<Stack className='flex-wrap' direction='horizontal' gap={5}>
						<Stack>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type='text'
									id='name'
									value={component.name}
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
										value={component.abv ? component.abv : ""}
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
										value={component.ibu ? component.ibu : ""}
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
							value={component.description ? component.description : ""}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Stack
						direction='horizontal'
						gap={5}
						className='justify-content-between'
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
								value={component.year ? component.year : ""}
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
