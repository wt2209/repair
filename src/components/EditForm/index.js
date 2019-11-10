import React from "react";
import { Descriptions, Input, DatePicker, Radio, Form } from "antd";

const { TextArea } = Input;
class EditForm extends React.Component {
  render() {
    const { record } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Descriptions
          className="tight"
          size="small"
          column={4}
          title="编号：自动生成"
          bordered
        >
          <Descriptions.Item label="报修单位">
            {getFieldDecorator("company", {
              initialValue: record.company
            })(<Input style={{ minWidth: 100 }} />)}
          </Descriptions.Item>
          <Descriptions.Item label="报修人">
            {getFieldDecorator("name", { initialValue: record.name })(
              <Input />
            )}
          </Descriptions.Item>
          <Descriptions.Item label="地点">
            {getFieldDecorator("location", { initialValue: record.location })(
              <Input />
            )}
          </Descriptions.Item>
          <Descriptions.Item label="联系电话">
            {getFieldDecorator("phone", { initialValue: record.phone })(
              <Input />
            )}
          </Descriptions.Item>
          <Descriptions.Item label="受理内容" span={2}>
            {getFieldDecorator("content", { initialValue: record.content })(
              <Input />
            )}
          </Descriptions.Item>
          <Descriptions.Item label="预约时间">
            {getFieldDecorator("appointmentTime", {
              initialValue: record.appointmentTime
            })(<DatePicker showTime placeholder="选择时间" />)}
          </Descriptions.Item>
          <Descriptions.Item label="完成时间">
            {getFieldDecorator("completeTime", {
              initialValue: record.completeTime
            })(<DatePicker showTime placeholder="选择时间" />)}
          </Descriptions.Item>
          <Descriptions.Item label="服务内容" span={3}>
            {getFieldDecorator("serviceContent", {
              initialValue: record.serviceContent
            })(<Input />)}
          </Descriptions.Item>
          <Descriptions.Item label="完工签字">
            {getFieldDecorator("content", { initialValue: record.repairer })(
              <Input />
            )}
          </Descriptions.Item>
          <Descriptions.Item label="使用材料" span={4}>
            {getFieldDecorator("material", { initialValue: record.material })(
              <TextArea rows={6} />
            )}
          </Descriptions.Item>
          <Descriptions.Item label="客户评价">
            <div className="comment">
              <span className="comment-title">1. 服务人员按时到达？</span>
              {/* <Radio.Group onChange={this.onChange} value={this.state.value}> */}
              <Radio.Group>
                <Radio value="yes">是</Radio>
                <Radio value="no">否</Radio>
              </Radio.Group>
            </div>
            <div className="comment">
              <span className="comment-title">2. 服务人员态度如何？</span>
              <Radio.Group>
                <Radio value="good">好</Radio>
                <Radio value="general">一般</Radio>
                <Radio value="bad">差</Radio>
              </Radio.Group>
            </div>
            <div className="comment">
              <span className="comment-title">3. 服务人员是否打扫现场？</span>
              <Radio.Group>
                <Radio value="yes">是</Radio>
                <Radio value="no">否</Radio>
              </Radio.Group>
            </div>
            <div className="comment">
              <span className="comment-title">4. 您是否满意？</span>
              <Radio.Group>
                <Radio value="very">非常满意</Radio>
                <Radio value="good">满意</Radio>
                <Radio value="bad">不满意</Radio>
              </Radio.Group>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </>
    );
  }
}

export default Form.create({ name: "edit" })(EditForm);
