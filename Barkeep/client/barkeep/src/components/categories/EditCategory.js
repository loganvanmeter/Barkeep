export const EditCategory = () => {
	const { categoryId } = useParams();

	const getCategory = () => {
		return getCategoryById(categoryId);
	};
};
