import { useEffect } from "react";
import { useState } from "react";
import { getAllApprovedCategories } from "../../managers/CategoryManager";
import { Container, Table } from "react-bootstrap";
import { CategoryTableRow } from "./CategoryTableRow";

export const CategoryContainer = () => {
	const [categories, setCategories] = useState([]);

	const getApprovedCategories = () => {
		return getAllApprovedCategories().then((res) => setCategories(res));
	};
	useEffect(() => {
		getApprovedCategories();
	}, []);

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
					{categories.map((category) => {
						return <CategoryTableRow category={category} key={category.id} />;
					})}
				</tbody>
			</Table>
		</Container>
	);
};
