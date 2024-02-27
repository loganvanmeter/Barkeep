import { Container, Form } from "react-bootstrap";

export const Search = ({ setSearchTerms }) => {
	return (
		<Container className='mb-3'>
			<Form>
				<Form.Group controlId='search'>
					<Form.Control
						type='text'
						placeholder='Search...'
						onChange={(e) => {
							e.preventDefault();
							setSearchTerms(e.target.value);
						}}
					/>
					<Form.Text>The search will match any name or description</Form.Text>
				</Form.Group>
			</Form>
		</Container>
	);
};
