import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMenuById } from "../../managers/MenuManager";
import { BarAdminSideBar } from "../../nav/BarSideBar";
import { Button, Container, Modal, Stack } from "react-bootstrap";
import { AddMenuCategory } from "../menuCategories/AddMenuCategory";
import { MenuCategoryList } from "../menuCategories/MenuCategoryList";
import { getMenuCategoryById } from "../../managers/MenuCategoryManager";
import { EditMenuCategory } from "../menuCategories/EditMenuCategory";
import { DeleteMenuCategory } from "../menuCategories/DeleteMenuCategory";
import { AddMenuItem } from "../menuItems/AddNewMenuItem";
import { MenuItemList } from "../menuItems/MenuItemList";
import { getMenuItemById } from "../../managers/MenuItemManager";
import { EditMenuItem } from "../menuItems/EditMenuItem";
import { getInventoryById } from "../../managers/InventoryManager";
import { getUnitById } from "../../managers/UnitManager";
import { DeleteMenuItem } from "../menuItems/DeleteMenuItem";

export const MenuDashboard = () => {
	const bar = JSON.parse(localStorage.getItem("bar"));
	const { menuId } = useParams();
	const [menu, setMenu] = useState();
	const [category, setCategory] = useState();
	const [menuItem, setMenuItem] = useState();
	const [showAddCategory, setShowAddCategory] = useState(false);
	const [showEditCategory, setShowEditCategory] = useState(false);
	const [showDeleteCategory, setShowDeleteCategory] = useState(false);
	const [showAddMenuItem, setShowAddMenuItem] = useState(false);
	const [showEditMenuItem, setShowEditMenuItem] = useState(false);
	const [showDeleteMenuItem, setShowDeleteMenuItem] = useState(false);
	const handleCloseAddCategory = () => setShowAddCategory(false);
	const handleShowAddCategory = () => setShowAddCategory(true);
	const handleCloseEditCategory = () => setShowEditCategory(false);
	const handleShowEditCategory = () => setShowEditCategory(true);
	const handleCloseDeleteCategory = () => setShowDeleteCategory(false);
	const handleShowDeleteCategory = () => setShowDeleteCategory(true);
	const handleCloseAddMenuItem = () => setShowAddMenuItem(false);
	const handleShowAddMenuItem = () => {
		setBuildParts([]);
		setShowAddMenuItem(true);
	};
	const handleCloseEditMenuItem = () => {
		setBuildParts([]);
		setShowEditMenuItem(false);
	};
	const handleShowEditMenuItem = () => setShowEditMenuItem(true);
	const handleCloseDeleteMenuItem = () => setShowDeleteMenuItem(false);
	const handleShowDeleteMenuItem = () => setShowDeleteMenuItem(true);

	const getMenu = (id) => {
		return getMenuById(id).then((menu) => setMenu(menu));
	};

	const getCategory = (id) => {
		return getMenuCategoryById(id).then((category) => setCategory(category));
	};

	const [buildParts, setBuildParts] = useState([]);
	const [showBuild, setShowBuild] = useState(false);
	const [numParts, setNumParts] = useState(0);
	const [partSuggestedPrices, setPartSuggestedPrices] = useState([]);
	const [suggestedPrice, setSuggestedPrice] = useState(0);

	const getMenuItem = (id) => {
		return getMenuItemById(id).then((item) => setMenuItem(item));
	};

	useEffect(() => {
		if (
			menuItem &&
			menuItem.id &&
			menuItem.build &&
			menuItem.build.id &&
			menuItem?.build?.parts &&
			menuItem?.build?.parts.length
		) {
			setBuildParts(menuItem.build.parts);
			setNumParts(menuItem.build.parts.length);
			let suggestedPrices = [];
			menuItem.build.parts.map((part) => {
				suggestedPrices.push(part?.inventory.suggestedPrice * part.amount);
			});
			setPartSuggestedPrices(suggestedPrices);
		}
	}, [menuItem]);

	useEffect(() => {
		if (partSuggestedPrices.length) {
			let totalSuggestedPrice = 0;
			partSuggestedPrices.forEach((price) => {
				totalSuggestedPrice += price;
			});
			setSuggestedPrice(totalSuggestedPrice);
		}
	}, [partSuggestedPrices]);

	useEffect(() => {
		getMenu(menuId);
	}, [menuId]);

	const handleArrayChange = (index, object) => {
		let copy = [...buildParts];
		let copyPrices = [...partSuggestedPrices];
		const copyObject = { ...object };

		copyObject.amount = copyObject.amount ? parseFloat(copyObject.amount) : 0;
		copyObject.order = copyObject.order
			? parseInt(copyObject.order)
			: index + 1;
		copy[index] = copyObject;
		setBuildParts(copy);
		if (copyObject.amount && copyObject.unitId && copyObject.inventoryId) {
			return getInventoryById(copyObject.inventoryId).then((inventory) =>
				getUnitById(copyObject.unitId).then((unit) => {
					const thisSuggestedPrice =
						inventory.suggestedPrice *
						copyObject.amount *
						unit.size *
						unit.imperialConversion;
					copyPrices[index] = thisSuggestedPrice;
					setPartSuggestedPrices(copyPrices);
				})
			);
		}
	};

	const handleRemove = (index) => {
		let copy = [...buildParts];
		let copyPrices = [...partSuggestedPrices];
		let numCopy = numParts;
		numCopy--;
		setNumParts(numCopy);
		copy.splice(index, 1);
		copyPrices.splice(index, 1);
		setBuildParts(copy);
		setPartSuggestedPrices(copyPrices);
	};

	return (
		<>
			<BarAdminSideBar bar={bar} />
			<Modal show={showAddCategory} onHide={handleCloseAddCategory}>
				<Modal.Header closeButton>
					<Modal.Title>Add Menu Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddMenuCategory
						getMenu={getMenu}
						handleCloseAddCategory={handleCloseAddCategory}
						menu={menu}
					/>
				</Modal.Body>
			</Modal>
			<Modal show={showEditCategory} onHide={handleCloseEditCategory}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Menu Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EditMenuCategory
						menu={menu}
						getMenu={getMenu}
						handleCloseEditCategory={handleCloseEditCategory}
						category={category}
						setCategory={setCategory}
					/>
				</Modal.Body>
			</Modal>
			<Modal show={showDeleteCategory} onHide={handleCloseDeleteCategory}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Menu Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<DeleteMenuCategory
						getMenu={getMenu}
						category={category}
						handleCloseDeleteCategory={handleCloseDeleteCategory}
					/>
				</Modal.Body>
			</Modal>
			<Modal size='lg' show={showAddMenuItem} onHide={handleCloseAddMenuItem}>
				<Modal.Header closeButton>
					<Modal.Title>Add Menu Item</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddMenuItem
						getMenu={getMenu}
						menu={menu}
						handleCloseAddMenuItem={handleCloseAddMenuItem}
						buildParts={buildParts}
						setBuildParts={setBuildParts}
						numParts={numParts}
						setNumParts={setNumParts}
						suggestedPrice={suggestedPrice}
						handleArrayChange={handleArrayChange}
						handleRemove={handleRemove}
						showBuild={showBuild}
						setShowBuild={setShowBuild}
					/>
				</Modal.Body>
			</Modal>
			<Modal size='lg' show={showEditMenuItem} onHide={handleCloseEditMenuItem}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Menu Item</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EditMenuItem
						menu={menu}
						getMenu={getMenu}
						menuItem={menuItem}
						setMenuItem={setMenuItem}
						handleCloseEditMenuItem={handleCloseEditMenuItem}
						buildParts={buildParts}
						setBuildParts={setBuildParts}
						numParts={numParts}
						setNumParts={setNumParts}
						suggestedPrice={suggestedPrice}
						handleArrayChange={handleArrayChange}
						handleRemove={handleRemove}
						showBuild={showBuild}
						setShowBuild={setShowBuild}
					/>
				</Modal.Body>
			</Modal>
			<Modal show={showDeleteMenuItem} onHide={handleCloseDeleteMenuItem}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Menu Item</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<DeleteMenuItem
						getMenu={getMenu}
						item={menuItem}
						handleCloseDeleteMenuItem={handleCloseDeleteMenuItem}
					/>
				</Modal.Body>
			</Modal>
			<Container>
				<Stack gap={3}>
					<h4>{menu ? menu.name : ""} Dashboard</h4>
					<Stack direction='horizontal' gap={5} className='flex-wrap'>
						<Stack gap={3}>
							<Stack
								direction='horizontal'
								className='justify-content-between flex-wrap'
							>
								<h5>Menu Categories</h5>
								<Button
									onClick={(e) => {
										e.preventDefault();
										handleShowAddCategory();
									}}
								>
									Add new category
								</Button>
							</Stack>
							{menu && menu.menuCategories.length ? (
								<MenuCategoryList
									categories={menu.menuCategories}
									getCategory={getCategory}
									handleShowEditCategory={handleShowEditCategory}
									handleShowDeleteCategory={handleShowDeleteCategory}
								/>
							) : (
								""
							)}
						</Stack>

						<Stack gap={3}>
							<Stack
								direction='horizontal'
								className='justify-content-between flex-wrap'
							>
								<h5>Menu Items</h5>
								<Button
									onClick={(e) => {
										e.preventDefault();
										handleShowAddMenuItem();
									}}
								>
									Add new item
								</Button>
							</Stack>
							{menu && menu.menuItems.length ? (
								<MenuItemList
									items={menu.menuItems}
									getItem={getMenuItem}
									handleShowEditMenuItem={handleShowEditMenuItem}
									handleShowDeleteMenuItem={handleShowDeleteMenuItem}
								/>
							) : (
								""
							)}
						</Stack>
					</Stack>
				</Stack>
			</Container>
		</>
	);
};
