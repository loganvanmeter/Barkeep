export const CategoryTableRow = ({ category }) => {
	return (
		<tr>
			<td>{category.id}</td>
			<td>{category.name}</td>
			<td>{category.description}</td>
		</tr>
	);
};
