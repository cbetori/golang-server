import { connect } from "react-redux";
import InvestorDetailVID from "../components/Investors/InvestorDetailVID";
import InvestorDetailInvid from '../components/Investors/InvestorDetailInvid'
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

export const InvestorsInvIDContainer = connect(mapStateToProps, mapDispatchToProps)(InvestorDetailInvid)
export const InvestorsVidContainer = connect(mapStateToProps, mapDispatchToProps)(InvestorDetailVID)