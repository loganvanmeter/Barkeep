import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBarMenus } from "../../managers/MenuManager";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { MenuDropDown } from "../forms/MenuDropDown";
import { CategoryTile } from "../pos/CategoryTile";

export const POSDashboard = () => {
	const { barId } = useParams();
	const [menus, setMenus] = useState([]);
	const [currentMenu, setCurrentMenu] = useState([]);
	const [menuCategories, setMenuCategories] = useState([]);
	const [currentCategory, setCurrentCategory] = useState([]);
	const [menuItems, setMenuItems] = useState([]);

	useEffect(() => {
		getBarMenus(barId).then((menus) => {
			setCurrentMenu(menus[0]);
			setMenus(menus);
		});
	}, [barId]);

	return (
		<Stack
			style={{
				width: "100vw",
				height: "100vh",
			}}
			className='justify-content-center'
			gap={3}
		>
			<Stack direction='horizontal' className='pt-2 px-2'>
				<MenuDropDown
					menus={menus}
					currentMenu={currentMenu}
					setCurrentMenu={setCurrentMenu}
				/>
			</Stack>

			<Stack
				id='selection'
				className='border-end'
				style={{
					height: "100%",
					width: "50%",
				}}
			>
				<Stack
					direction='horizontal'
					id='categories'
					className='flex-wrap px-2'
					gap={1}
				>
					{currentMenu &&
					currentMenu?.menuCategories &&
					currentMenu.menuCategories.length
						? currentMenu.menuCategories.map((category) => {
								if (category?.parentCategory == null) {
									return <CategoryTile category={category} key={category.id} />;
								}
						  })
						: ""}
				</Stack>
				<Stack id='menuItems'></Stack>
			</Stack>
			<Stack id='orders'></Stack>
		</Stack>
	);
};
