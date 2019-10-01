/*
Created Date:   Inception
Author:         Betori
Reason:         Maps all GET requests to App container
Tools:          Redux
Last Updated:   9/25/2019
Purpose:        Uses generic function to handle all GET requests. This no longer needs to be updated with each new API request
*/

import App from './App'
import './App.css'
import { connect } from 'react-redux'
import { handleStaticGet, handleVariableGet } from './actions/get/index'

function mapDispatchToProps(dispatch) {
  return {
    handleStaticGet: function (req) {
      dispatch(handleStaticGet(req))
    },
    handleVariableGet: function (req, path) {
      dispatch(handleVariableGet(req, path))
    },
   }
}

export default connect(null,mapDispatchToProps)(App)

/*
Removed Date: 9/25/2019
Reason: Replaced with loop to prevent needing to update AppContainer
*/
    // import {loadInvestorsInvIDTest, loadLogin, loadDistributionsByFund, loadFunds, loadFundsSize, loadInvestments, loadDistributions,
    //        loadInvestors, loadInvestorsInvID, updateInvestorCashFlow,loadcfTotals} from "./actions/actions";

    // loadFunds: function () {
    //   dispatch(loadFunds())
    // },
    // loadFundsSize: function () {
    //   dispatch(loadFundsSize())
    // },
    // loadInvestments: function () {
    //   dispatch(loadInvestments())
    // },
    // loadDistributions: function () {
    //   dispatch(loadDistributions())
    // },
    // loadInvestors: function () {
    //   dispatch(loadInvestors())
    // },
    // loadInvestorsInvID: function () {
    //   dispatch(loadInvestorsInvID())
    // },
    // loadcfTotals:function(result){
    //   dispatch(loadcfTotals(result))
    // },
    // loadDistributionsByFund:function(result){
    //   dispatch(loadDistributionsByFund(result))
    // },
    // loadLogin:function(result){
    //   dispatch(loadLogin(result))
    // },
    // loadInvestorsInvIDTest:function(result){
    //   dispatch(loadInvestorsInvIDTest(result))
    // }