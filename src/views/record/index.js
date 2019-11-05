import React from 'react';
import Records from '../../components/Records';
import { Modal, Pagination, Card, BackTop, Divider, Button, Spin } from 'antd';
import Print from '../print';
import TagSelect from '../../components/TagSelect';
import SearchBar from '../../components/SearchBar';

class Record extends React.Component {
  state = {
    searchOptions: {
      serialNumber: '',
      location: '',
      createRange: [], // [start, end]
      attitude: [], // ['very', 'good', 'bad']
      printed: [] // ['yes', 'no']
    },
    loading: false,
    printVisible: false,
    currentRecord: {},
    records: [
      {
        serialNumber: '20191101001222',
        name: 'zhangsan',
        company: 'asdfhjasdflh',
        location: '1-1021',
        phone: '13333333333',
        content: 'asdfhjkasdifgjklsadf',
        serviceContent: 'asfdasd',
        material: 'asdfasdfsadfasdfasd',
        appointmentTime: '2019-11-1',
        createTime: '2019-11-01 12:30:09',
        completeTime: '2019-11-2',
        repairer: 'zasdf',
        timely: 'yes', // yes no
        attitude: 'good', // good general bad
        clean: 'yes',
        satisfaction: 'good', // very good bad
      },
      {
        serialNumber: '20191101001233',
        name: 'zhangsan',
        company: 'asdfhjasdflh',
        location: '1-1021',
        phone: '13333333333',
        content: 'asdfhjkasdifgjklsadf',
        serviceContent: 'asfdasd',
        material: 'asdfasdfsadfasdfasd',
        appointmentTime: '2019-11-1',
        createTime: '2019-11-01 12:30:09',
        completeTime: '2019-11-2',
        repairer: 'zasdf',
        timely: 'no', // yes no
        attitude: 'bad', // good general bad
        clean: 'yes',
        satisfaction: 'good', // very good bad
      }
    ],
  }
  handleEdit = (record) => {
    console.log('edit', record)
  }
  handleDelete = (record) => {
    console.log('delete', record)
  }
  handlePrint = (currentRecord) => {
    this.setState({
      printVisible: true,
      currentRecord,
    })
  }
  handlePrintCancel = () => {
    this.setState({ printVisible: false })
  }
  handleAttitudeChange = (value) => {
    const newSearchOptions = {
      ...this.state.searchOptions,
      attitude: value
    }
    this.fetchData(newSearchOptions)
  }
  handlePrintedChange = (value) => {
    const newSearchOptions = {
      ...this.state.searchOptions,
      printed: value
    }
    this.fetchData(newSearchOptions)
  }
  handleSearch = value => {
    const newSearchOptions = {
      ...this.state.searchOptions,
      ...value
    }
    this.fetchData(newSearchOptions)
  }
  fetchData = (searchOptions) => {
    this.setState({
      loading: true,
      searchOptions: searchOptions
    })
    console.log(searchOptions)
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000);
  }
  render() {
    const attitude = [
      { label: '非常满意', value: 'very' },
      { label: '满意', value: 'good' },
      { label: '不满意', value: 'bad' },
    ]
    const printStatus = [
      { label: '已打印', value: 'yes' },
      { label: '未打印', value: 'no' },
    ]
    return (
      <div style={{ display: 'relative' }}>
        <BackTop
          visibilityHeight={100}
          target={() => document.getElementById('main-scroll-content')}
        />
        <Card style={{ marginBottom: 20 }}>
          <TagSelect options={attitude} title="态度" onChange={(value) => this.handleAttitudeChange(value)} />
          <Divider dashed={true} style={{ margin: 12 }} />
          <TagSelect options={printStatus} title="是否打印" onChange={value => this.handlePrintedChange(value)} />
          <Divider dashed={true} style={{ margin: 12 }} />
          <SearchBar onSearch={value => this.handleSearch(value)} />
          <Divider dashed={true} style={{ margin: 12 }} />
          <Button>导出以下内容</Button>
        </Card>
        <div style={{ position: 'fixed', zIndex: 10, top: 350, left: 0, textAlign: 'center', width: '100%', }}>
          <Spin size="large" spinning={this.state.loading} />
        </div>
        <Records
          records={this.state.records}
          handlePrint={this.handlePrint}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
        />
        <Card
          style={{ textAlign: 'center' }}
          bodyStyle={{ padding: 12 }}
        >
          <Pagination showTotal={total => `共 ${total} 项`} defaultCurrent={6} total={500} />
        </Card>
        <div style={{ height: 100 }}></div>
        <Modal
          title="打印预览"
          width={800}
          visible={this.state.printVisible}
          onCancel={this.handlePrintCancel}
          footer={null}
        >
          <Print record={this.state.currentRecord} />
        </Modal>
      </div >
    )
  }
}

export default Record;
