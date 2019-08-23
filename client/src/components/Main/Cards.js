import React from "react";
import { Row } from 'antd'
import InvestmentsContainer from '../../containers/InvestmentsContainer'
import { DistroCardsContainer } from '../../containers/DistributionTotalsContainer'

function Cards(){
    return(
        <div style={{ background: '#ECECEC', padding: '25px' }}>
        <Row gutter={15}>
            <InvestmentsContainer/>
            <DistroCardsContainer/>
        </Row>
      </div>
    )
}

export default Cards
