import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout} from "antd";
import Main from "./components/Main/Main";
import NavTop from "./components/Layout/NavTop";
import NavSide from "./components/Layout/NavSide";
import { InvestorsTableResults } from "./containers/InvestorsContainer"
import { FundsCardResult } from "./containers/FundsContainer";
import { InvestorDetailResult } from './containers/InvestorsInvIDContainer'

const { Content} = Layout;

class App extends Component {

  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.props.loadInvestorsInvID();
    });
    this.props.loadFunds();
    this.props.loadFundsSize();
    this.props.loadInvestors();
    this.props.loadInvestments();
    this.props.loadDistributions();
    this.props.loadInvestorsInvID();
    // this.props.updateInvestorCashFlow();
  }

  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    return (
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
    );
  }
}

export default withRouter(App);
