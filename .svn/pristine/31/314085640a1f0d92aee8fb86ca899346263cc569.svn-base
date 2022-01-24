import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";

export type IRootState = ReturnType<typeof reducers>

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store
