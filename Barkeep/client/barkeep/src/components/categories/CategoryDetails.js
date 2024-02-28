import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryById } from "../../managers/CategoryManager";
import { Category } from "./Category";
import { Container } from "react-bootstrap";

export const CategoryDetails = () => {
	const { categoryId } = useParams();
	const [category, setCategory] = useState({});

	const getCategory = () => {
		return getCategoryById(categoryId).then((res) => setCategory(res));
	};

	useEffect(() => {
		getCategory();
	}, [categoryId]);

	return (
		<Container>
			<Category category={category} />
		</Container>
	);
};
