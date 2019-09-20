
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Select, Spin, Button } from 'antd';
import debounce from 'lodash/debounce';

const { Option } = Select;

function Search (props){
    console.log(props)
    const [data, dataSet] = useState([])
    const [value, valueSet] = useState()
    const [fetching, fetchingSet] = useState(false)
    let immediatValue = ''
    const mapper = {
      VID: 'vid'
    }

    let fetchProps = (value, data, key) =>{
        let object
        if (typeof data[0][key] === 'string'){
             object = data.sort((a,b)=>a[key].localeCompare(b[key]))
        }else {
             object = data.sort((a,b)=>a[key] - b[key])
        }
        let array = []
            for (let i=0; i<object.length; i++){
                //check if fund name containes typed letters
                if (object[i][key].toString().toUpperCase().includes(value.toString().toUpperCase())) {
                    //handle last object -1 error & remove duplicate values 
                    if (object[i-1] === undefined || object[i][key] != object[i-1][key]){
                        array.push(key + ': ' + object[i][key])
                    } 
                }
            }
        return array
    }

    let handleSearchArray=(array)=>{
        let result = []
        for(let x=0; x<array.length; x++){
            for(let i=0; i<array[x].length; i++){
                result.push(array[x][i])
            }
        }
        return result
    }

   let fetchResult = res => {
      dataSet([])
      valueSet()
      fetchingSet(true)
      let body = []
      let funds = fetchProps(res, props.funds, 'Fund_ID')
      let names = fetchProps(res, props.investments, 'Account_Name')
      let sid = fetchProps(res, props.investments, 'SID')
      let invid = fetchProps(res, props.investments, 'InvID')
      let cid = fetchProps(res, props.investments, 'CID')
      let vid = fetchProps(res, props.investments, 'VID')
      if(res === ''){
        dataSet([])
        fetchingSet([false])
      }else{
        body = handleSearchArray([vid])
        // funds, names, sid, invid, cid, 
      const data = body.map((res) =>({
            text: res,
            value: res,
        }));
        dataSet(data)
        fetchingSet([false])
      }
    };
    
    let handleURL=()=>{
      console.log(immediatValue)
      let clone = immediatValue
      let key = clone.substr(0, clone.indexOf(':'))
      let detail = clone.split(':').pop().trim()
      key = mapper[key]
      props.location.push({
        pathname: '/investors/'+key+'/'+detail,
        search: ''
      })
    }

    let handleChange = (res) => {
        immediatValue = res
        valueSet(res)
        dataSet([])
        fetchingSet(false)
    };
    let handlerSearchEnter=(event)=>{

      if (event.keyCode === 13 && immediatValue != ''){
        handleURL()
      }
    }

    let fetchAll = debounce(fetchResult, 100);
      return (
        <div style={{marginLeft: 'auto', marginRight: 'auto', alignSelf: 'center'}}>
          <Select
            showSearch
            style={{width: '800px', minWidth:'100px', fontSize: '16pt'}}
            mode="default"
            allowClear={true}
            value={value}
            // onMouseEnter={handleClear}
            placeholder="Search"
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={fetchAll}
            onChange={(action)=>handleChange(action)}
            showArrow={false}
            onInputKeyDown={(action)=>handlerSearchEnter(action)}
          >
            {data.map(d => (
              <Option key={d.value}>{d.text}</Option>
            ))}
          
          </Select>
          <Button 
          type="primary" 
          shape="circle" 
          icon="search"
          enterButton="Search"
          onSearch={handleURL} 
          onClick= {handleURL}
          style={{fontSize: '16pt', alignSelf: 'center', marginLeft: '15px'}}
          />
        </div>
      );
    }

  export default Search;
