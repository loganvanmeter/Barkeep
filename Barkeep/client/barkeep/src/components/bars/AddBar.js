import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBar } from "../../managers/BarManager";
import { addRole } from "../../managers/RoleManager";
import { addBarUser } from "../../managers/BarUserManager";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { CityDropDown } from "../forms/CityDropDown";
import { getCityById } from "../../managers/LocationsManager";

export const AddBar = () => {
	const urlPath = "bar";
	const [bar, setBar] = useState({
		name: null,
		phone: null,
		street: null,
		email: null,
		website: null,
		userId: null,
		cityId: null,
		regionId: null,
		stateId: null,
		countryId: null,
	});
	const [cityId, setCityId] = useState(0);
	const [city, setCity] = useState({});
	const [stateId, setStateId] = useState(0);
	const [regionId, setRegionId] = useState(0);
	const [countryId, setCountryId] = useState(0);
	const navigate = useNavigate();
	const accountAdmin = JSON.parse(localStorage.getItem("accountAdmin"));

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...bar };
		copy[e.target.id] = e.target.value;
		setBar(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...bar };
		copy.countryId = countryId ? countryId : null;
		copy.stateId = stateId ? stateId : null;
		copy.regionId = regionId ? regionId : null;
		copy.cityId = cityId ? cityId : null;
		if (
			copy.name &&
			copy.cityId &&
			copy.phone &&
			copy.street &&
			copy.email &&
			copy.userId
		) {
			return addBar(copy)
				.then((res) => res.json())
				.then((newBar) => {
					console.log(newBar);
					addRole({
						name: "Account Admin",
						barId: newBar.id,
					})
						.then((res) => res.json())
						.then((newRole) => {
							console.log(newRole);
							addBarUser({
								userId: accountAdmin.id,
								barId: newBar.id,
								userTypeId: 2,
								payRate: 0,
								payRateTypeId: 1,
								createDateTime: new Date(),
								endDateTime: null,
								isActive: true,
								roleId: newRole.id,
							})
								.then((res) => res.json())
								.then((newBarUser) => console.log(newBarUser))
								.then(() => navigate(`/bar/${newBar.id}/dashboard`));
						});
				});
		}
	};

	useEffect(() => {
		getCityById(cityId).then((city) => setCity(city));
	}, [cityId]);

	useEffect(() => {
		if (city.countryId) {
			setCountryId(city.countryId);
		}
		if (city.stateId) {
			setStateId(city.stateId);
		}
		if (city.regionId) {
			setRegionId(city.regionId);
		}
	}, [city]);

	useEffect(() => {
		const copy = { ...bar };
		copy.countryId = countryId;
		copy.stateId = stateId;
		copy.regionId = regionId;
		copy.cityId = cityId;
		copy.userId = parseInt(accountAdmin.id);
		setBar(copy);
	}, [countryId, stateId, regionId, cityId]);

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
									onChange={(e) => handleChange(e)}
								/>
							</Form.Group>
						</Stack>
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
					</Stack>
					<Stack direction='horizontal' className='justify-content-end' gap={3}>
						<Button
							variant='outline-secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/account/${parseInt(accountAdmin.id)}dashboard`);
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
