import React, { Component, useState, useEffect } from "react";
import { withRouter, Switch, Route, } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Form, Input, Button} from "antd";
import Main from "./components/Main/Main";
import NavTop from "./components/Layout/NavTop";
import NavSide from "./components/Layout/NavSide";
import { InvestorsTableResults } from "./containers/InvestorsContainer"
import { LoginContainer } from "./containers/LoginContainer"
import { FundsCardResult } from "./containers/FundsContainer";
import { InvestorDetailResult } from './containers/InvestorsInvIDContainer'
import Store from './store'
const { Content} = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginChange: this.loggedout()
    }
  }

  getComponenets(){
    this.props.loadFunds();
    this.props.loadFundsSize();
    this.props.loadInvestors();
    this.props.loadInvestments();
    this.props.loadDistributions();
    this.props.loadInvestorsInvID();
    this.props.loadcfTotals();
    this.props.loadDistributionsByFund();
  }

  handleLogin = ()=>{
    this.getComponenets()
    this.setState({
      loginChange:this.loggedin()
    })
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.props.loadInvestorsInvID();
    });
    // this.props.updateInvestorCashFlow();
  }

  componentWillUnmount() {
    this.unlisten();
  }

  loggedout =()=>{
    return(
      <LoginContainer log={this.props.loadLogin} handle={this.handleLogin.bind(this)} loginChange={this.loginChange}/>
      )
  }

  loggedin=()=>{
    console.log(true)
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
  
  render() {
    return (
      <div>
        {this.state.loginChange}
      </div>    

    );
  }
}

export default withRouter(App);
