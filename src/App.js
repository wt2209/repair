import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import Create from './views/create';
import Record from './views/record';
import Statistics from './views/statistics';

const { Header, Content, Footer } = Layout;

const routes = [
  { name: '报修', path: '/create', component: Create },
  { name: '查询', path: '/record', component: Record },
  { name: '统计', path: '/statistics', component: Statistics },
]

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout className="layout">
          <Header style={{ textAlign: 'center', background: 'white' }}>
            <div className="logo" />
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">
                <Link to="/create">报修</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/record">查询</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/statistics">统计</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px', marginTop: 24 }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              {routes.map((route, index) => (
                <Route path={route.path} key={route.name} component={route.component} />
              ))}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
