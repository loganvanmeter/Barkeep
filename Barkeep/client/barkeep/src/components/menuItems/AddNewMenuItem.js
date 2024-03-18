import { Button, Form, Stack } from "react-bootstrap";
import { addMenuItem } from "../../managers/MenuItemManager";
import { BuildPartForm } from "../buildParts/BuildPartForm";
import { useEffect, useState } from "react";
import { MenuCategoryDropDown } from "../forms/MenuCategoryDropDown";
import { addBuild } from "../../managers/BuildManager";
import { addBuildPart } from "../../managers/BuildPart";

export const AddMenuItem = ({
	menu,
	getMenu,
	handleCloseAddMenuItem,
	buildParts,
	setBuildParts,
	numParts,
	suggestedPrice,
	handleArrayChange,
	handleRemove,
	showBuild,
	setShowBuild,
	setNumParts,
}) => {
	const [menuItem, setMenuItem] = useState({
		menuId: menu.id,
		name: "",
		displayName: "",
		menuCategoryId: "",
		price: 0,
		enabled: true,
		notes: "",
	});

	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...menuItem };
		copy[e.target.id] = e.target.value;
		setMenuItem(copy);
	};

	const handleCheckbox = (e) => {
		const copy = { ...menuItem };
		copy[e.target.id] = e.target.checked;
		setMenuItem(copy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const copy = { ...menuItem };
		copy.menuCategoryId = copy.menuCategoryId
			? parseInt(copy.menuCategoryId)
			: null;
		copy.displayName = copy.displayName ? copy.displayName : copy.name;
		copy.price = parseFloat(copy.price);
		if (copy.name && copy.price) {
			return addMenuItem(copy)
				.then((res) => res.json())
				.then((newMenuItem) => {
					const build = {
						menuItemId: newMenuItem.id,
					};
					return addBuild(build)
						.then((res) => res.json())
						.then((newBuild) => {
							const copyParts = [...buildParts];
							copyParts.map(async (part) => {
								part.buildId = newBuild.id;
								console.log(part);
								let res;
								try {
									res = await addBuildPart(part);
								} catch (e) {
									res = console.log(e);
								}
								const newPart = res.json();
								return console.log(newPart);
							});
						});
				})
				.then(() => getMenu(menu.id))
				.then(() => handleCloseAddMenuItem());
		}
	};

	useEffect(() => {
		let copy = [...buildParts];
		for (let i = buildParts.length; i < numParts; i++) {
			copy.push({
				buildId: 0,
				amount: 0,
				unitId: 0,
				inventoryId: 0,
				order: 0,
				isPrimary: false,
			});
		}
		setBuildParts(copy);
	}, [numParts]);

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
								value={menuItem.name}
								onChange={handleChange}
							/>
						</Form.Group>
					</Stack>
					{menu.menuCategories.length ? (
						<Stack>
							<Form.Group>
								<Form.Label>Parent Menu Category</Form.Label>
								<MenuCategoryDropDown
									object={menuItem}
									setter={setMenuItem}
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
								placeholder={
									menuItem.displayName ? menuItem.displayName : menuItem.name
								}
								value={menuItem.displayName}
								onChange={handleChange}
							/>
						</Form.Group>
					</Stack>

					<Stack>
						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								id='price'
								value={menuItem.price}
								onChange={handleChange}
							/>
						</Form.Group>
					</Stack>
					<Stack
						direction='horizontal'
						gap={3}
						className='justify-content-end align-items-end'
					>
						<h5 className='my-2'>Suggested Price:</h5>
						<h5 className='my-2'>{`$${suggestedPrice.toFixed(2)}`}</h5>
					</Stack>
				</Stack>

				<Stack gap={3}>
					<Stack
						direction='horizontal'
						className='align-items-end justify-content-between'
					>
						<Form.Check type='checkbox' id=''>
							<Stack direction='horizontal' gap={2}>
								<Form.Check.Label>Enable</Form.Check.Label>
								<Form.Check.Input
									type='checkbox'
									id='enabled'
									checked={menuItem.enabled}
									onChange={handleCheckbox}
								/>
							</Stack>
						</Form.Check>
						<Form.Check type='checkbox' id=''>
							<Stack direction='horizontal' gap={2}>
								<Form.Check.Label>Add build to menu item</Form.Check.Label>
								<Form.Check.Input
									type='checkbox'
									id='showBuild'
									checked={showBuild}
									onChange={(e) => {
										setShowBuild(e.target.checked);
									}}
								/>
							</Stack>
						</Form.Check>
					</Stack>
					<Stack>
						<Form.Group>
							<Form.Label>Notes</Form.Label>
							<Form.Control
								as='textarea'
								rows={5}
								id='notes'
								value={menuItem.notes}
								onChange={handleChange}
							/>
						</Form.Group>
					</Stack>
					{showBuild ? (
						<Stack>
							<Stack
								gap={3}
								direction='horizontal'
								className='justify-content-between'
							>
								<h4>Build</h4>
								<Button
									variant='primary'
									onClick={(e) => {
										e.preventDefault();
										let copy = numParts;
										copy++;
										setNumParts(copy);
									}}
								>
									Add New Part
								</Button>
							</Stack>
							<Stack gap={3}>
								{buildParts && buildParts.length
									? [...buildParts].map((buildPart, index) => {
											return (
												<BuildPartForm
													key={index + 1}
													index={index}
													part={buildPart}
													setter={handleArrayChange}
													handleRemove={handleRemove}
												/>
											);
									  })
									: ""}
							</Stack>
						</Stack>
					) : (
						""
					)}
					<Stack>
						<Button type='submit' variant='primary'>
							Add menu item
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Form>
	);
};
