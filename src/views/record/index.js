import React from "react";
import Records from "../../components/Records";
import {
  Pagination,
  Card,
  BackTop,
  Divider,
  Button,
  Spin,
  message
} from "antd";
import TagSelect from "../../components/TagSelect";
import SearchBar from "../../components/SearchBar";
import { formatRecordDate } from "../../utils";

const { ipcRenderer } = window.electron;

class Record extends React.Component {
  state = {
    searchOptions: {
      serialNumber: "",
      location: "",
      createRange: [], // [start, end]
      ins: {}
    },
    pagination: {
      current: undefined,
      pageSize: undefined, // 每页条数
      total: undefined //总条数
    },
    loading: false,
    currentRecord: {},
    records: []
  };
  componentDidMount = () => {
    this.fetchData();
  };
  handleTagSelectChange = (key, value) => {
    const searchOptions = {
      ...this.state.searchOptions,
      ins: {
        ...this.state.searchOptions.ins,
        [key]: value
      }
    };
    this.setState({ searchOptions });
    this.fetchData(searchOptions);
  };
  handleSearch = values => {
    if (values.createRange) {
      values.createRange = values.createRange.map(item =>
        typeof item !== "string" && item.format
          ? item.format("YYYY-MM-DD")
          : item
      );
    }
    const searchOptions = {
      ...this.state.searchOptions,
      ...values
    };
    this.setState({ searchOptions });
    this.fetchData(searchOptions);
  };
  handlePageChange = (current, pageSize) => {
    const { searchOptions, pagination } = this.state;
    const newPagination = {
      ...pagination,
      current,
      pageSize
    };
    this.setState({ pagination: newPagination });
    this.fetchData(searchOptions, newPagination);
  };
  fetchData = (searchOptions = {}, pagination = undefined) => {
    this.setState({ loading: true });
    ipcRenderer
      .invoke("fetchList", searchOptions, pagination || this.state.pagination)
      .then(data => {
        this.setState({
          loading: false,
          records: data.list,
          pagination: data.pagination
        });
      });
  };
  handleUpdate = record => {
    ipcRenderer.invoke("update", formatRecordDate(record)).then(record => {
      message.success("修改成功", 2);
      // 更新原有数据
      const records = this.state.records.map(item => {
        if (item.id === record.id) {
          return {
            ...item,
            ...record
          };
        }
        return item;
      });
      this.setState({ records });
    });
  };
  handleDelete = async record => {
    this.setState({ loading: true });
    ipcRenderer.invoke("delete", record).then(record => {
      const { records } = this.state;
      const newRecords = records.filter(item => item.id !== record.id);
      records.splice(records.indexOf(record), 1);
      this.setState({
        records: newRecords,
        loading: false,
        pagination: {
          ...this.state.pagination,
          total: this.state.pagination.total - 1
        }
      });
      message.success("删除成功", 2.5);
    });
  };
  handleAfterPrint = record => {
    ipcRenderer.invoke("print", record).then(record => {});
  };
  render() {
    const ins = {
      // timely: {
      //   title: "按时到达",
      //   labels: [{ label: "是", value: "yes" }, { label: "否", value: "no" }]
      // },
      // clean: {
      //   title: "打扫现场",
      //   labels: [{ label: "是", value: "yes" }, { label: "否", value: "no" }]
      // },
      // attitude: {
      //   title: "态度如何",
      //   labels: [
      //     { label: "好", value: "good" },
      //     { label: "一般", value: "general" },
      //     { label: "差", value: "bad" }
      //   ]
      // },
      satisfaction: {
        title: "满意度",
        labels: [
          { label: "非常满意", value: "very" },
          { label: "满意", value: "good" },
          { label: "不满意", value: "bad" }
        ]
      },
      printed: {
        title: "是否打印",
        labels: [
          { label: "已打印", value: "yes" },
          { label: "未打印", value: "no" }
        ]
      }
    };

    const { pagination } = this.state;
    return (
      <div style={{ display: "relative" }}>
        <BackTop
          visibilityHeight={100}
          target={() => document.getElementById("main-scroll-content")}
        />
        <Card style={{ marginBottom: 20 }}>
          {Object.keys(ins).map(key => {
            const item = ins[key];
            return (
              <React.Fragment key={key}>
                <TagSelect
                  currentKey={key}
                  title={item.title}
                  options={item.labels}
                  onChange={(key, value) =>
                    this.handleTagSelectChange(key, value)
                  }
                />
                <Divider dashed={true} style={{ margin: 12 }} />
              </React.Fragment>
            );
          })}
          <SearchBar onSearch={values => this.handleSearch(values)} />
          <Divider dashed={true} style={{ margin: 12 }} />
          <Button>导出以下内容</Button>
        </Card>
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
        <Records
          records={this.state.records}
          handleDelete={this.handleDelete}
          handleUpdate={this.handleUpdate}
          handleAfterPrint={this.handleAfterPrint}
        />
        {pagination.current > 0 && (
          <Card style={{ textAlign: "center" }} bodyStyle={{ padding: 12 }}>
            <Pagination
              showTotal={total => `共 ${total} 项`}
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={(current, pageSize) =>
                this.handlePageChange(current, pageSize)
              }
            />
          </Card>
        )}
        <div style={{ height: 100 }}></div>
      </div>
    );
  }
}

export default Record;
