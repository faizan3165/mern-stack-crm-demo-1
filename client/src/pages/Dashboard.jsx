import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { TicketCard } from '../components';
import CategoriesContext from '../context/CategoriesContext';

const Dashboard = () => {
	const [
		tickets,
		setTickets
	] = useState(null);

	const {categories, setCategories}  = useContext(CategoriesContext); 

	useEffect(() => {
		fetchData();
	}, []);
	
	useEffect(() => {
		getCategories();
	},[tickets])

	const fetchData = async () => {
		const response = await axios.get('http://localhost:5000/tickets');

		const dataObject = await response.data.data;

		const keyArray = Object.keys(dataObject);
		const dataArray = Object.keys(dataObject).map((key) => dataObject[key]);
		const formattedDataArray = [];

		keyArray.forEach((key, index) => {
			const formattedData = { ...dataArray[index] };
			formattedData['documentId'] = key;
			formattedDataArray.push(formattedData);
		});

		setTickets(formattedDataArray);
	};

	const getCategories = async () => {
		setCategories([...new Set(tickets?.map(({category}) => category))])
	}

	const colors = [
		'rgb(255,179,286)',
		'rgb(255,223,186)',
		'rgb(255,255,186)',
		'rgb(186,255,201)',
		'rgb(486,255,255)',
		'rgb(286,245,45)',
		'rgb(186,235,250)',
		'rgb(45,255,255)',
		'rgb(255,155,55)',
		'rgb(255,55,250)',
		'rgb(200,250,205)',
		'rgb(386,200,155)',
		'rgb(2,155,155)',
		'rgb(155,155,255)',
		'rgb(200,200,20)'
	];

	const uniqueCategories = [
		...new Set(tickets?.map(({ category }) => category))
	];

	return (
		<div className='dashboard'>
			<h1>My Projects</h1>

			<div className='ticker-container'>
				{tickets &&
					uniqueCategories?.map((uniqueCategory, categoryIndex) => {
						return (
							<div key={categoryIndex}>
								<h3>{uniqueCategory}</h3>

								{tickets
									.filter((ticket) => ticket.category === uniqueCategory)
									.map((filteredTicket, _index) => {
										return (
											<TicketCard
												id={_index}
												key={_index}
												color={colors[categoryIndex]}
												ticket={filteredTicket}
											/>
										);
									})}
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Dashboard;
