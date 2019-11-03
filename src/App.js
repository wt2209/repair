import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import Create from './views/create';
import Record from './views/record';
import Statistics from './views/statistics';
import Example from './views/print';

const { Header, Content } = Layout;

const routes = [
  { name: '报修', path: '/create', component: Create },
  { name: '查询', path: '/record', component: Record },
  { name: '统计', path: '/statistics', component: Statistics },
  { name: '打印', path: '/print', component: Example },
  { path: '/', redirect: '/create' },
]

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout className="layout">
          <Header style={{ textAlign: 'center', position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu
              theme="dark"
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

          <Content style={{ marginTop: 64, boxSizing: 'border-box', flex: 1, overflow: 'scroll' }}>
            <div style={{ margin: '24px auto 0', width: 1000 }}>
              {routes.map((route, index) => {
                return route.redirect
                  ? <Redirect key={route.path} to={route.redirect} />
                  : <Route path={route.path} key={route.name} component={route.component} />
              })}
            </div>
          </Content>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
