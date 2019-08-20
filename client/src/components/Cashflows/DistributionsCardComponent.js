import React from "react";
import { Statistic, Card, Col } from 'antd'

function DistributionsCard(props) {
    let distroTotal = props.distributions.reduce((a, b)=>a + b.CF_Amount,0)
  return (
    <React.Fragment>
        <Col span={4}>
            <Card>
                <Statistic
                title="Total Distributions Paid"
                precision={0}
                valueStyle={{ color: '#05386b', fontWeight: 'bold' }}
                prefix="$"
                suffix=""
                value={distroTotal}
                >
                </Statistic>
            </Card>
        </Col>
    </React.Fragment>
  );
}
export default DistributionsCard;