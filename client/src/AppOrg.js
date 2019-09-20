import React, { Component } from "react";
import { withRouter, Switch, Route, } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout } from "antd";
import Main from "./components/Main/Main";
import NavTop from "./components/Layout/NavTop";
import NavSide from "./components/Layout/NavSide";
import { InvestorsTableResults } from "./containers/InvestorsContainer"
import { LoginContainer } from "./containers/LoginContainer"
import { FundsCardResult } from "./containers/FundsContainer";
import { InvestorDetailResult } from './containers/InvestorsInvIDContainer'
const { Content} = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: this.loggedout()
    }
  }

  //prevent api call before login
  getComponenets(){
    this.props.loadFunds();
    this.props.loadFundsSize();
    this.props.loadInvestors();
    this.props.loadInvestments();
    this.props.loadDistributions();
    this.props.loadInvestorsInvID();
    this.props.loadcfTotals();
    this.props.loadDistributionsByFund();
    // this.props.updateInvestorCashFlow();
  }

  //called if login api provides response
  handleLogin = ()=>{
    this.getComponenets()
    this.setState({
      loginStatus:this.loggedin()
    })
  }

  //these are used to recognize change in browserrouter and recall api
  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.props.loadInvestorsInvID();
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }

  //result if logged in
  loggedin=()=>{
    return(
    <Layout style={{ minHeight: "100vh" }}>
      <NavTop />
      <div id='container' style={{display: 'flex'}}>
      <NavSide />
      <Switch>
        <Content style={{marginLeft: 10}}>
          <Route path="/" exact component={Main} />
          <Route path="/funds" component={FundsCardResult} />
          <Route path="/investors" exact component={InvestorsTableResults} />
          <Route path="/investors/invid/:id" component={InvestorDetailResult} />
          <Route path="/cashflows" component={Main} />
        </Content>
      </Switch>
    </div>
    </Layout>
    )
  }
  
  //result if not logged in
  loggedout =()=>{
    return(
      <LoginContainer 
      loginValue={this.props.loadLogin} 
      handleLogin={this.handleLogin} 
      />
    )
  }
  render() {
    return (
      <div>
        {this.state.loginStatus}
      </div>    

    );
  }
}

export default withRouter(App);
