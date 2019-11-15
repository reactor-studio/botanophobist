import { createStore, combineReducers } from 'redux';

import plants from "./reducers/plants"

const store = createStore(combineReducers({ plants }));

export default store;