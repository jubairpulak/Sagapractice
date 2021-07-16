import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

// import {
// 	getUsersRequest,
// 	createUserRequest,
// 	deleteUserRequest,
// } from "../actions/users";
import UsersList from "./UsersList";
import NewUserForm from "./NewUserForm";

const App = (props) => {
	const [firstName, setFirstName] = useState("");
	const dispatch = useDispatch();

	const { users } = useSelector((state) => ({ ...state }));

	console.log("from state :", users);
	useEffect(() => {
		dispatch({ type: "users/get_users_request" });
	}, [dispatch]);

	const handleSubmit = ({ firstName, lastName }) => {
		console.log("name J : ", firstName, lastName);
		let fname = firstName;

		// props.createUserRequest({ firstName, lastName });

		dispatch({
			type: "users/create_user_request",
			payload: {
				firstName,
				lastName,
			},
		});
		setFirstName(fname);
	};

	const handleDeleteUser = (userId) => {
		// users/delete_user_request
		dispatch({
			type: "users/delete_user_request",
			payload: userId,
		});
	};

	// const users = props.users;
	return (
		<div
			style={{
				margin: "0 auto",
				padding: "20px",
				maxWidth: "600px",
			}}>
			<NewUserForm onSubmit={handleSubmit} />
			<UsersList users={users.items} onDelete={handleDeleteUser} />
		</div>
	);
};

// class App extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.props.getUsersRequest();
// 	}
// 	handleSubmit = ({ firstName, lastName }) => {
// 		console.log("name J : ", firstName, lastName);
// 		this.props.createUserRequest({ firstName, lastName });
// 	};
// 	//
// 	handleDeleteUser = (userId) => {
// 		this.props.deleteUserRequest(userId);
// 	};
// 	//
// 	render() {
// 		const users = this.props.users;
// 		return (
// 			<div
// 				style={{
// 					margin: "0 auto",
// 					padding: "20px",
// 					maxWidth: "600px",
// 				}}>
// 				<NewUserForm onSubmit={this.handleSubmit} />
// 				<UsersList
// 					users={users.items}
// 					onDelete={this.handleDeleteUser}
// 				/>
// 			</div>
// 		);
// 	}
// }
export default App;
