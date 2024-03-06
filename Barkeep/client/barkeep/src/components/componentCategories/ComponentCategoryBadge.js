import { Badge } from "react-bootstrap";

export const ComponentCategoryBadge = ({ componentCategory }) => {
	return (
		<Badge pill bg='primary'>
			{componentCategory?.category?.name}
		</Badge>
	);
};
