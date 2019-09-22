import { connect } from "react-redux";
import InvestorDetailCID from "../components/Investors/InvestorDetailCID";

import {updateInvestorCashFlow, updateInvestorDetail} from '../actions/actions'

function mapStateToProps(state) {
  return {
    investorsCID: state.investorsCID,
    investorTest: state.investorTest
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

export const InvestorsInvIDContainer = connect(mapStateToProps, mapDispatchToProps)(InvestorDetailCID)
