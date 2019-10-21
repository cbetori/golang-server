import { connect } from "react-redux";
import InvestmentsCard from "../../components/Main/InvestmentsCard";

function mapStateToProps(state) {
  return {
    investments: state.investments,
    fundsSize: state.fundsSize
  };
}

export default connect(mapStateToProps)(InvestmentsCard);