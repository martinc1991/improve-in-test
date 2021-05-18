import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { MusicNoteList } from 'react-bootstrap-icons';

export default function NavBar() {
	const { isAuth, setIsAuth } = useContext(UserContext);

	const logout = () => {
		setIsAuth(false);
	};

	return (
		<Navbar bg='dark' variant='dark' className='sticky-top'>
			<Link to='/home'>
				<Navbar.Brand>
					<MusicNoteList className='mx-3' color='teal' size={30} />
				</Navbar.Brand>
			</Link>
			<Nav className='mr-auto'>
				{isAuth && (
					<Link to='/home' className='text-info'>
						Home
					</Link>
				)}
			</Nav>
			<Form inline>
				{/* ----------------------- Uncomment this <Button> in development mode ----------------------- */}
				{/* <Button
					variant='danger'
					size='sm'
					type='submit'
					className='mx-2'
					onClick={() => {
						localStorage.clear();
						console.log('localStorage is now empty');
					}}>
					Clear localStorage
				</Button> */}
				{isAuth ? (
					<Button variant='outline-info' size='sm' onClick={logout}>
						Logout
					</Button>
				) : (
					<div></div>
				)}
			</Form>
		</Navbar>
	);
}
