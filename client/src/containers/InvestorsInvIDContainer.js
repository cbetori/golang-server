import { connect } from "react-redux";
import InvestorDetail from "../components/Investors/InvestorDetail";
import {updateInvestorCashFlow, updateInvestorDetail} from '../actions/actions'

function mapStateToProps(state) {
  return {
    investorsInvID: state.investorsInvID,
    investorTest: state.investorTest
    // updateInvestorCashFlow: state.updateInvestorCashFlow
  };
}

function mapDispatchToProps(dispatch){
  return{
    updateInvestorCashFlow:function(result){
      dispatch(updateInvestorCashFlow(result))
    },
    updateInvestorDetail:function(result){
      dispatch(updateInvestorDetail(result))
    }
  }
}

export const InvestorDetailResult = connect(mapStateToProps, mapDispatchToProps)(InvestorDetail)