import { connect } from "react-redux";
import DistroChart from '../components/Cashflows/DistoChart'

function mapStateToProps(state) {
  return {
    distributions: state.distributions,
  };
}

const mapState= connect(mapStateToProps)
export const DistroChartContainer = mapState(DistroChart)