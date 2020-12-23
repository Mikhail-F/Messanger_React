import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import MessagesReducer from "./MessagesReducer";
import DialogsReducer from "./DialogsReducer";
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import AuthReducer from "./AuthReducer";

const reducers = combineReducers({
    messagesR: MessagesReducer,
    dialogsR: DialogsReducer,
    authR: AuthReducer,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store