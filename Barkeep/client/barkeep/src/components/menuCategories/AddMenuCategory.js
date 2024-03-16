import { useState } from "react";
import { Button, Form, FormGroup, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { MenuCategoryDropDown } from "../forms/MenuCategoryDropDown";
import { addMenuCategory } from "../../managers/MenuCategoryManager";

export const AddMenuCategory = ({ getMenu, handleCloseAddCategory, menu }) => {
	const [category, setCategory] = useState({
		name: "",
		displayName: "",
		displayColor: "#e6e6e6",
		menuId: menu.id,
		enabled: true,
		menuCategoryId: 0,
		createDateTime: null,
	});

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...category };
		copy[e.target.id] = e.target.value;
		setCategory(copy);
	};

	const handleCheckbox = (e) => {
		const copy = { ...category };
		copy[e.target.id] = e.target.checked;
		setCategory(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...category };
		copy.menuCategoryId = copy.menuCategoryId ? copy.menuCategoryId : null;
		copy.createDateTime = new Date();
		addMenuCategory(copy)
			.then((res) => res.json())
			.then(() => getMenu())
			.then(() => handleCloseAddCategory());
	};
	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={3}>
				<Stack direction='horizontal' gap={3} className='flex-wrap'>
					<Stack>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								id='name'
								value={category.name}
								onChange={handleChange}
							/>
						</Form.Group>
					</Stack>
					{menu.menuCategories.length ? (
						<Stack>
							<Form.Group>
								<Form.Label>Parent Menu Category</Form.Label>
								<MenuCategoryDropDown
									object={category}
									setter={setCategory}
									categories={menu.menuCategories}
								/>
							</Form.Group>
						</Stack>
					) : (
						""
					)}
				</Stack>
				<Stack direction='horizontal' gap={3} className='flex-wrap'>
					<Stack>
						<Form.Group>
							<Form.Label>Display Name</Form.Label>
							<Form.Control
								type='text'
								id='displayName'
								value={category.displayName}
								onChange={handleChange}
							/>
						</Form.Group>
					</Stack>
					<Stack>
						<Form.Group>
							<Form.Label>Display Color</Form.Label>
							<Form.Control
								type='color'
								id='displayColor'
								value={category.displayColor}
								onChange={handleChange}
								style={{
									width: "100%",
								}}
							/>
						</Form.Group>
					</Stack>
				</Stack>
				<Stack gap={3}>
					<Stack className='align-items-end justify-content-center'>
						<Form.Check type='checkbox' id=''>
							<Stack direction='horizontal' gap={2}>
								<Form.Check.Label>Enable</Form.Check.Label>
								<Form.Check.Input
									type='checkbox'
									id='enabled'
									checked={category.enabled}
									onChange={handleCheckbox}
								/>
							</Stack>
						</Form.Check>
					</Stack>
					<Stack>
						<Button type='submit' variant='primary'>
							Add menu category
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Form>
	);
};
