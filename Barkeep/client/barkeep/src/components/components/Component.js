import { useEffect, useState } from "react";
import { Button, Card, ListGroup, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getComponentCategoriesByComponentId } from "../../managers/ComponentCategoryManager";
import { ComponentCategoryBadge } from "../componentCategories/ComponentCategoryBadge";

export const Component = ({ component, componentId }) => {
	const [componentCategories, setComponentCategories] = useState([]);
	const navigate = useNavigate();
	const siteAdmin = JSON.parse(localStorage.getItem("siteAdmin"));

	useEffect(() => {
		getComponentCategoriesByComponentId(componentId).then((categories) =>
			setComponentCategories(categories)
		);
	}, [componentId]);

	return (
		<Card>
			<Card.Header>
				<Stack direction='horizontal' className='justify-content-between'>
					<Stack>{`Component #: ${component.id}`}</Stack>
					<Stack gap={1} className='align-items-end'>
						<div>{component.isAdminApproved ? "Approved" : "Not Approved"}</div>
					</Stack>
				</Stack>
			</Card.Header>
			<Card.Body>
				<Card.Title>{component.name}</Card.Title>
				<Card.Text>
					{component.description
						? component.description
						: "No description for this component has been added."}
				</Card.Text>
			</Card.Body>
			<ListGroup className='list-group-flush'>
				<ListGroup.Item>Type: {component?.componentType?.name}</ListGroup.Item>
				{component.producerId ? (
					<ListGroup.Item>Producer: {component?.producer?.name}</ListGroup.Item>
				) : (
					""
				)}
				{component.importerId ? (
					<ListGroup.Item>Importer: {component?.importer?.name}</ListGroup.Item>
				) : (
					""
				)}
				{component.year ? (
					<ListGroup.Item>Year: {component.year}</ListGroup.Item>
				) : (
					""
				)}
				{component.cityId ? (
					<ListGroup.Item>City: {component?.city?.name}</ListGroup.Item>
				) : (
					""
				)}
				{component.regionId ? (
					<ListGroup.Item>Region: {component?.region?.name}</ListGroup.Item>
				) : (
					""
				)}
				{component.stateId ? (
					<ListGroup.Item>State: {component?.state?.name}</ListGroup.Item>
				) : (
					""
				)}
				{component.countryId ? (
					<ListGroup.Item>Country: {component?.country?.name}</ListGroup.Item>
				) : (
					""
				)}
			</ListGroup>
			<Card.Body>
				<Card.Subtitle>Categories</Card.Subtitle>
				<Card.Text>
					<Stack direction='horizontal' gap={1}>
						{componentCategories.length
							? componentCategories.map((componentCategory) => (
									<ComponentCategoryBadge
										key={componentCategory.id}
										componentCategory={componentCategory}
									/>
							  ))
							: "No categories assigned"}
					</Stack>
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				<Stack direction='horizontal' className='justify-content-between'>
					<Card.Link href='/component'>Back to list</Card.Link>
					{siteAdmin ? (
						<>
							<Stack gap={3} direction='horizontal'>
								<Button
									variant='primary'
									onClick={(e) => {
										e.preventDefault();
										navigate(`/component/${component.id}/edit`);
									}}
								>
									Edit
								</Button>
								<Button
									variant='danger'
									onClick={(e) => {
										e.preventDefault();
										navigate(`/component/${component.id}/delete`);
									}}
								>
									Delete
								</Button>
							</Stack>
						</>
					) : (
						""
					)}
				</Stack>
			</Card.Footer>
		</Card>
	);
};
