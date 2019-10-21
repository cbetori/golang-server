import React from "react";
import { Statistic, Card, Col, Icon } from 'antd'

function InvestmentsCard(props) {
    let investmentInfo = props.fundsSize.reduce((a, b)=>a + b.InvID_Count,0)
    let investmentGrossCapital = props.fundsSize.reduce((a, b)=>a + b.Sum_of_Gross_Capital,0)
    let investmentNetCapital = props.fundsSize.reduce((a, b)=>a + b.Sum_of_Net_Capital,0)
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