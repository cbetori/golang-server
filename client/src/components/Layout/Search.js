
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Select, Spin, Button } from 'antd';
import debounce from 'lodash/debounce';

const { Option } = Select;

function Search (props){
  
    const [data, dataSet] = useState([])
    const [value, valueSet] = useState()
    const [fetching, fetchingSet] = useState(false)
    //Used to compensate for state changes delay
    let immediateValue = ''

    //Update mapper and getSearchable items to add/remove searchable 
    const mapper = {
      Fund_ID: 'fund',
      Account_Name: 'investor',
      InvID: 'invid',
      CID: 'cid',
      SID: 'sid',
      VID: 'vid',
    }

    let getSearchableItems =(res)=>{
      let body = []
      let items = {
        funds: fetchProps(res, props.funds, 'Fund_ID'),
        names: fetchProps(res, props.investments, 'Account_Name'),
        sid: fetchProps(res, props.investments, 'SID'),
        invid: fetchProps(res, props.investments, 'InvID'),
        cid: fetchProps(res, props.investments, 'CID'),
        vid: fetchProps(res, props.investments, 'VID'),
      }
      for (let [key, value] of Object.entries(items)) {
        body.push(value)
      }
      return body  
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

    let fetchResult = search => {
      //Clearing out value and search results on each new search, initiate loading circle
      dataSet([])
      valueSet()
      fetchingSet(true)
      //Getting props and filter based on search string
      let body = getSearchableItems(search)
      //If search string is empty clear filterd values and stop loading icon
      if(search === ''){
        dataSet([])
        fetchingSet([false])
      }else{
        //If search string has value map 
        body = handleSearchArray(body)
        const data = body.map((res) =>({
              text: res,
              value: res,
          }));
          dataSet(data)
          fetchingSet([false])
      }
    }
    
    let handleURL=()=>{
      //if immediateValue is empty use state value else use the immediate value
      let clone = immediateValue === '' ? value : immediateValue
      let key = clone.substr(0, clone.indexOf(':'))
      let detail = clone.split(':').pop().trim()
      key = mapper[key]
      console.log(props.location)
      props.location.replace({
        pathname: '/' +key  +'/' + detail,
        search: ''
      })
    }

    let handleChange = (res) => {
        immediateValue = res
        valueSet(res)
        dataSet([])
        fetchingSet(false)
    };

    //Allows enter key to trigger search button
    let handlerSearchEnter=(event)=>{
      //13=enter key. If immediatevalue is blank dont fire.
      if (event.keyCode === 13 && immediateValue != ''){
        handleURL()
      }
    }

    //Fetch results but added a timing delay to prevent constant lookups
    let fetchAll = debounce(fetchResult, 100);
      return (
        <div style={{marginLeft: 'auto', marginRight: 'auto', alignSelf: 'center'}}>
          <Select
            showSearch
            style={{width: '400px', minWidth:'100px', fontSize: '16pt', marginLeft: 'auto', marginRight: 'auto'}}
            mode="default"
            allowClear={true}
            value={value}
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
