import { Container, Table } from "react-bootstrap";
import { CategoryTableRow } from "./CategoryTableRow";

export const CategoryList = ({ filteredCategories }) => {
	return (
		<Container>
			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{filteredCategories.map((category) => {
						return <CategoryTableRow category={category} key={category.id} />;
					})}
				</tbody>
			</Table>
		</Container>
	);
};
