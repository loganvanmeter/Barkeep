import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { CountryDropDown } from "../../forms/CountryDropDown";
import { getCityById, updateCity } from "../../../managers/LocationsManager";
import { StateDropDown } from "../../forms/StateDropDown";
import { RegionDropDown } from "../../forms/RegionDropDown";

export const EditCity = () => {
	const { cityId } = useParams();
	const [countryId, setCountryId] = useState(0);
	const [stateId, setStateId] = useState(0);
	const [regionId, setRegionId] = useState(0);
	const [city, setCity] = useState({});

	const navigate = useNavigate();

	const getCity = () => {
		return getCityById(cityId).then((res) => setCity(res));
	};

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...city };
		copy[e.target.id] = e.target.value;
		setCity(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...city };
		return updateCity(copy).then(() => navigate(`/city/${city.id}`));
	};

	useEffect(() => {
		getCity();
	}, [cityId]);

	useEffect(() => {
		const copy = { ...city };
		copy.countryId = countryId;
		copy.stateId = stateId;
		copy.regionId = regionId;
		setCity(copy);
	}, [countryId, stateId, regionId]);

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h3>Add a new city below</h3>
				<Stack gap={3}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							id='name'
							value={city.name}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>

					<Stack direction='horizontal' gap={3}>
						<CountryDropDown
							countryId={countryId}
							setCountryId={setCountryId}
						/>
						<StateDropDown
							stateId={stateId}
							setStateId={setStateId}
							countryId={countryId}
						/>
						<RegionDropDown
							setCountryId={setCountryId}
							setStateId={setStateId}
							regionId={regionId}
							setRegionId={setRegionId}
						/>
					</Stack>

					<Stack direction='horizontal' className='justify-content-between'>
						<Link to='/city'>Back to list</Link>
						<Stack direction='horizontal' gap={3}>
							<Button
								variant='outline-secondary'
								onClick={(e) => {
									e.preventDefault();
									navigate(`/city/${city.id}`);
								}}
							>
								Cancel
							</Button>
							<Button variant='primary' type='sumbit'>
								Save
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Form>
		</Container>
	);
};
