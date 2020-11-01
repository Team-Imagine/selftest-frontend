import { createStore } from 'redux';

export default createStore(function(state, action) {
    if(state === undefined) {
        return {isLoggedIn: 0}
    }
    if(action.type === "LOGIN") {
        return {...state, isLoggedIn: action.value}
    }
    if(action.type === "VERIFIED") {
        return {...state, verified: action.value}
    }
    if(action.type === "EMAIL") {
        return {...state, email: action.value}
    }


    return state;
})