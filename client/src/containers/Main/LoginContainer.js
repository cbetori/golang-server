import { connect } from "react-redux";
import  Login  from "../../components/Main/Login";
// import  Cards  from "../components/Main/Cards";

function mapStateToProps(state) {
  return { 
    loginState: state.loginState,
  };
}

const mapState= connect(mapStateToProps)
export const LoginContainer = mapState(Login)
// export const LoginAppContainer = mapState(Cards)