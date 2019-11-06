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
import { fetchList, deleteOne } from "../../server";

class Record extends React.Component {
  state = {
    searchOptions: {
      serialNumber: "",
      location: "",
      createRange: [], // [start, end]
      attitude: [], // ['very', 'good', 'bad']
      printed: [] // ['yes', 'no']
    },
    loading: false,
    currentRecord: {},
    records: [],
    pagination: {
      current: undefined,
      pageSize: undefined, // 每页条数
      total: undefined //总条数
    }
  };
  componentDidMount = () => {
    this.fetchData();
  };
  handleAttitudeChange = value => {
    const searchOptions = {
      ...this.state.searchOptions,
      attitude: value
    };
    this.setState({ searchOptions });
    this.fetchData(searchOptions);
  };
  handlePrintedChange = value => {
    const searchOptions = {
      ...this.state.searchOptions,
      printed: value
    };
    this.setState({ searchOptions });
    this.fetchData(searchOptions);
  };
  handleSearch = values => {
    if (values.createRange) {
      values.createRange = values.createRange.map(item =>
        typeof item !== "string" ? item.format("YYYY-MM-DD") : item
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
  fetchData = async (searchOptions = {}, pagination) => {
    this.setState({ loading: true });
    const data = await fetchList(
      searchOptions,
      pagination || this.state.pagination
    );
    this.setState({
      loading: false,
      records: data.list,
      pagination: data.pagination
    });
  };
  handleEdit = record => {
    console.log("edit", record);
  };
  handleDelete = async record => {
    this.setState({ loading: true });
    await deleteOne(record);
    const { records } = this.state;
    records.splice(records.indexOf(record), 1);
    this.setState({ records, loading: false });
    message.success("删除成功", 2.5);
  };
  render() {
    const attitude = [
      { label: "非常满意", value: "very" },
      { label: "满意", value: "good" },
      { label: "不满意", value: "bad" }
    ];
    const printStatus = [
      { label: "已打印", value: "yes" },
      { label: "未打印", value: "no" }
    ];
    const { pagination } = this.state;
    return (
      <div style={{ display: "relative" }}>
        <BackTop
          visibilityHeight={100}
          target={() => document.getElementById("main-scroll-content")}
        />
        <Card style={{ marginBottom: 20 }}>
          <TagSelect
            options={attitude}
            title="态度"
            onChange={value => this.handleAttitudeChange(value)}
          />
          <Divider dashed={true} style={{ margin: 12 }} />
          <TagSelect
            options={printStatus}
            title="是否打印"
            onChange={value => this.handlePrintedChange(value)}
          />
          <Divider dashed={true} style={{ margin: 12 }} />
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
          handleEdit={this.handleEdit}
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
