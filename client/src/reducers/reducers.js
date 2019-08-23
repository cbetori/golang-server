import {combineReducers} from "redux";

function funds(state = [], action) {
  if (action.type === "FUNDS_LOADED") {
    return action.value;
  }
  return state;
}

function fundsSize(state = [], action) {
  if (action.type === "FUNDS_SIZE_LOADED") {
    return action.value;
  }
  return state;
}

function investments(state =[], action){
  if (action.type === 'INVESTMENTS_LOADED'){
    return action.value
  }
  return state
}

function distributions(state =[], action){
  if (action.type === 'DISTRIBUTIONS_LOADED'){
    return action.value
  }
  return state
}

function cfTotals(state =[], action){
  if (action.type === 'CFTOTALS_LOADED'){
    return action.value
  }
  return state
}

function investors(state =[], action){
  if (action.type === 'INVESTORS_LOADED'){
    return action.value
  }
  return state
}

function investorsInvID(state =[], action){
  if (action.type === 'INVESTORS_INVID_LOADED'){
    return action.value
  }
  return state
}



const rootReducer = combineReducers({
    funds, fundsSize, investments, distributions, investors, investorsInvID, cfTotals
  });
  export default rootReducer;