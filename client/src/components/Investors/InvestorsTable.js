import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Input, Button, Icon }  from 'antd';

class InvestorsTable extends Component{
    state = {
        searchText: '',
      };
      getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
      })

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      }
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      }

    render(){
        let columns = [
        {title: 'InvID', dataIndex:'InvID',  key: 'InvID', ...this.getColumnSearchProps('InvID'), render: text => <Link  to={"/invid/"+text}>{text}</Link>},
        {title: 'CID', dataIndex:'CID',  key: 'CID', ...this.getColumnSearchProps('CID'), render: text => <Link  to={"/cid/"+text}>{text}</Link>},
        {title: 'VID', dataIndex:'VID',  key: 'VID', ...this.getColumnSearchProps('VID'), render: text => <Link  to={"/vid/"+text}>{text}</Link>},
        {title: 'SID', dataIndex:'SID', key: 'SID', ...this.getColumnSearchProps('SID')},
        {title: 'Name', dataIndex:'Account_Name', key: 'Account_Name', ...this.getColumnSearchProps('Account_Name')},
        {title: 'Feeder', dataIndex:'Feeder', key: 'Feeder', ...this.getColumnSearchProps('Feeder')},
        {title: 'Inv_Type', dataIndex:'Inv_Type', key: 'Inv_Type', ...this.getColumnSearchProps('Inv_Type')},
        {title: 'Date_Inv', dataIndex:'Date_Inv', key: 'Date_Inv', ...this.getColumnSearchProps('Date_Inv')},
        {title: 'Date_Eliminate', dataIndex:'Date_Eliminate', key: 'String', ...this.getColumnSearchProps('Date_Eliminate')},
        {title: 'Gross_Capital', dataIndex:'Gross_Capital', key: 'Gross_Capital', ...this.getColumnSearchProps('Gross_Capital')},
        {title: 'Net_Capital', dataIndex:'Net_Capital', key: 'Net_Capital', ...this.getColumnSearchProps('Net_Capital')}

        ]
        return(
            <div>
                <Table columns= {columns} dataSource={this.props.investors} />
            </div>
        )
    }
}

export default InvestorsTable