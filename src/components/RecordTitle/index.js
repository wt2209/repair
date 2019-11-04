import React from 'react';

class RecordTitle extends React.Component {
  render() {
    const { serialNumber, createTime } = this.props.record;
    return (
      <div style={{ paddingBottom: 16 }}>
        <span style={{ float: 'left' }}>编号：{serialNumber}</span>
        <span style={{ float: 'right' }}>受理时间：{createTime}</span>
      </div>
    )
  }
}

export default RecordTitle;
