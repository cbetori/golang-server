import App from './App'
import './App.css'
import { connect } from 'react-redux'
import {loadFunds, loadFundsSize, loadInvestments, loadDistributions,loadInvestors, loadInvestorsInvID, updateInvestorCashFlow} from "./actions/actions";

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
    }

  }
}

export default connect(null,mapDispatchToProps)(App)