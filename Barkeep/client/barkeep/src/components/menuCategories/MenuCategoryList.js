import { Table } from "react-bootstrap";
import { MenuCategoryTableRow } from "./MenuCategoryTableRow";

export const MenuCategoryList = ({ categories }) => {
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
					return <MenuCategoryTableRow category={category} key={category.id} />;
				})}
			</tbody>
		</Table>
	);
};
