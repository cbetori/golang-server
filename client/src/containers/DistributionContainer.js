import { connect } from "react-redux";
import DistributionsCard from '../components/Cashflows/DistributionsCardComponent';
import DistroChart from '../components/Cashflows/DistoChart'
import DistroFunnelChart from '../components/Cashflows/DistroFunnelChart'

function mapStateToProps(state) {
  return {
    distributions: state.distributions
  };
}

const mapState= connect(mapStateToProps)
export const DistroCardsContainer = mapState(DistributionsCard)
export const DistroChartContainer = mapState(DistroChart)
export const DistroFunnelContainer = mapState(DistroFunnelChart)