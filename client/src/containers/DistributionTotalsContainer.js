import { connect } from "react-redux";
import DistributionsCard from '../components/Cashflows/DistributionsCardComponent';
import DistroFunnelChart from '../components/Cashflows/DistroFunnelChart'

function mapStateToProps(state) {
  return {
    cfTotals: state.cfTotals
  };
}

const mapState= connect(mapStateToProps)
export const DistroCardsContainer = mapState(DistributionsCard)
export const DistroFunnelContainer = mapState(DistroFunnelChart)