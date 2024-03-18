import { Form } from "react-bootstrap";
import { getMenuById } from "../../managers/MenuManager";

export const MenuDropDown = ({ menus, currentMenu, setCurrentMenu }) => {
	const handleChange = (e) => {
		e.preventDefault();
		getMenuById(e.target.value).then((menu) => setCurrentMenu(menu));
	};
	return (
		<Form.Select
			aria-label='Default select example'
			value={currentMenu.id}
			onChange={handleChange}
		>
			<option value={0}>Select a menu</option>
			{menus.map((menu) => {
				return (
					<option key={menu.id} value={menu.id}>
						{menu.name}
					</option>
				);
			})}
		</Form.Select>
	);
};
