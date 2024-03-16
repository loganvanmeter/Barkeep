import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMenuById } from "../../managers/MenuManager";
import { BarAdminSideBar } from "../../nav/BarSideBar";
import { Button, Container, Modal, Stack } from "react-bootstrap";
import { AddMenuCategory } from "../menuCategories/AddMenuCategory";
import { MenuCategoryList } from "../menuCategories/MenuCategoryList";

export const MenuDashboard = () => {
	const bar = JSON.parse(localStorage.getItem("bar"));
	const { menuId } = useParams();
	const [menu, setMenu] = useState();
	const [showAddCategory, setShowAddCategory] = useState(false);

	const handleCloseAddCategory = () => setShowAddCategory(false);
	const handleShowAddCategory = () => setShowAddCategory(true);

	const getMenu = () => {
		return getMenuById(menuId).then((menu) => setMenu(menu));
	};

	useEffect(() => {
		getMenu();
	}, [menuId]);

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
								<MenuCategoryList categories={menu.menuCategories} />
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
								<Button>Add new item</Button>
								{menu && menu.menuItems.length ? "" : ""}
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</Container>
		</>
	);
};
