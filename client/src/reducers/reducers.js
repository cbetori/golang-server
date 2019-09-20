import {combineReducers} from "redux";
import update from 'react-addons-update';

function loginState(state = {}, action) {
  if (action.type === "LOGIN_LOADED") {
    return action.value
  }
  return state;
}

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
  }else if (action.type === 'INVESTORS_INVID_LOADED_UPDATE'){
    let cash = state[0].cashflows
    //just looping through cash
    for (let element in cash){
      if(cash[element].ID === action.value.ID){
        //React feature that makes updating nested state objects easier
        return update(state, {
          0: {cashflows: {[element]: {$set: action.value}}}
        })
      }
    }
    }else if (action.type === 'INVESTORS_INVID_LOADED_UPDATE_DETAIL'){
      let details = state[0].details
      console.log(details)
      for (let element in details){
        if(details[element].ID === action.value.ID){
          console.log(update(state, {
            0: {details: {[element]: {$set: action.value}}}
          }))
          return update(state, {
            0: {details: {[element]: {$set: action.value}}}
          })
        }
      }
      console.log(state[0].details)
    }
  return state
}

function investorTest(state =[], action){
  if (action.type === 'INVESTORS_INVID_LOADED_TEST'){
    console.log(action.value)
    return action.value
  }
  return state
}

function distributionsFund(state =[], action){
  if (action.type === 'DISTRIBUTIONS_LOADED_FUNDS'){
    return action.value
  }
  return state
}

const rootReducer = combineReducers({
  loginState, funds, fundsSize, investments, distributions, investors, investorsInvID, cfTotals, distributionsFund, investorTest
  });
  export default rootReducer;