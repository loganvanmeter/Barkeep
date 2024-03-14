import { Container, Form } from "react-bootstrap";

export const Search = ({ setSearchTerms }) => {
	return (
		<Container>
			<Form>
				<Form.Group controlId='search'>
					<Form.Control
						type='text'
						placeholder='Search...'
						onChange={(e) => {
							setSearchTerms(e.target.value);
						}}
					/>
					<Form.Text>
						{window.location.pathname.endsWith("inventory")
							? "The search will match any inventory name"
							: "The search will match any name or description"}
					</Form.Text>
				</Form.Group>
			</Form>
		</Container>
	);
};
