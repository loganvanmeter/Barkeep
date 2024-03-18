import { Table } from "react-bootstrap";
import { MenuCategoryTableRow } from "./MenuCategoryTableRow";

export const MenuCategoryList = ({
	categories,
	getCategory,
	handleShowEditCategory,
	handleShowDeleteCategory,
}) => {
	return (
		<Table striped>
			<thead>
				<tr>
					<th>Name</th>
					<th>Parent Category</th>
					<th className='text-center'>Color</th>
					<th className='text-center'>Enabled</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{categories.map((category) => {
					return (
						<MenuCategoryTableRow
							category={category}
							key={category.id}
							getCategory={getCategory}
							handleShowEditCategory={handleShowEditCategory}
							handleShowDeleteCategory={handleShowDeleteCategory}
						/>
					);
				})}
			</tbody>
		</Table>
	);
};
