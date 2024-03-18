import { BuildPartForm } from "../buildParts/BuildPartForm";
import { Button, Form, Stack } from "react-bootstrap";
import { MenuCategoryDropDown } from "../forms/MenuCategoryDropDown";

export const EditMenuItem = ({
	menu,
	getMenu,
	menuItem,
	setMenuItem,
	handleCloseEditMenuItem,
	buildParts,
	setBuildParts,
	numParts,
	setNumParts,
	suggestedPrice,
	handleArrayChange,
	handleRemove,
	showBuild,
	setShowBuild,
}) => {
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

	return (
		<Form>
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
								value={menuItem.price.toFixed(2)}
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
