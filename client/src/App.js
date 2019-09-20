import React, { useState, useEffect } from "react";
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

const App =(props)=> {
  //Keep track of loginstatus and url history
  const [loginStatus, loginStatusSet] = useState()
  const [browserHistory, browserHistorySet] = useState(props.history.location)
  //prevent api call before login
  const getComponenets =()=>{
    props.loadFunds();
    props.loadFundsSize();
    props.loadInvestors();
    props.loadInvestments();
    props.loadDistributions();
    props.loadInvestorsInvID();
    props.loadcfTotals();
    props.loadDistributionsByFund();
    props.loadInvestorsInvIDTest()
    // props.updateInvestorCashFlow();
  }

  //Updates browser history on change then reloads investory query
  if(props.history.location.pathname.slice(0,17) === "/investors/invid/" || props.history.location.pathname.slice(0,15) === "/investors/vid/"){
    
    if(browserHistory != props.history.location){
      browserHistorySet(props.history.location)
    }
  }
  useEffect(()=>{
    props.loadInvestorsInvIDTest()
    props.loadInvestorsInvID();
  },[browserHistory])

  //Only runs one page refresh and locks out user
  useEffect(()=>{
    //Switch these to turn lock back on
    // loginStatusSet(loggedin)
    loginStatusSet(loggedout)
  },[])

  //called if login api provides response
  const handleLogin = ()=>{
    getComponenets()
      loginStatusSet(loggedin())
  }
  //result if logged in
  const loggedin=()=>{
    return(
    <Layout style={{ minHeight: "100vh" }}>
      <NavTop location={props.history}/>
      <div id='container' style={{display: 'flex'}}>
      <NavSide />
      <Switch>
        <Content style={{marginLeft: 10}}>
          <Route path="/" exact component={Main} />
          <Route path="/funds" component={FundsCardResult} />
          <Route path="/investors" exact component={InvestorsTableResults} />
          <Route path="/investors/invid/:id" component={InvestorDetailResult} />
          <Route path="/investors/vid/:id" component={InvestorDetailResult} />
          <Route path="/cashflows" component={Main} />
        </Content>
      </Switch>
    </div>
    </Layout>
    )
  }
  
  //result if not logged in
  const loggedout =()=>{
    return(
      <LoginContainer 
      loginValue={props.loadLogin} 
      handleLogin={handleLogin} 
      />
    )
  }
    return (
      <div>
        {loginStatus}
      </div>    

    );
}

export default withRouter(App);
