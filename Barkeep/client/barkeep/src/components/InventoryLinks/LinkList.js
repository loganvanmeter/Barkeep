import { Table } from "react-bootstrap";
import { LinkTableRow } from "./LinkTableRow";

export const LinkList = ({ links, getInventory }) => {
	return (
		<Table striped>
			<tbody>
				{links.map((link) => {
					return (
						<LinkTableRow
							key={link.id}
							link={link}
							getInventory={getInventory}
						/>
					);
				})}
			</tbody>
		</Table>
	);
};
