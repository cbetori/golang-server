import { connect } from "react-redux";
import Funds from "../../components/Main/FundsComponent";
import FundsMain from "../../components/Funds/Funds";
import FundsCard from '../../components/Funds/FundsList'

function mapStateToProps(state) { 
  return {
    funds: state.funds
  };
}

const mapState= connect(mapStateToProps)
export const FundsContainer = mapState(FundsMain)
export const FundsResult = mapState(Funds)
export const FundsCardResult = mapState(FundsCard)