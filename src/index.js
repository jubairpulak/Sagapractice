import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { BrowserRouter } from "react-router-dom";

import axios from "axios";
import reportWebVitals from "./reportWebVitals";
import rootReducer from "./reducers/index";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import "bootstrap/dist/css/bootstrap.min.css";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://rem-rest-api.herokuapp.com/api";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root"),
);

reportWebVitals();
