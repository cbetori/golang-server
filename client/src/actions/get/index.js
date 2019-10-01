/*
Created Date:   9/24/2019
Author:         Betori
Reason:         Handle all GET requests 
Tools:          Basic JS functions that are utilized by Redux reducers
Last Updated:
Purpose:
*/

////Utility Objects
//Fetch request URL
export const fetchStaticObject = {
  loadFunds:  "/api/funds",
  loadFundsSize: "/api/fundstotals",
  loadInvestments: "/api/investments",
  loadDistributions: "/api/cf/totals/monthly",
  loadDistributionsByFund: "/api/cf/totals/funds",
  loadcfTotals: "/api/cf/totals",
  loadInvestors: "/api/investments",
}

//Redux type string to call Redux reducer
const type = {
  loadLogin: "LOGIN_LOADED",
  loadFunds: "FUNDS_LOADED",
  loadFundsSize: "FUNDS_SIZE_LOADED",
  loadInvestments: "INVESTMENTS_LOADED",
  loadDistributions: "DISTRIBUTIONS_LOADED",
  loadDistributionsByFund: "DISTRIBUTIONS_LOADED_FUNDS",
  loadcfTotals: "CFTOTALS_LOADED",
  loadInvestors: "INVESTORS_LOADED",
  loadInvestorsInvID: "INVESTORS_INVID_LOADED",
  loadInvestorsInvIDTest: "INVESTORS_INVID_LOADED_TEST",
  undefined: ""
}

////Utility Functions
//Handles post request. Takes in object with data and req that directs to correct objects
export function handleStaticGet(req) {
  return function (dispatch) {
    fetch(fetchStaticObject[req])
    .then( (response) => {
      return response.json();})
    .then(res => dispatch(handleStaticGetState(res, req)))
    .catch(error => console.error('Error:', error))
  }
}
function handleStaticGetState(res, req){
  return{
    type: type[req],
    value: res
  }
}

const urlObject = {
    loadInvestorsInvID: "/invid/",
    loadInvestorsInvIDTest: "/vid/"
  // loadLogin: {path: window.location.href.split("/").slice(-1)[0], id: window.location.href.split("/").slice(-1)[1]},
  // loadFunds:  {path: window.location.href.split("/").slice(-1)[0], id: ""},
  // loadInvestorsInvIDTest: {path:pathUrl[0], id: pathUrl[1]}
}



export function handleVariableGet(req, path){
   // handlePath(path) 
  if(handleGetUrl(req, path)){
    return function (dispatch) {
      fetch('/api'+path)
      .then( (response) => {
        return response.json();})
      .then(res => dispatch(handleVariableGetState(res, req)))
      .catch(error => console.error('Error:', error))
    }
   }
   //If false is returned state is set to blank. Prevents old state value from showing on screen.
   return handleVariableGetState([], req);
}
function handleVariableGetState(res, req){
  return{
    type: type[req],
    value: res
  }
}

function handleGetUrl(req, path){
  let string = ""
  for (let i = 0; i<urlObject[req].length; i++){
    if(urlObject[req][i] === path[i]){
        string = string + path[i]
    }
  }
  if (string === urlObject[req]){
    return true
  }
}


  