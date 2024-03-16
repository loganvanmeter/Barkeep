import { Form } from "react-bootstrap";

export const MenuCategoryDropDown = ({ categories, object, setter }) => {
	const handleChange = (e) => {
		e.preventDefault();
		const copy = { ...object };
		copy.menuCategoryId = e.target.value;
		setter(copy);
	};
	return (
		<Form.Select
			aria-label='Default select example'
			value={object.menuCategoryId}
			onChange={handleChange}
		>
			<option value={0}>Select menu category</option>
			{categories.map((category) => {
				return (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				);
			})}
		</Form.Select>
	);
};
