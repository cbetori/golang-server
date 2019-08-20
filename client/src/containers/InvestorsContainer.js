import { connect } from "react-redux";
import InvestorsTable from "../components/Investors/InvestorsTable";

function mapStateToProps(state) {
  return {
    investors: state.investors
  };
}

export const InvestorsTableResults = connect(mapStateToProps)(InvestorsTable);