import {
	call,
	takeEvery,
	fork,
	put,
	takeLatest,
	take,
} from "redux-saga/effects";

import * as actions from "../actions/users";
import * as api from "../api/usersApi";

//worker sag
function* getUsers() {
	try {
		const result = yield call(api.getUsers);
		yield put(
			actions.getUsersSuccess({
				items: result.data.data,
			}),
		);
	} catch (err) {}
}

//watch saga
function* watchGetUserRequest() {
	yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

//generator for create
function* createUser(action) {
	try {
		const { firstName, lastName } = action.payload;
		console.log("firstname :", firstName, lastName);
		const data = yield call(api.createUser, {
			firstName,
			lastName,
		});
		console.log("data : ", data);

		yield call(getUsers);
	} catch (err) {
		console.log(err.message);
	}
}
function* watchCreateUserRequest() {
	yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

//worker
function* deleteUser({ userId }) {
	try {
		yield call(api.deleteUser, userId);
		yield call(getUsers);
	} catch (err) {}
}
//delete user:
function* watchDeleteUserRequest() {
	while (true) {
		const action = yield take(actions.Types.DELETE_USER_REQUEST);
		yield call(deleteUser, {
			userId: action.payload.userId,
		});
	}
}
const usersSaga = [
	fork(watchGetUserRequest),
	fork(watchCreateUserRequest),
	fork(watchDeleteUserRequest),
];

export default usersSaga;
