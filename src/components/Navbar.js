import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function NavBar() {
	const { isAuth, setIsAuth } = useContext(UserContext);

	const login = () => {
		setIsAuth(true);
	};

	const logout = () => {
		setIsAuth(false);
	};

	return (
		<Navbar bg='dark' variant='dark'>
			<Link to='/'>
				<Navbar.Brand>Navbar</Navbar.Brand>
			</Link>
			<Nav className='mr-auto'>
				<Link to='/home'>Home</Link>
				<Link to='#features'>Features</Link>
				<Link to='#pricing'>Pricing</Link>
			</Nav>
			<Form inline>
				{isAuth ? (
					<Button variant='outline-info' onClick={logout}>
						Logout
					</Button>
				) : (
					<Button variant='outline-info' onClick={login}>
						Login
					</Button>
				)}
			</Form>
		</Navbar>
	);
}
