import React from 'react'
import { Tag } from 'antd'

const { CheckableTag } = Tag
class TagSelect extends React.Component {
  state = {
    options: [],
    allOptionChecked: false,
    onChange: undefined
  }

  componentDidMount() {
    this.setState({
      options: this.props.options.map((option, index) => {
        option.checked = false
        return option
      }),
      onChange: this.props.onChange
    })
  }

  handleChange = (index) => {
    const { options } = this.state
    options[index].checked = !options[index].checked
    this.setState({
      options,
      allOptionChecked: options.filter(option => option.checked).length === options.length
    })
    this.setReturnValue()
    if (this.state.onChange) {
      this.state.onChange(this.setReturnValue(options))
    }
  }

  handleAllOptionChange = () => {
    const status = !this.state.allOptionChecked
    const { options } = this.state
    options.map(option => {
      option.checked = status
      return option
    })
    this.setState({
      allOptionChecked: status,
      options
    })
    if (this.state.onChange) {
      this.state.onChange(this.setReturnValue(options))
    }
  }

  setReturnValue = () => {
    const { options } = this.state
    let result = []
    for (const option of options) {
      if (option.checked) {
        result.push(option.value)
      }
    }
    return result
  }

  render() {
    const { title } = this.props
    return (
      <div>
        <span style={{ display: 'inline-block', width: 100, fontSize: 14 }}>{title}：</span>
        <CheckableTag style={{ fontSize: 14 }} key='all' checked={this.state.allOptionChecked} onChange={() => this.handleAllOptionChange()} >全部</CheckableTag>
        {
          this.state.options.map((option, index) => {
            return <CheckableTag style={{ fontSize: 14 }} key={option.label} checked={option.checked} onChange={() => this.handleChange(index)} >{option.label}</CheckableTag>
          })
        }
      </div>
    )
  }
}

export default TagSelect;
