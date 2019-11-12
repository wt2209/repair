import React from "react";
import { Descriptions, Input, DatePicker, Radio, Form, Modal } from "antd";
import moment from "moment";

const { TextArea } = Input;
class EditFormModal extends React.Component {
  handleOk = () => {
    this.props.form.validateFields((errors, values) => {
      const newRecord = {
        id: this.props.record.id,
        ...values
      };
      this.props.onOk(newRecord);
    });
  };
  render() {
    const { record, visible } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        key="edit"
        width={980}
        title="修改项目"
        visible={visible}
        onCancel={this.props.onCancel}
        onOk={this.handleOk}
      >
        <Descriptions
          className="tight"
          size="small"
          column={4}
          title={
            <div style={{ paddingBottom: 16 }}>
              <div style={{ float: "left" }}>编号：{record.serialNumber}</div>
              <div style={{ float: "right" }}>
                <span>受理时间：</span>
                {getFieldDecorator("createTime", {
                  initialValue: moment(record.createTime)
                })(
                  <DatePicker
                    format="YYYY-MM-DD HH:mm"
                    showTime
                    placeholder="选择时间"
                  />
                )}
              </div>
            </div>
          }
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
                ? moment(record.appointmentTime)
                : null
            })(
              <DatePicker
                format="YYYY-MM-DD HH:mm"
                showTime
                placeholder="选择时间"
              />
            )}
          </Descriptions.Item>
          <Descriptions.Item label="完成时间">
            {getFieldDecorator("completeTime", {
              initialValue: record.completeTime
                ? moment(record.completeTime)
                : null
            })(
              <DatePicker
                format="YYYY-MM-DD HH:mm"
                showTime
                placeholder="选择时间"
              />
            )}
          </Descriptions.Item>
          <Descriptions.Item label="服务内容" span={3}>
            {getFieldDecorator("serviceContent", {
              initialValue: record.serviceContent
            })(<Input />)}
          </Descriptions.Item>
          <Descriptions.Item label="完工签字">
            {getFieldDecorator("repairer", { initialValue: record.repairer })(
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
              {getFieldDecorator("timely", {
                initialValue: record.timely
              })(
                <Radio.Group>
                  <Radio value="yes">是</Radio>
                  <Radio value="no">否</Radio>
                </Radio.Group>
              )}
            </div>
            <div className="comment">
              <span className="comment-title">2. 服务人员是否打扫现场？</span>
              {getFieldDecorator("clean", {
                initialValue: record.clean
              })(
                <Radio.Group>
                  <Radio value="yes">是</Radio>
                  <Radio value="no">否</Radio>
                </Radio.Group>
              )}
            </div>
            <div className="comment">
              <span className="comment-title">3. 服务人员态度如何？</span>
              {getFieldDecorator("attitude", {
                initialValue: record.attitude
              })(
                <Radio.Group>
                  <Radio value="good">好</Radio>
                  <Radio value="general">一般</Radio>
                  <Radio value="bad">差</Radio>
                </Radio.Group>
              )}
            </div>
            <div className="comment">
              <span className="comment-title">4. 您是否满意？</span>
              {getFieldDecorator("satisfaction", {
                initialValue: record.satisfaction
              })(
                <Radio.Group>
                  <Radio value="very">非常满意</Radio>
                  <Radio value="good">满意</Radio>
                  <Radio value="bad">不满意</Radio>
                </Radio.Group>
              )}
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    );
  }
}

export default Form.create({ name: "edit" })(EditFormModal);
