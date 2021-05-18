import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Login() {
	const { isAuth, setIsAuth } = useContext(UserContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [logged, setLogged] = useState(false);
	const [shorHelpMessage, setShorHelpMessage] = useState(false);

	const handleForm = (e) => {
		setShorHelpMessage(false);
		if (e.target.name === 'username') {
			setUsername(e.target.value);
		} else if (e.target.name === 'password') {
			setPassword(e.target.value);
		} else {
			if (username === password) {
				setIsAuth(true);
				setLogged(true);
			} else {
				setShorHelpMessage(true);
			}
		}
	};

	return (
		<div>
			<Container className='w-50 text-center  mt-5 pt-5'>
				<h1>Login</h1>
				<Form noValidate>
					<Form.Group controlId='formBasicEmail' className='d-flex flex-column align-items-center'>
						{/* <Form.Label>Username</Form.Label> */}
						<Form.Control type='email' name='username' placeholder='Username' onChange={handleForm} className='w-50' />
						<Form.Text id='passwordHelpBlock' muted>
							Your can use the username you like.
						</Form.Text>
					</Form.Group>

					<Form.Group controlId='formBasicPassword' className='d-flex flex-column align-items-center'>
						{/* <Form.Label>Password</Form.Label> */}
						<Form.Control type='password' name='password' placeholder='Password' onChange={handleForm} className='w-50' />
					</Form.Group>

					{shorHelpMessage && (
						<Form.Text id='passwordHelpBlock' className='mt-0 mb-3 text-danger'>
							{`Why don't you try "${username}" for the password?`}
						</Form.Text>
					)}
					<Button variant='info' size='sm' name='submit' disabled={!username || !password} onClick={handleForm}>
						Submit
					</Button>
				</Form>
			</Container>
			{logged && <Redirect to='/home' />}
		</div>
	);
}
