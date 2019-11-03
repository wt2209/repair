import React from 'react';
import { Card, Icon, Descriptions, Radio } from 'antd';
import RecordTitle from '../RecordTitle';

class Records extends React.Component {

  render() {
    const { records } = this.props;
    return (
      <>
        {records.length > 0 && records.map(record => (
          <Card
            style={{ marginBottom: 20 }}
            key={record.serialNumber}
            actions={
              [
                <Icon type="setting" key="setting" />,
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />,
              ]}
          >
            <Descriptions size="small" column={4} title={<RecordTitle title={record.serialNumber} />} bordered>
              <Descriptions.Item label="报修单位">{record.company}</Descriptions.Item>
              <Descriptions.Item label="报修人">{record.name}</Descriptions.Item>
              <Descriptions.Item label="报修地点">{record.location}</Descriptions.Item>
              <Descriptions.Item label="联系电话">{record.phone}</Descriptions.Item>
              <Descriptions.Item label="受理内容" span={2}>{record.content}</Descriptions.Item>
              <Descriptions.Item label="预约时间">{record.appointmentTime}</Descriptions.Item>
              <Descriptions.Item label="完成时间">{record.completeTime}</Descriptions.Item>
              <Descriptions.Item label="服务内容" span={3}>{record.serviceContent}</Descriptions.Item>
              <Descriptions.Item label="完工签字">{record.repairer}</Descriptions.Item>
              <Descriptions.Item label="使用材料" span={4}>{record.material}</Descriptions.Item>
              <Descriptions.Item label="客户评价">
                <div className="comment">
                  <span className="comment-title">1. 服务人员按时到达？</span>
                  {/* <Radio.Group onChange={this.onChange} value={this.state.value}> */}
                  <Radio.Group defaultValue={record.timely}>
                    <Radio value='yes'>是</Radio>
                    <Radio value='no'>否</Radio>
                  </Radio.Group>
                </div>
                <div className="comment">
                  <span className="comment-title">2. 服务人员态度如何？</span>
                  <Radio.Group defaultValue={record.attitude}>
                    <Radio value="good">好</Radio>
                    <Radio value='general'>一般</Radio>
                    <Radio value='bad'>差</Radio>
                  </Radio.Group>
                </div>
                <div className="comment">
                  <span className="comment-title">3. 服务人员是否打扫现场？</span>
                  <Radio.Group defaultValue={record.clean}>
                    <Radio value='yes'>是</Radio>
                    <Radio value='no'>否</Radio>
                  </Radio.Group>
                </div>
                <div className="comment">
                  <span className="comment-title">4. 您是否满意？</span>
                  <Radio.Group defaultValue={record.satisfaction}>
                    <Radio value='very'>非常满意</Radio>
                    <Radio value='good'>满意</Radio>
                    <Radio value='bad'>不满意</Radio>
                  </Radio.Group>
                </div>
              </Descriptions.Item>
            </Descriptions >
          </Card >
        ))
        }
      </>
    )
  }
}

export default Records;
