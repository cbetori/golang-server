import { connect } from "react-redux";
import   Search  from '../../components/Layout/Search'

function mapStateToProps(state) {
  return {
    funds: state.funds,
    investments: state.investments
  };
}

const mapState= connect(mapStateToProps)
export const SearchResult = mapState(Search)
