/*
Created Date:   Inception
Author:         Betori
Reason:         Maps Investor information to state. Updates redux props and calls PUT request to update investor infor
Tools:          Redux
Last Updated:   9/25/2019
Purpose:        Uses generic function to handle all PUT requests.
*/

import { connect } from "react-redux";
import InvestorDetailVID from "../components/Investors/InvestorDetailVID";
import InvestorDetailInvid from '../components/Investors/InvestorDetailInvid'
import {handlePost} from '../actions/put/index'

function mapStateToProps(state) {
  return {
    investorsInvID: state.investorsInvID,
    investorTest: state.investorTest

  };
}

function mapDispatchToProps(dispatch){
  return{
    handlePost:function(result, req){
      dispatch(handlePost(result, req))
    },
  }
} 

export const InvestorsInvIDContainer = connect(mapStateToProps, mapDispatchToProps)(InvestorDetailInvid)
export const InvestorsVidContainer = connect(mapStateToProps, mapDispatchToProps)(InvestorDetailVID)


/*
Removed Date: 9/25/2019
Reason: Generic handlePost function can handle PUT requests
*/
    //import {updateInvestorCashFlow, updateInvestorDetail} from '../actions/actions'
    // updateInvestorCashFlow: state.updateInvestorCashFlow 
    // updateInvDetail:function(result){
    //   dispatch(updateInvDetail(result))
    // }