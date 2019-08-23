import { connect } from "react-redux";
import InvestmentsCard from "../components/Investments/InvestmentsCard";

function mapStateToProps(state) {
  return {
    investments: state.investments,
    fundsSize: state.fundsSize
  };
}

export default connect(mapStateToProps)(InvestmentsCard);