import { createStore, combineReducers } from 'redux';

import plants from "./reducers/plants"
import { loadState, saveState } from "./localstorage"

// const persistedState = loadState();
const store = createStore(combineReducers({ plants }));

store.subscribe(() => {
    saveState({
        plants: store.getState().plants
    });
});

export default store;