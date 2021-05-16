import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Login() {
	const { isAuth, setIsAuth } = useContext(UserContext);
	console.log('isAuth from context: ', isAuth);

	return (
		<div>
			<h1>Login</h1>
			<Link to='/home'>Home</Link>
			<br />
			<br />
			<br />
			<button
				onClick={() => {
					console.log('login');
					setIsAuth(true);
				}}>
				Login
			</button>
			<button
				onClick={() => {
					console.log('logout');
					setIsAuth(false);
				}}>
				Logout
			</button>
			<br />
			<p>{isAuth ? 'True' : 'False'}</p>
			<br />
			<br />
			<button
				onClick={() => {
					localStorage.clear();
					console.log('localStorage is now empty');
				}}>
				Clear localStorage
			</button>
		</div>
	);
}
