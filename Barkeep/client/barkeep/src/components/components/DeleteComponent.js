import { useNavigate, useParams } from "react-router-dom";
import { getComponentCategoriesByComponentId } from "../../managers/ComponentCategoryManager";
import {
	deleteComponent,
	getComponentById,
} from "../../managers/ComponentManager";
import { useEffect, useState } from "react";
import {
	Alert,
	Button,
	Card,
	Container,
	ListGroup,
	Stack,
} from "react-bootstrap";
import { ComponentCategoryBadge } from "../componentCategories/ComponentCategoryBadge";

export const DeleteComponent = () => {
	const { componentId } = useParams();
	const [component, setComponent] = useState({});
	const [componentCategories, setComponentCategories] = useState([]);
	const navigate = useNavigate();
	const siteAdmin = JSON.parse(localStorage.getItem("siteAdmin"));
	const getComponent = () => {
		return getComponentById(componentId).then((res) => setComponent(res));
	};
	const handleDelete = (e) => {
		e.preventDefault();
		return deleteComponent(component.id).then(() => navigate("/component"));
	};

	useEffect(() => {
		getComponent();
	}, [componentId]);

	useEffect(() => {
		getComponentCategoriesByComponentId(componentId).then((categories) =>
			setComponentCategories(categories)
		);
	}, [componentId]);

	return (
		<Container>
			<Stack gap={3}>
				<Alert variant='danger'>
					<Alert.Heading>
						WARNING: You are about to delete the following component
					</Alert.Heading>
					<p>
						Deleting this component will also delete all inventory, menu items,
						and modifiers marked with this component. It is best practice to
						EDIT the component instead to preserve the integrity of the software
						and it's systems.
					</p>
					<hr />
					<Stack direction='horizontal' className='justify-content-end'>
						<Button
							variant='secondary'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/component/${componentId}/edit`);
							}}
						>
							Edit component instead
						</Button>
					</Stack>
				</Alert>
				<Card>
					<Card.Header>
						<Stack direction='horizontal' className='justify-content-between'>
							<Stack>{`Component #: ${component.id}`}</Stack>
							<Stack gap={1} className='align-items-end'>
								<div>
									{component.isAdminApproved ? "Approved" : "Not Approved"}
								</div>
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
						<ListGroup.Item>
							Type: {component?.componentType?.name}
						</ListGroup.Item>
						{component.producerId ? (
							<ListGroup.Item>
								Producer: {component?.producer?.name}
							</ListGroup.Item>
						) : (
							""
						)}
						{component.importerId ? (
							<ListGroup.Item>
								Importer: {component?.importer?.name}
							</ListGroup.Item>
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
							<ListGroup.Item>
								Country: {component?.country?.name}
							</ListGroup.Item>
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
								<Stack gap={3} direction='horizontal'>
									<Button
										variant='primary'
										onClick={(e) => {
											e.preventDefault();
											navigate(`/component/${component.id}`);
										}}
									>
										Cancel
									</Button>
									<Button variant='danger' onClick={handleDelete}>
										Confirm Delete
									</Button>
								</Stack>
							) : (
								""
							)}
						</Stack>
					</Card.Footer>
				</Card>
			</Stack>
		</Container>
	);
};
