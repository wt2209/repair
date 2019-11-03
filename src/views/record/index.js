import React from 'react';
import Records from '../../components/Records';

class Record extends React.Component {
  state = {
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
        attitude: 'bad', // good general bad
        clean: 'yes',
        satisfaction: 'good', // very good bad
      }
    ],
  }
  render() {
    return (
      <Records records={this.state.records} />
    )
  }
}

export default Record;
