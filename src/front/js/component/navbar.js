
import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../store/appContext';

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	const navigate = useNavigate();

	useEffect(() => {

		console.log("Navbar");

	}, [store.token]);

	const handleClick = () => {

		if (store.token) {

			actions.logOut();

		} else {

			navigate("/login");
		}
	};

	return (

		<nav className="navbar navbar-dark bg-dark">
			<div className="container d-flex">
				<Link to="/">
					<button className=" btn btn-primary mb-0 h1">Home</button>
				</Link>
				<div className="ml-auto">
					{store.token ? (
						<button className="btn btn-primary" onClick={handleClick}>Logout</button>
					) : (
						<Link to="/login">
							<button className="btn btn-primary">Login</button>
						</Link>
					)}
					<Link to="/register">
						<button className="btn btn-primary mx-4">Register</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
