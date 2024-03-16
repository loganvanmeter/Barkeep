import { Table } from "react-bootstrap";
import { MenuTableRow } from "./MenuTableRow";

export const MenuList = ({ menus }) => {
	return (
		<Table striped>
			<thead>
				<tr>
					<th>Name</th>
					<th className='text-center'>Enabled</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{menus.map((menu) => {
					return <MenuTableRow key={menu.id} menu={menu} />;
				})}
			</tbody>
		</Table>
	);
};
