import { useNavigate, useParams } from "react-router-dom";
import { getBarById, updateBar } from "../../managers/BarManager";
import { getCityById } from "../../managers/LocationsManager";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CityDropDown } from "../forms/CityDropDown";
import { CountryDropDown } from "../forms/CountryDropDown";
import { StateDropDown } from "../forms/StateDropDown";
import { RegionDropDown } from "../forms/RegionDropDown";

export const EditBar = () => {
	const urlPath = "bar";
	const { barId } = useParams();
	const [bar, setBar] = useState({});
	const [cityId, setCityId] = useState(0);
	const [stateId, setStateId] = useState(0);
	const [regionId, setRegionId] = useState(0);
	const [countryId, setCountryId] = useState(0);
	const navigate = useNavigate();
	const accountAdmin = JSON.parse(localStorage.getItem("accountAdmin"));

	const getBar = () => {
		return getBarById(barId).then((bar) => {
			console.log(bar);
			setBar(bar);
			setCityId(bar.cityId);
			setRegionId(bar?.city?.regionId);
			setStateId(bar?.city?.stateId);
			setCountryId(bar?.city?.countryId);
		});
	};

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...bar };
		copy[e.target.id] = e.target.value;
		setBar(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...bar };
		copy.website = copy.webiste ? copy.website : null;
		copy.countryId = copy.countryId ? copy.countryId : null;
		copy.stateId = copy.stateId ? copy.stateId : null;
		copy.regionId = copy.regionId ? copy.regionId : null;
		copy.cityId = copy.cityId ? copy.cityId : null;
		if (
			copy.name &&
			copy.cityId &&
			copy.phone &&
			copy.street &&
			copy.email &&
			copy.userId
		) {
			return updateBar(copy).then(() => navigate(`/bar/${bar.id}`));
		}
	};
	useEffect(() => {
		getBar();
	}, [barId]);

	useEffect(() => {
		const copy = { ...bar };
		copy.cityId = cityId;
		copy.regionId = regionId;
		copy.stateId = stateId;
		copy.countryId = countryId;
		setBar(copy);
	}, [cityId, regionId, stateId, countryId]);

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Add a new bar below</h3>
				<Stack gap={3}>
					<Stack className='flex-wrap' direction='horizontal' gap={5}>
						<Stack>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type='text'
									id='name'
									value={bar.name}
									onChange={(e) => handleChange(e)}
								/>
							</Form.Group>
						</Stack>
						<Stack>
							<Form.Group>
								<Form.Label>Phone</Form.Label>
								<Form.Control
									type='tel'
									id='phone'
									value={bar.phone}
									onChange={(e) => handleChange(e)}
								/>
							</Form.Group>
						</Stack>
						<Stack>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type='text'
									id='email'
									value={bar.email}
									onChange={(e) => handleChange(e)}
								/>
							</Form.Group>
						</Stack>
						<Stack>
							<Form.Group>
								<Form.Label>Website</Form.Label>
								<Form.Control
									type='text'
									id='website'
									value={bar.website}
									onChange={(e) => handleChange(e)}
								/>
							</Form.Group>
						</Stack>
					</Stack>
					<Stack direction='horizontal' gap={5} className='flex-wrap'>
						<Stack>
							<Form.Group>
								<Form.Label>Street Address</Form.Label>
								<Form.Control
									type='text'
									id='street'
									value={bar.street}
									onChange={(e) => handleChange(e)}
								/>
							</Form.Group>
						</Stack>
						<CityDropDown
							stateId={stateId}
							setStateId={setStateId}
							countryId={countryId}
							setCountryId={setCountryId}
							regionId={regionId}
							setRegionId={setRegionId}
							setCityId={setCityId}
							cityId={bar.cityId}
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
					<Stack direction='horizontal' className='justify-content-end' gap={3}>
						<Button
							variant='outline-secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/bar/${bar.id}`);
							}}
						>
							Cancel
						</Button>

						{bar.name &&
						bar.cityId &&
						bar.phone &&
						bar.street &&
						bar.email &&
						bar.userId ? (
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
