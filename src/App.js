import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

const App = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	// Search GitHub Users
	const searchUsers = async (requestedUser) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/search/users?q=${requestedUser}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		); // get data from github
		setUsers(res.data.items);
		setLoading(false);
	};

	// Get a single GitHub user
	const getUser = async (requestedUser) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${requestedUser}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		); // get data from github
		setUser(res.data);
		setLoading(false);
	};

	// Get user repos
	const getUserRepos = async (requestedUser) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${requestedUser}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		); // get data from github
		setRepos(res.data);
		setLoading(false);
	};

	// Clear users from state
	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	// Set alert
	const updateAlert = (msg, type) => {
		setAlert({ msg: msg, type: type });
		setTimeout(() => {
			setAlert(null);
		}, 5000);
	};

	return (
		<Router>
			<div className='App'>
				<Navbar />
				<div className='container'>
					<Alert alert={alert} />
					<Switch>
						<Route
							exact
							path='/'
							render={(props) => (
								<Fragment>
									<Search
										searchUsers={searchUsers}
										clearUsers={clearUsers}
										isClear={users.length === 0 ? true : false} // if users is empty pass true
										setAlert={updateAlert}
									/>
									<Users users={users} loading={loading} />
								</Fragment>
							)}
						/>
						<Route exact path='/about' component={About} />
						<Route
							exact
							path='/user/:login'
							render={(props) => (
								<User
									{...props}
									getUser={getUser}
									getUserRepos={getUserRepos}
									user={user}
									loading={loading}
									repos={repos}
								/>
							)}
						/>
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;
