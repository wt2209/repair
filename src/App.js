import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import Create from './views/create';
import Record from './views/record';
import Statistics from './views/statistics';

const { Header, Content } = Layout;

const routes = [
  { name: '报修', path: '/create', component: Create },
  { name: '查询', path: '/record', component: Record },
  { name: '统计', path: '/statistics', component: Statistics },
  { path: '/', redirect: '/record' },
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
              defaultSelectedKeys={['报修']}
              style={{ lineHeight: '64px' }}
            >
              {routes.length > 0 && routes.map(route => {
                return route.component
                  ? (
                    <Menu.Item key={route.name}>
                      <Link to={route.path}>{route.name}</Link>
                    </Menu.Item>
                  )
                  : null
              })
              }
            </Menu>
          </Header>

          <Content id="main-scroll-content" style={{ marginTop: 64, boxSizing: 'border-box', flex: 1, overflow: 'scroll' }}>
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
