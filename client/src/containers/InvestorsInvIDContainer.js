import { connect } from "react-redux";
import InvestorDetail from "../components/Investors/InvestorDetail";

function mapStateToProps(state) {
  return {
    investorsInvID: state.investorsInvID,
    updateInvestorCashFlow: state.updateInvestorCashFlow
  };
}

export const InvestorDetailResult = connect(mapStateToProps)(InvestorDetail)