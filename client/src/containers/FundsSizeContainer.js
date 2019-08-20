import { connect } from "react-redux";
import FundsPieChart from "../components/Funds/FundsPieChart";

function mapStateToProps(state) {
  return {
    fundsSize: state.fundsSize
  };
}

export default connect(mapStateToProps)(FundsPieChart);