import React from 'react'
import { Table, Button, Modal } from 'antd';

class TableSelect extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            //TAble
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
        };
    }
//Table
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    console.log(this.props)
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length === 1;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.props.onClick} disabled={!hasSelected} loading={loading}>
            Edit
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table style={this.props.style} rowSelection={rowSelection} columns={this.props.columns} dataSource={this.props.dataSource} />
      </div>
    );
  }
}

export default TableSelect