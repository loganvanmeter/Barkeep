import { Container, Table } from "react-bootstrap";
import { CountryTableRow } from "./CountryTableRow";

export const CountryList = ({ filteredCountries }) => {
	return (
		<Container>
			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{filteredCountries.map((country) => {
						return <CountryTableRow country={country} key={country.id} />;
					})}
				</tbody>
			</Table>
		</Container>
	);
};
