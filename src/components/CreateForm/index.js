import React from "react";
import {
  Descriptions,
  Input,
  DatePicker,
  Button,
  Card,
  Form,
  Modal,
  Spin
} from "antd";
import Print from "../../views/print";
import { formatRecordDate } from "../../utils";

class CreateForm extends React.Component {
  state = {
    loading: false,
    currentRecord: {},
    printVisible: false
  };

  handlePrint = currentRecord => {
    this.setState({
      printVisible: true,
      currentRecord
    });
  };
  handlePrintCancel = () => {
    this.setState({ printVisible: false });
  };
  handleSubmit = printNow => {
    this.props.form.validateFields((err, fields) => {
      if (err) {
        return;
      }
      this.setState({ loading: true });

      const { ipcRenderer } = window.electron;
      ipcRenderer.invoke("store", formatRecordDate(fields)).then(record => {
        this.setState({ loading: false });
      });

      // store(fields).then(record => {
      //   if (printNow) {
      //     this.handlePrint(formatRecordDate(record));
      //   }
      //   this.setState({ loading: false });
      // });
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <div
          style={{
            position: "fixed",
            zIndex: 10,
            top: 350,
            left: 0,
            textAlign: "center",
            width: "100%"
          }}
        >
          <Spin size="large" spinning={this.state.loading} />
        </div>
        <Card>
          <Descriptions size="small" column={3} title="报修" bordered>
            <Descriptions.Item label="报修单位">
              <Form.Item style={{ margin: 0 }}>
                {getFieldDecorator("company", {
                  rules: []
                })(<Input />)}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="报修人">
              <Form.Item style={{ margin: 0 }}>
                {getFieldDecorator("name", {
                  rules: []
                })(<Input />)}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="联系电话">
              <Form.Item style={{ margin: 0 }}>
                {getFieldDecorator("phone", {
                  rules: []
                })(<Input />)}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="报修地点">
              <Form.Item style={{ margin: 0 }}>
                {getFieldDecorator("location", {
                  rules: [
                    {
                      required: true,
                      message: "必须填写"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="预约时间">
              {getFieldDecorator("appointmentTime", {
                rules: []
              })(
                <DatePicker
                  showTime
                  placeholder="选择时间"
                  format="YYYY-MM-DD HH:mm"
                />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="受理时间">
              <Form.Item style={{ margin: 0 }}>
                {getFieldDecorator("createTime", {
                  rules: [
                    {
                      type: "object",
                      required: true,
                      message: "必须填写"
                    }
                  ]
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    placeholder="选择时间"
                  />
                )}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="受理内容" span={2}>
              <Form.Item style={{ margin: 0 }}>
                {getFieldDecorator("content", {
                  rules: [
                    {
                      required: true,
                      message: "必须填写"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item></Descriptions.Item>
          </Descriptions>
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Button
              size="large"
              onClick={() => this.handleSubmit(false)}
              style={{ width: 200, marginRight: 50 }}
            >
              提交
            </Button>
            <Button
              size="large"
              onClick={() => this.handleSubmit(true)}
              type="primary"
              style={{ width: 200 }}
            >
              提交并打印
            </Button>
          </div>
        </Card>
        <Modal
          title="打印预览"
          width={800}
          visible={this.state.printVisible}
          onCancel={this.handlePrintCancel}
          footer={null}
        >
          <Print record={this.state.currentRecord} />
        </Modal>
      </>
    );
  }
}

export default Form.create({ name: "createForm" })(CreateForm);
