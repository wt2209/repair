import React from 'react';
import { Card, Icon, Descriptions, Col, Row, Input, Radio, DatePicker } from 'antd';
import Record from '../../components/Records';


const { TextArea } = Input;

class Create extends React.Component {
  render() {
    return (
      <Descriptions size="small" column={4} title="编号：自动生成" bordered>
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
        <Descriptions.Item label="受理内容" span={2}>
          <Input />
        </Descriptions.Item>
        <Descriptions.Item label="预约时间">
          <DatePicker showTime placeholder="选择时间" />
        </Descriptions.Item>
        <Descriptions.Item label="完成时间">
          <DatePicker showTime placeholder="选择时间" />
        </Descriptions.Item>
        <Descriptions.Item label="服务内容" span={3}>
          <Input />
        </Descriptions.Item>
        <Descriptions.Item label="完工签字">
          <Input />
        </Descriptions.Item>
        <Descriptions.Item label="使用材料" span={4}>
          <TextArea rows={10} />
        </Descriptions.Item>
        <Descriptions.Item label="客户评价">
          <div className="comment">
            <span className="comment-title">1. 服务人员按时到达？</span>
            {/* <Radio.Group onChange={this.onChange} value={this.state.value}> */}
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </Radio.Group>
          </div>
          <div className="comment">
            <span className="comment-title">2. 服务人员态度如何？</span>
            <Radio.Group >
              <Radio value={1}>好</Radio>
              <Radio value={2}>一般</Radio>
              <Radio value={3}>差</Radio>
            </Radio.Group>
          </div>
          <div className="comment">
            <span className="comment-title">3. 服务人员是否打扫现场？</span>
            <Radio.Group >
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </Radio.Group>
          </div>
          <div className="comment">
            <span className="comment-title">4. 您是否满意？</span>
            <Radio.Group >
              <Radio value={1}>非常满意</Radio>
              <Radio value={2}>满意</Radio>
              <Radio value={3}>不满意</Radio>
            </Radio.Group>
          </div>
        </Descriptions.Item>
      </Descriptions >
    )
  }
}

export default Create;
