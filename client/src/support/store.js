import reducers from "../reducers/reducers";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

const composeEnhancers =
 typeof window === "object" &&
 window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
   
const enhancer = composeEnhancers(
 applyMiddleware(thunk)
);
const store = createStore(reducers,enhancer);
export default store;