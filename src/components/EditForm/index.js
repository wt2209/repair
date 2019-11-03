import React from 'react';
import { Descriptions, Input, DatePicker, Radio } from 'antd';

const { TextArea } = Input;
class EditForm extends React.Component {
  render() {
    return (
      <>
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
                <Radio value='yes'>是</Radio>
                <Radio value='no'>否</Radio>
              </Radio.Group>
            </div>
            <div className="comment">
              <span className="comment-title">2. 服务人员态度如何？</span>
              <Radio.Group >
                <Radio value='good'>好</Radio>
                <Radio value='general'>一般</Radio>
                <Radio value='bad'>差</Radio>
              </Radio.Group>
            </div>
            <div className="comment">
              <span className="comment-title">3. 服务人员是否打扫现场？</span>
              <Radio.Group >
                <Radio value='yes'>是</Radio>
                <Radio value='no'>否</Radio>
              </Radio.Group>
            </div>
            <div className="comment">
              <span className="comment-title">4. 您是否满意？</span>
              <Radio.Group >
                <Radio value='very'>非常满意</Radio>
                <Radio value='good'>满意</Radio>
                <Radio value='bad'>不满意</Radio>
              </Radio.Group>
            </div>
          </Descriptions.Item>
        </Descriptions >
      </>
    )
  }
}


export default EditForm;
