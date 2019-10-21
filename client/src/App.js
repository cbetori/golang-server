import React, { useState, useEffect } from "react";
import { withRouter, Switch, Route, } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout } from "antd"; 
import Main from "./components/Main/Main";
import NavTop from "./components/Layout/NavTop";
import NavSide from "./components/Layout/NavSide";
import { InvestorsTableResults } from "./containers/Investors/InvestorsContainer"
import { LoginContainer } from "./containers/Main/LoginContainer" 
import { FundsContainer } from "./containers/Funds/FundsContainer";
import { InvestorsInvIDContainer } from './containers/Investors/InvestorsInvIDContainer'
import { fetchStaticObject } from './actions/get'
const { Content} = Layout;

const App =(props)=> {
  //Keep track of loginstatus and url history
  const [loginStatus, loginStatusSet] = useState()
  const [browserHistory, browserHistorySet] = useState(props.history.location)
  
  //After login getComponents is called to retreive API fetch requests
  //Loops through object containing GET urls and executes API request 
  const getComponents =()=>{
    for (let object in fetchStaticObject){
      props.handleStaticGet(object)
    }
  }

  //Updates browser history on change then reloads investory query
    if(browserHistory != props.history.location){
      browserHistorySet(props.history.location)
    }
  
  useEffect(()=>{
    props.handleVariableGet('loadInvestorsInvID', browserHistory.pathname)
    props.handleVariableGet('loadInvestorsInvIDTest', browserHistory.pathname)
  },[browserHistory])

  //Only runs one page refresh and locks out user
  useEffect(()=>{
    loginStatusSet(loggedout)
  },[])

  //called if login api provides response
  const handleLogin = ()=>{
    getComponents()
    loginStatusSet(loggedin())
  }
  //result if logged in
  const loggedin=()=>{
    return(
    <Layout style={{ minHeight: "100vh", overflowX: 'hidden' }}>
      <NavTop location={props.history}/>
      <div id='container' style={{display: 'flex'}}>
      <NavSide />
      <Switch>
        <Content style={{marginLeft: 10}}>
          <Route path="/" exact component={Main} />
          <Route path="/funds" component={FundsContainer} />
          <Route path="/investors" exact component={InvestorsTableResults} />
          <Route path="/investors/table" exact component={InvestorsTableResults} />
          <Route path="/invid/:id" component={InvestorsInvIDContainer} />
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


/*
Removed Date: 9/25/2019
Reason: Replaced with loop to prevent needing to update AppContainer
*/

// const getComponents =()=>{
//   props.loadFunds();
//   props.loadFundsSize();
//   props.loadInvestors();
//   props.loadInvestments();
//   props.loadDistributions();
//   props.loadInvestorsInvID();
//   props.loadcfTotals();
//   props.loadDistributionsByFund();
// }

// useEffect(()=>{
//   props.loadInvestorsInvIDTest()
//   props.loadInvestorsInvID();
// },[browserHistory])

//if(props.history.location.pathname.slice(0,17) === "/invid/" || props.history.location.pathname.slice(0,15) === "/investors/vid/"){