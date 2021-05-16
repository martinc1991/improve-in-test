import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function ProtectedRoute({ component: Component, ...props }) {
	const { isAuth } = useContext(UserContext);

	return (
		<Route
			{...props}
			render={(props) => {
				if (isAuth) {
					return <Component />;
				} else {
					return <Redirect to={{ pathname: '/', state: { from: props.location } }}></Redirect>;
				}
			}}></Route>
	);
}
