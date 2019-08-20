import React from "react";
import { List } from 'antd'

function FundsCard(props) {
    const distinct = (value, index, self)=>{
        return self.indexOf(value) === index
    }
    let fundsListArray = props.funds.map((row)=> row.Fund_ID)
    let fundsList = fundsListArray.filter(distinct)

  return (
    <div>
        <List
        header={<div>Fund List</div>}
        bordered
        dataSource={fundsList}
        style={{minWidth: 550, marginLeft: 200}}
        renderItem={item => (
            <List.Item>
            {/* <Typography.Text mark>[ITEM]</Typography.Text>*/} {item} 
            </List.Item>
        )}
        />
    </div>
  );
}
export default FundsCard;