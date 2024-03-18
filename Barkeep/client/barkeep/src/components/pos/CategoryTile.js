import { Stack } from "react-bootstrap";

export const CategoryTile = ({ category }) => {
	return (
		<Stack
			style={{
				minHeight: "5em",
				minWidth: "5em",
				maxHeight: "8em",
				maxWidth: "8em",
				backgroundColor: `${category.displayColor}`,
			}}
			className='justify-content-center align-items-center'
		>
			<div>{category.displayName}</div>
		</Stack>
	);
};
