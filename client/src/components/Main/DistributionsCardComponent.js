import React from "react";
import { Statistic, Card, Col } from 'antd'

function DistributionsCard(props) {
    let distroTotal
    let mgmtTotal
    let servTotal
    let feeValues =()=>{
      if (props.cfTotals.length > 0) {
        distroTotal = props.cfTotals[0]['Gross']+props.cfTotals[0]['Special']+props.cfTotals[0]['Tax']+props.cfTotals[0]['Composite']
        mgmtTotal = props.cfTotals[0]['Management']
        servTotal = props.cfTotals[0]['Servicing']
      }
      return {mgmtTotal, servTotal}
    }
    feeValues()
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
        <Col span={4}>
            <Card>
                <Statistic
                title="Total Management Fees Paid"
                precision={0}
                valueStyle={{ color: '#05386b', fontWeight: 'bold' }}
                prefix="$"
                suffix=""
                value={mgmtTotal}
                >
                </Statistic>
            </Card>
          </Col>
          <Col span={4}>
            <Card>
                <Statistic
                title="Total Servicing Fees Paid"
                precision={0}
                valueStyle={{ color: '#05386b', fontWeight: 'bold' }}
                prefix="$"
                suffix=""
                value={servTotal}
                >
                </Statistic>
            </Card>
        </Col>
    </React.Fragment>
  );
}
export default DistributionsCard;