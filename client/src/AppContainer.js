import App from './App'
import './App.css'
import { connect } from 'react-redux'
import {loadInvestorsInvIDTest, loadLogin, loadDistributionsByFund, loadFunds, loadFundsSize, loadInvestments, loadDistributions,loadInvestors, loadInvestorsInvID, updateInvestorCashFlow,loadcfTotals} from "./actions/actions";

function mapDispatchToProps(dispatch) {
  return {
    loadFunds: function () {
      dispatch(loadFunds())
    },
    loadFundsSize: function () {
      dispatch(loadFundsSize())
    },
    loadInvestments: function () {
      dispatch(loadInvestments())
    },
    loadDistributions: function () {
      dispatch(loadDistributions())
    },
    loadInvestors: function () {
      dispatch(loadInvestors())
    },
    loadInvestorsInvID: function () {
      dispatch(loadInvestorsInvID())
    },
    updateInvestorCashFlow:function(result){
      dispatch(updateInvestorCashFlow(result))
    },
    loadcfTotals:function(result){
      dispatch(loadcfTotals(result))
    },
    loadDistributionsByFund:function(result){
      dispatch(loadDistributionsByFund(result))
    },
    loadLogin:function(result){
      dispatch(loadLogin(result))
    },
    loadInvestorsInvIDTest:function(result){
      dispatch(loadInvestorsInvIDTest(result))
    }
  }
}

export default connect(null,mapDispatchToProps)(App)
