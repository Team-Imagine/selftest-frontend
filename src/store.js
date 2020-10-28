import { createStore } from 'redux';

export default createStore(function(state, action) {
    if(state === undefined) {
        return {isLoggedIn: 0}
    }
    if(action.type === "LOGIN") {
        return {...state, isLoggedIn: state.isLoggedIn + action.value, userID: action.value }
    }

    return state;
})