import React from "react";
import ReactToPrint from "react-to-print";
import { Button } from "antd";

class TemplateToPrint extends React.Component {
  render() {
    const { record } = this.props;
    return (
      <div className="print-area">
        <div className="print-title">青岛诚晟物业（协力公寓）服务单</div>
        <table className="print-table">
          <tbody>
            <tr>
              <td colSpan={8} style={{ border: "none" }}>
                <div className="print-serial-number">
                  <span style={{ float: "left" }}>
                    编号：{record.serialNumber}
                  </span>
                  <span style={{ float: "right" }}>
                    受理时间：{record.createTime}
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="print-label">报修单位</td>
              <td className="print-content">{record.company}</td>
              <td className="print-label">报修人</td>
              <td className="print-content">{record.name}</td>
              <td className="print-label">报修地点</td>
              <td className="print-content">{record.location}</td>
              <td className="print-label">联系电话</td>
              <td className="print-content">{record.phone}</td>
            </tr>
            <tr>
              <td className="print-label">受理内容</td>
              <td className="print-content" colSpan={3}>
                {record.content}
              </td>
              <td className="print-label">预约时间</td>
              <td className="print-content">{record.appointmentTime}</td>
              <td className="print-label">完成时间</td>
              <td className="print-content">{record.completeTime}</td>
            </tr>
            <tr>
              <td className="print-label">服务内容</td>
              <td className="print-content" colSpan={5}>
                {record.serviceContent}
              </td>
              <td className="print-label">完工签字</td>
              <td className="print-content">{record.repairer}</td>
            </tr>
            <tr>
              <td className="print-label" style={{ height: "70px" }}>
                使用材料
              </td>
              <td className="print-content" colSpan={7}>
                {record.matetial}
              </td>
            </tr>
            <tr>
              <td colSpan={8} style={{ textAlign: "left" }}>
                客户评价(打“ √ ”)：
              </td>
            </tr>
            <tr>
              <td colSpan={8} style={{ textAlign: "left" }}>
                <span style={{ display: "inline-block", width: 280 }}>
                  1. 服务人员按时到达？ 是(
                  {record.timely === "yes" ? " √ " : <>&nbsp;&nbsp;&nbsp;</>})
                  否({record.timely === "no" ? " √ " : <>&nbsp;&nbsp;&nbsp;</>})
                </span>
                <span style={{ display: "inline-block" }}>
                  3. 服务人员态度如何？ 好(
                  {record.attitude === "good" ? " √ " : <>&nbsp;&nbsp;&nbsp;</>}
                  ) 一般(
                  {record.attitude === "general" ? (
                    " √ "
                  ) : (
                    <>&nbsp;&nbsp;&nbsp;</>
                  )}
                  ) 差(
                  {record.attitude === "bad" ? " √ " : <>&nbsp;&nbsp;&nbsp;</>})
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan={8} style={{ textAlign: "left" }}>
                <span style={{ display: "inline-block", width: 280 }}>
                  2. 服务人员打扫现场？ 是(
                  {record.clean === "yes" ? " √ " : <>&nbsp;&nbsp;&nbsp;</>})
                  否({record.clean === "no" ? " √ " : <>&nbsp;&nbsp;&nbsp;</>})
                </span>
                <span style={{ display: "inline-block" }}>
                  4. 您是否满意？ 非常满意(
                  {record.satisfaction === "very" ? (
                    " √ "
                  ) : (
                    <>&nbsp;&nbsp;&nbsp;</>
                  )}
                  ) 满意(
                  {record.satisfaction === "good" ? (
                    " √ "
                  ) : (
                    <>&nbsp;&nbsp;&nbsp;</>
                  )}
                  ) 不满意(
                  {record.satisfaction === "bad" ? (
                    " √ "
                  ) : (
                    <>&nbsp;&nbsp;&nbsp;</>
                  )}
                  )
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const pageStyle = `
.print-area {
  text-align: center;
}

.print-title {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}

.print-serial-number {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}

.print-table {
  margin: 0 auto;
  border-collapse: collapse;
}

.print-table td {
  border: 1px solid black;
  line-height: 1.4em;
  padding: 3px;
}

.print-table td.print-label {
  text-align: center;
  min-width: 70px;
}

.print-table td.print-content {
  text-align: left;
  min-width: 100px;
  font-weight: bold;
  font-family: "黑体";
}

@media print {
  body {
    padding: 0.5cm;
  }
}
`;

class Print extends React.Component {
  state = {
    loading: false
  };
  handleClick = () => {
    this.setState({
      loading: true
    });
  };
  handleAfterPrint = () => {
    this.setState({
      loading: false
    });
  };
  render() {
    const { record } = this.props;
    return (
      <div>
        <ReactToPrint
          content={() => this.componentRef}
          copyStyles={false}
          pageStyle={pageStyle}
          trigger={() => (
            <div style={{ textAlign: "right", marginBottom: 20 }}>
              <Button
                loading={this.state.loading}
                onClick={this.handleClick}
                type="primary"
              >
                打印
              </Button>
            </div>
          )}
          onAfterPrint={this.handleAfterPrint}
        />
        <TemplateToPrint record={record} ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Print;
