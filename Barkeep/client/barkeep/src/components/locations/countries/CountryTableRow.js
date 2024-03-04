export const CountryTableRow = ({ country }) => {
	return (
		<tr>
			<td>{country.id}</td>
			<td>{country.name}</td>
		</tr>
	);
};
