import React from "react";
import { Card, Icon, Descriptions, Popconfirm, Rate, Modal } from "antd";
import RecordTitle from "../RecordTitle";
import Print from "../../views/print";
import EditForm from "../EditForm";

class Records extends React.Component {
  state = {
    currentRecord: {},
    printVisible: false,
    editVisible: false
  };
  handlePrint = currentRecord => {
    this.setState({
      printVisible: true,
      currentRecord
    });
  };
  handleEdit = record => {
    this.setState({ editVisible: true, currentRecord: record });
  };
  handlePrintCancel = () => {
    this.setState({ printVisible: false });
  };
  handleAfterPrint = record => {
    // 交给上级处理
    if (this.props.handleAfterPrint) {
      this.props.handleAfterPrint(record);
    }
  };
  render() {
    const { records, handleDelete } = this.props;
    return (
      <div>
        {records.length > 0 &&
          records.map(record => (
            <Card
              style={{ marginBottom: 20 }}
              key={record.id}
              actions={[
                <Icon
                  type="printer"
                  key="printer"
                  onClick={() => this.handlePrint(record)}
                />,
                <Icon
                  type="edit"
                  key="edit"
                  onClick={() => this.handleEdit(record)}
                />,
                <Popconfirm
                  title="确定删除吗？"
                  onConfirm={() => handleDelete(record)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Icon type="delete" key="delete" />
                </Popconfirm>
              ]}
            >
              <Descriptions
                size="small"
                column={4}
                title={<RecordTitle record={record} />}
                bordered
              >
                <Descriptions.Item label="报修单位">
                  {record.company}
                </Descriptions.Item>
                <Descriptions.Item label="报修人">
                  {record.name}
                </Descriptions.Item>
                <Descriptions.Item label="报修地点">
                  {record.location}
                </Descriptions.Item>
                <Descriptions.Item label="联系电话">
                  {record.phone}
                </Descriptions.Item>
                <Descriptions.Item label="受理内容" span={2}>
                  {record.content}
                </Descriptions.Item>
                <Descriptions.Item label="预约时间">
                  {record.appointmentTime}
                </Descriptions.Item>
                <Descriptions.Item label="完成时间">
                  {record.completeTime}
                </Descriptions.Item>
                <Descriptions.Item label="服务内容" span={3}>
                  {record.serviceContent}
                </Descriptions.Item>
                <Descriptions.Item label="完工签字">
                  {record.repairer}
                </Descriptions.Item>
                <Descriptions.Item label="使用材料" span={4}>
                  {record.material}
                </Descriptions.Item>
                <Descriptions.Item label="客户评价">
                  <div className="comment">
                    <span className="comment-title">1. 服务人员按时到达？</span>
                    {(() => {
                      switch (record.timely) {
                        case "yes":
                          return (
                            <Icon
                              style={{
                                width: 20,
                                height: 20,
                                color: "#52c41a"
                              }}
                              type="check"
                            />
                          );
                        case "no":
                          return (
                            <Icon
                              style={{
                                width: 20,
                                height: 20,
                                color: "#f5222d"
                              }}
                              type="close"
                            />
                          );
                        default:
                          return null;
                      }
                    })()}
                  </div>
                  <div className="comment">
                    <span className="comment-title">
                      2. 服务人员是否打扫现场？
                    </span>
                    {(() => {
                      switch (record.clean) {
                        case "yes":
                          return (
                            <Icon
                              style={{
                                width: 20,
                                height: 20,
                                color: "#52c41a"
                              }}
                              type="check"
                            />
                          );
                        case "no":
                          return (
                            <Icon
                              style={{
                                width: 20,
                                height: 20,
                                color: "#f5222d"
                              }}
                              type="close"
                            />
                          );
                        default:
                          return null;
                      }
                    })()}
                  </div>
                  <div className="comment">
                    <span className="comment-title">3. 服务人员态度如何？</span>
                    {(() => {
                      switch (record.attitude) {
                        case "good":
                          return (
                            <Rate
                              count={1}
                              allowHalf
                              disabled
                              defaultValue={1}
                            />
                          );
                        case "general":
                          return (
                            <Rate
                              count={1}
                              allowHalf
                              disabled
                              defaultValue={0.5}
                            />
                          );
                        case "bad":
                          return (
                            <Rate
                              count={1}
                              allowHalf
                              disabled
                              defaultValue={0}
                            />
                          );
                        default:
                          return null;
                      }
                    })()}
                  </div>
                  <div className="comment">
                    <span className="comment-title">4. 您是否满意？</span>
                    {(() => {
                      switch (record.satisfaction) {
                        case "very":
                          return (
                            <Rate
                              count={1}
                              allowHalf
                              disabled
                              defaultValue={1}
                            />
                          );
                        case "good":
                          return (
                            <Rate
                              count={1}
                              allowHalf
                              disabled
                              defaultValue={0.5}
                            />
                          );
                        case "bad":
                          return (
                            <Rate
                              count={1}
                              allowHalf
                              disabled
                              defaultValue={0}
                            />
                          );
                        default:
                          return null;
                      }
                    })()}
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          ))}
        <Modal
          key="print"
          title="打印预览"
          width={800}
          visible={this.state.printVisible}
          onCancel={this.handlePrintCancel}
          footer={null}
        >
          <Print
            record={this.state.currentRecord}
            handleAfterPrint={this.handleAfterPrint}
          />
        </Modal>
        <Modal
          key="edit"
          width={980}
          visible={this.state.editVisible}
          onCancel={() => this.setState({ editVisible: false })}
          onOk={this.handleUpdate}
        >
          <EditForm record={this.state.currentRecord} />
        </Modal>
      </div>
    );
  }
}

export default Records;
