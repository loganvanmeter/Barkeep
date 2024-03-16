import { useState } from "react";
import { Button, Form, FormGroup, Stack } from "react-bootstrap";
import { addMenu } from "../../managers/MenuManager";
import { useNavigate } from "react-router-dom";

export const AddMenu = () => {
	const bar = JSON.parse(localStorage.getItem("bar"));
	const navigate = useNavigate();
	const [menu, setMenu] = useState({
		barId: bar.id,
		name: "",
		createDateTime: null,
		enabled: true,
	});

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...menu };
		copy[e.target.id] = e.target.value;
		setMenu(copy);
	};

	const handleCheckbox = (e) => {
		const copy = { ...menu };
		copy[e.target.id] = e.target.checked;
		setMenu(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...menu };
		copy.createDateTime = new Date();
		addMenu(copy)
			.then((res) => res.json())
			.then((newMenu) => navigate(`/bar/${bar.id}/menu/${newMenu.id}`));
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={3}>
				<FormGroup>
					<Form.Label>Menu Name</Form.Label>
					<Form.Control type='text' id='name' onChange={handleChange} />
				</FormGroup>
				<Stack className='align-items-end justify-content-center'>
					<Form.Check type='checkbox' id=''>
						<Stack direction='horizontal' gap={2}>
							<Form.Check.Label>Enable</Form.Check.Label>
							<Form.Check.Input
								type='checkbox'
								id='enabled'
								checked={menu.enabled}
								onChange={handleCheckbox}
							/>
						</Stack>
					</Form.Check>
				</Stack>
				<Stack>
					<Button type='submit' variant='primary'>
						Add menu
					</Button>
				</Stack>
			</Stack>
		</Form>
	);
};
