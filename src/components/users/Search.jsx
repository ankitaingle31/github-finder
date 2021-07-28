import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ setAlert, searchUsers, clearUsers, isClear }) => {
	const [text, setText] = useState('');

	const onChange = (e) => {
		setText(e.target.value); // update text
	};

	const onClick = (e) => {
		// get users on submit
		e.preventDefault();

		if (text === '') {
			// if user search is an empty string
			setAlert('Please enter something', 'light');
		} else {
			searchUsers(text); // Search GitHub users
			setText('');
		}
	};

	return (
		<div>
			<form className='form'>
				<input // user search
					type='text'
					name='text'
					placeholder='Search users...'
					value={text}
					onChange={onChange}
				/>
				<input // submit btn
					type='submit'
					value='Search'
					className='btn btn-dark btn-block'
					onClick={onClick}
				/>
				{!isClear && ( // only show clear button if users are displayed
					<button // clear btn
						type='button'
						className='btn btn-outline-dark btn-block'
						onClick={() => {
							clearUsers();
							setText('');
						}}
					>
						Clear
					</button>
				)}
			</form>
		</div>
	);
};

Search.propTypes = {
	// set propTypes
	searchUsers: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	isClear: PropTypes.bool.isRequired,
	setAlert: PropTypes.func.isRequired,
};

export default Search;
