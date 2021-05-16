import React, { useState, useMemo } from 'react';
import './App.css';
import Home from './pages/Home';
import BandInfo from './pages/BandInfo';
import Login from './pages/Login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.js';
import { UserContext } from './context/UserContext';

function App() {
	const [isAuth, setIsAuth] = useState(false);

	const value = useMemo(() => ({ isAuth, setIsAuth }), [isAuth, setIsAuth]);
	return (
		<UserContext.Provider value={value}>
			<Router>
				<Switch>
					<ProtectedRoute path='/home' component={Home} />
					<ProtectedRoute path='/bands/:id' component={BandInfo} />
					<Route path='/' exact component={Login} />
				</Switch>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
