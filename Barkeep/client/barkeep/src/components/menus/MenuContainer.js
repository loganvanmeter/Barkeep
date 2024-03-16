import { Button, Container, Stack } from "react-bootstrap";
import { BarAdminSideBar } from "../../nav/BarSideBar";
import { AddMenu } from "./AddMenu";
import { useEffect, useState } from "react";
import { MenuList } from "./MenuList";
import { getBarMenus } from "../../managers/MenuManager";
import { useParams } from "react-router-dom";

export const MenuContainer = () => {
	const { barId } = useParams();
	const bar = JSON.parse(localStorage.getItem("bar"));
	const [showAddMenu, setShowAddMenu] = useState(false);
	const [menus, setMenus] = useState([]);

	const getThisBarMenus = () => {
		return getBarMenus(barId).then((menus) => setMenus(menus));
	};

	useEffect(() => {
		getThisBarMenus();
	}, [barId]);

	return (
		<>
			<BarAdminSideBar bar={bar} />
			<Container>
				<Stack gap={5}>
					<Stack direction='horizontal' className='justify-content-between'>
						<h2>Menu Management</h2>
						{!showAddMenu ? (
							<Button
								onClick={(e) => {
									e.preventDefault();
									setShowAddMenu(true);
								}}
							>
								Add new menu
							</Button>
						) : (
							""
						)}
					</Stack>

					{showAddMenu ? (
						<Stack>
							<AddMenu setShowAddMenu={setShowAddMenu} />
						</Stack>
					) : (
						""
					)}
					{menus && menus.length ? <MenuList menus={menus} /> : ""}
				</Stack>
			</Container>
		</>
	);
};
