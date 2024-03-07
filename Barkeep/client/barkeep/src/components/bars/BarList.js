import { useEffect, useState } from "react";
import { getAllBars, getAllBarsByUserId } from "../../managers/BarManager";
import { Button, Container, Stack, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BarTableRow } from "./BarTableRow";

export const BarList = () => {
	const [bars, setBars] = useState([]);
	const navigate = useNavigate();
	const accountAdmin = JSON.parse(localStorage.getItem("accountAdmin"));

	const getMyBars = () => {
		return getAllBarsByUserId(accountAdmin.id).then((res) => setBars(res));
	};

	useEffect(() => {
		getMyBars();
	}, []);

	return (
		<Container>
			<Stack gap={3}>
				<h2>Bars</h2>
				<Container className='d-flex justify-content-end'>
					<Button
						variant='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate("/bar/add");
						}}
					>
						Add new bar
					</Button>
				</Container>
				<Table striped>
					<thead>
						<tr>
							<th>Name</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{bars.map((bar) => {
							return <BarTableRow bar={bar} key={bar.id} />;
						})}
					</tbody>
				</Table>
			</Stack>
		</Container>
	);
};
