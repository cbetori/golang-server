import React from "react";
import { Statistic, Card, Col, Icon } from 'antd'

function InvestmentsCard(props) {
    let investmentInfo = props.investments.length
    let investmentGrossCapital = props.investments.reduce((a, b)=>a + b.Gross_Capital,0)
    let investmentNetCapital = props.investments.reduce((a, b)=>a + b.Net_Capital,0)
  return (
    <React.Fragment>
        <Col span={3}>
            <Card>
                <Statistic
                title="Current Investments"
                value={investmentInfo}
                precision={0}
                valueStyle={{ color: '#05386b', fontWeight: 'bold' }}
                prefix={<Icon type="user"/>}
                suffix=""
                />
            </Card>
        </Col>
        <Col span={4}>
            <Card>
                <Statistic
                title="Total Gross Capital"
                value={investmentGrossCapital}
                precision={0}
                valueStyle={{ color: '#05386b', fontWeight: 'bold' }}
                prefix="$"
                suffix=""
                />
            </Card>
        </Col>
        <Col span={4}>
            <Card>
                <Statistic
                title="Total Net Capital"
                value={investmentNetCapital}
                precision={0}
                valueStyle={{ color: '#05386b', fontWeight: 'bold' }}
                prefix="$"
                suffix=""
                />
            </Card>
        </Col>
    </React.Fragment>
  );
}
export default InvestmentsCard;