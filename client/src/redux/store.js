import { legacy_createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { appreducer } from "./Appreducer/reducer";


const composeEnhancers = window.__REDUX_DEVTOOLS__EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({appreducer});

export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
