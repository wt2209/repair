import React from 'react';
import { Descriptions, Input, DatePicker, Button } from 'antd';
import CreateFormTitle from '../CreateFormTitle';

class CreateForm extends React.Component {
  render() {
    return (
      <>
        <Descriptions column={4} title={<CreateFormTitle />} bordered>
          <Descriptions.Item label="报修单位">
            <Input />
          </Descriptions.Item>
          <Descriptions.Item label="报修人">
            <Input />
          </Descriptions.Item>
          <Descriptions.Item label="地点">
            <Input />
          </Descriptions.Item>
          <Descriptions.Item label="联系电话">
            <Input />
          </Descriptions.Item>
          <Descriptions.Item label="受理内容" span={3}>
            <Input />
          </Descriptions.Item>
          <Descriptions.Item label="预约时间">
            <DatePicker showTime placeholder="选择时间" />
          </Descriptions.Item>
        </Descriptions >
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <Button size="large" style={{ width: 200, marginRight: 50 }} >提交</Button>
          <Button size="large" type="primary" style={{ width: 200 }} >提交并打印</Button>
        </div>
      </>
    )
  }
}


export default CreateForm;
