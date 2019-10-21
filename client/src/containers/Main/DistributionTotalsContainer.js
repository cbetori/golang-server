import { connect } from "react-redux";
import DistributionsCard from '../../components/Main/DistributionsCardComponent';
import DistroFunnelChart from '../../components/Main/DistroFunnelChart'

function mapStateToProps(state) {
  return {
    cfTotals: state.cfTotals
  };
}

const mapState= connect(mapStateToProps)
export const DistroCardsContainer = mapState(DistributionsCard)
export const DistroFunnelContainer = mapState(DistroFunnelChart)