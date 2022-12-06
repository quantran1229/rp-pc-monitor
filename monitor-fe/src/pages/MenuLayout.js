import React, {useState, useEffect} from 'react';
import { Layout, Tabs } from 'antd';
import { DashboardOutlined,SettingOutlined  } from '@ant-design/icons';
import moment from 'moment';
import {Action} from './Action';
import System from './System';
const { Content, Footer } = Layout;

const App = () => {
    const [time, setTime] = useState(moment().format("DD-MM-YY HH:mm:ss"));

    useEffect(() => {
        const interval = setInterval(() => setTime(moment().format("DD-MM-YY HH:mm:ss")), 1000);
        return () => {
          clearInterval(interval);
        };
    }, []);
    return (
      <Layout className="layout">
        <Content style={{ padding: '0 10px' }}>
            <Tabs defaultActiveKey="1" type='card' size='large'>
                <Tabs.TabPane tab={(<span><DashboardOutlined/><b>System</b></span>) } key="system" >
                    <System/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={(<span><SettingOutlined/><b>Action</b></span>) } key="2">
                    <Action/>
                </Tabs.TabPane>
            </Tabs>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Time: <b>{time}</b> (GMT+7) </Footer>
      </Layout>
    );
  };
  
  export default App;