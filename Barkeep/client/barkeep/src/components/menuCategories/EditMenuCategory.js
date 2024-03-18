import { Button, Form, Stack } from "react-bootstrap";
import {
	getMenuCategoryById,
	updateMenuCategory,
} from "../../managers/MenuCategoryManager";
import { MenuCategoryDropDown } from "../forms/MenuCategoryDropDown";

export const EditMenuCategory = ({
	getMenu,
	handleCloseEditCategory,
	category,
	setCategory,
	menu,
}) => {
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

	const handleUpdate = (e) => {
		e.preventDefault();
		const copy = { ...category };
		copy.menuCategoryId = copy.menuCategoryId
			? parseInt(copy.menuCategoryId)
			: null;
		copy.parentCategory = null;
		return updateMenuCategory(copy)
			.then(() => getMenu(menu.id))
			.then(() => handleCloseEditCategory());
	};

	return (
		<Form onSubmit={handleUpdate}>
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
							Update menu category
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Form>
	);
};
