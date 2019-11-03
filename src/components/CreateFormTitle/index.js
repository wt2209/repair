import React from 'react';
import { DatePicker } from 'antd';

class CreateFormTitle extends React.Component {
  render() {
    return (
      <div style={{ paddingBottom: 20 }}>
        <span style={{ float: 'left' }}>编号：20191102001</span>
        <span style={{ float: 'right' }}>受理时间：<DatePicker showTime /></span>
      </div>
    )
  }
}

export default CreateFormTitle;
