import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import { Button, Menu, Dropdown, Icon } from 'antd';

const Funds=(props)=>{

    const [selectedFund, selectedFundSet] = useState("All")

    const distinct = (value, index, self)=>{
        return self.indexOf(value) === index
    }

    let fundsListArray = props.funds.map((row)=> row.Fund_ID)
    let fundsList = fundsListArray.filter(distinct)
    fundsList.sort()
    fundsList.unshift("All")

    function handleFundDropDown (){
        
        const fundsListArray = fundsList.map((row)=> <Menu.Item>{row}</Menu.Item>)
        return (
        <Menu onClick={handleMenuClick}>
            {fundsListArray}
        </Menu>
        )
    }

    function handleMenuClick(e) {
        selectedFundSet(e.item.props.children)
      }
      
    useEffect(()=>{

    },[])

return(
    <React.Fragment>
        <Dropdown overlay={handleFundDropDown}>
            <Button>
                {selectedFund} <Icon type="down" />
            </Button>
        </Dropdown>
    </React.Fragment>
)

}

export default Funds