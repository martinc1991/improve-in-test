import React, { useState, useMemo } from 'react';
import './App.css';
import Home from './pages/Home';
import BandInfo from './pages/BandInfo';
import Login from './pages/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.js';
import NavBar from './components/Navbar';
import { UserContext } from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [isAuth, setIsAuth] = useState(false);

	const value = useMemo(() => ({ isAuth, setIsAuth }), [isAuth, setIsAuth]);
	return (
		<UserContext.Provider value={value}>
			<Router>
				<NavBar></NavBar>
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
