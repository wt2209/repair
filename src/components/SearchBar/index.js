import React from 'react'
import { Input, Form, Button, DatePicker } from 'antd'

const { RangePicker } = DatePicker

class SearchBar extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const { onSearch } = this.props
    if (onSearch) {
      this.props.form.validateFields((_, values) => {
        onSearch(values)
      });
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 100 }}>搜索：</div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('serialNumber')(
              <Input placeholder="编号" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('location')(
              <Input placeholder="报修地点" />
            )}
          </Form.Item>
          <Form.Item style={{ width: 220 }}>
            {getFieldDecorator('create-range')(
              <RangePicker />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create('search')(SearchBar);
