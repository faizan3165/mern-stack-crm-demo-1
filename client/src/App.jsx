import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Dashboard, TicketPage } from './pages';
import { Navbar } from './components';
import CategoriesContext from './context/CategoriesContext';

const App = () => {
	const [
		categories,
		setCategories
	] = useState(null);

	const value = {
		categories,
		setCategories
	};

	return (
		<div className='app'>
			<CategoriesContext.Provider value={value}>
				<Router>
					<Navbar />
					<Routes>
						<Route path='/' element={<Dashboard />} />
						<Route path='/ticket' element={<TicketPage />} />
						<Route path='/ticket/:id' element={<TicketPage editMode={true} />} />
					</Routes>
				</Router>
			</CategoriesContext.Provider>
		</div>
	);
};

export default App;
