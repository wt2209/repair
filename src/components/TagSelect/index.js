import React from "react";
import { Tag, Divider } from "antd";

const { CheckableTag } = Tag;
class TagSelect extends React.Component {
  state = {
    options: [],
    allOptionChecked: false,
    onChange: undefined
  };

  componentDidMount() {
    this.setState({
      options: this.props.options.map((option, index) => {
        option.checked = false;
        return option;
      })
    });
  }

  handleChange = (key, index) => {
    const { options } = this.state;
    options[index].checked = !options[index].checked;
    this.setState({
      options,
      allOptionChecked:
        options.filter(option => option.checked).length === options.length
    });
    this.setReturnValue();
    if (this.props.onChange) {
      this.props.onChange(key, this.setReturnValue(options));
    }
  };

  setReturnValue = () => {
    const { options } = this.state;
    let result = [];
    for (const option of options) {
      if (option.checked) {
        result.push(option.value);
      }
    }
    return result;
  };

  render() {
    const { title, currentKey } = this.props;
    return (
      <div>
        <span style={{ display: "inline-block", width: 100, fontSize: 14 }}>
          {title}：
        </span>
        {this.state.options.map((option, index) => {
          return (
            <CheckableTag
              style={{ fontSize: 14 }}
              key={currentKey + "_" + option.value}
              checked={option.checked}
              onChange={() => this.handleChange(currentKey, index)}
            >
              {option.label}
            </CheckableTag>
          );
        })}
      </div>
    );
  }
}

export default TagSelect;
