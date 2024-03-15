export const LinkTableRow = ({ link }) => {
	return (
		<tr>
			<td>{link.inAmount}</td>
			<td>{link?.inUnit?.name}</td>
			<td>{link?.inInventory?.component?.name}</td>
			<td>per</td>
			<td>{link.outAmount}</td>
			<td>{link?.outUnit?.name}</td>
			<td>{link?.outInventory?.component?.name}</td>
		</tr>
	);
};
