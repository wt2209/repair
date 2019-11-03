import React from 'react';
import { Row, Col, Statistic, Button, Card } from 'antd';

class Statistics extends React.Component {
  render() {
    return (
      <>
        <Row gutter={16}>
          <Col span={8}>
            <Statistic title="完成量" value={93} suffix="/ 100" />
          </Col>
          <Col span={8}>
            <Statistic title="满意度" value={98.1} suffix="%" />

          </Col>
          <Col span={8}>
            <Statistic title="准点率" value={50} suffix="%" />

          </Col>
        </Row>
      </>
    )
  }
}

export default Statistics;
