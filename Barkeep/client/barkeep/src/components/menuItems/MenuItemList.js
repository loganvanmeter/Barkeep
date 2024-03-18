import { Table } from "react-bootstrap";
import { MenuItemTableRow } from "./MenuItemTableRow";

export const MenuItemList = ({
	items,
	getItem,
	handleShowEditMenuItem,
	handleShowDeleteMenuItem,
}) => {
	return (
		<Table striped>
			<thead>
				<tr>
					<th>Name</th>
					<th>Category</th>
					<th>Price</th>
					<th className='text-center'>Enabled</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{items.map((item) => {
					return (
						<MenuItemTableRow
							item={item}
							key={item.id}
							getItem={getItem}
							handleShowEditMenuItem={handleShowEditMenuItem}
							handleShowDeleteMenuItem={handleShowDeleteMenuItem}
						/>
					);
				})}
			</tbody>
		</Table>
	);
};
