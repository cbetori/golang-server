/*
Created Date:   9/24/2019
Author:         Betori
Reason:         Handle all POST requests 
Tools:          Basic JS functions that are utilized by Redux reducers
Last Updated:
Purpose:
*/

////Utility Objects
// Slice url string by POST request
const urlObject = {
  udpateInvCF: window.location.href.split("/").slice(-1)[0],
  updateInvDetail:  window.location.href.split("/").slice(-1)[0]
}
//Fetch request URL
const fetchObject = {
  udpateInvCF: "/api/investments/invid/"+urlObject.udpateInvCF+"/update",
  updateInvDetail:  "/api/investments/invid/"+urlObject.updateInvDetail+"/updatedetail"
}
//Redux type string to call Redux reducer
const type = {
  udpateInvCF: "INVESTORS_INVID_LOADED_UPDATE",
  updateInvDetail: "INVESTORS_INVID_LOADED_UPDATE_DETAIL"
}

////Utility Functions
//Handles POST request. Takes in object with data and req that directs to correct objects
export function handlePost(row, req) {
  return function (dispatch) {
    fetch(
      fetchObject[req], {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(row)
    })
    .then(response => dispatch(handlePostState(row, req)))
    .catch(error => console.error('Error:', error))
  }
}
function handlePostState(res, req){
  return{
    type: type[req],
    value: res
  }
}

  
////Post request to update database
//Update investor_cf
// export function udpateInvCF(row) {
//   return function (dispatch) {
//       handleFetch(fetchObject.udpateInvCF, row)
//           .then(response => dispatch(updateInvCFState(row)))
//           .catch(error => console.error('Error:', error))
//   }
// }
// function updateInvCFState(res){
//   return{
//     type: type.udpateInvCF, 
//     value: res
//   }
// }
// //Update investor_detail  
// export function updateInvDetail(row) {
//   return function (dispatch) {
//       handleFetch(fetchObject.updateInvDetail, row)
//           .then(response => dispatch(updateInvDetailState(row)))
//           .catch(error => console.error('Error:', error))
//   }
// }
// function updateInvDetailState(res){
//   return{
//     type: type.updateInvDetail, 
//     value: res
//   }
// }
