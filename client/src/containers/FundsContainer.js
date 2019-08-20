import { connect } from "react-redux";
import Funds from "../components/Funds/FundsComponent";
import FundsCard from '../components/Funds/FundsList'

function mapStateToProps(state) {
  return {
    funds: state.funds
  };
}

const mapState= connect(mapStateToProps)
export const FundsResult = mapState(Funds)
export const FundsCardResult = mapState(FundsCard)