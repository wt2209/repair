import React from 'react';
import Records from '../../components/Records';
import { Modal, Pagination, Card, BackTop } from 'antd';
import Print from '../print';

class Record extends React.Component {
  state = {
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
        timely: 'no', // yes no
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
    this.setState({
      printVisible: false
    })
  }
  render() {
    return (
      <div>
        <BackTop
          visibilityHeight={100}
          target={() => document.getElementById('main-scroll-content')}
        />

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
      </div>
    )
  }
}

export default Record;
