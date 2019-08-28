import React from "react";
import { Layout } from 'antd'
import Cards from './Cards'
import FundsSizeContainer from '../../containers/FundsSizeContainer'
import {FundsCardResult} from '../../containers/FundsContainer'
import { DistroChartContainer } from '../../containers/DistributionContainer'
import { DistroFunnelContainer } from '../../containers/DistributionTotalsContainer'
import { DistroFundsChartContainer } from '../../containers/DistrbutionTotalsFundsContainer'

//const { Content } = Layout;

function Main(props) {
  return (
    <Layout>
      <Cards/>
      <h1 className='mainContainer'>Distribution Information</h1>
      <div className='container'>
        <DistroFunnelContainer/>
        <DistroChartContainer/>
      </div>
      <h1 className='mainContainer'>Fund Information</h1>
      <div className='container'>
        <DistroFundsChartContainer/>
        <FundsSizeContainer/>
      </div>
    </Layout>
  );
}
export default Main;