import React from 'react';
import { Button, Space, Divider } from 'antd';
import { YoutubeOutlined,PoweroffOutlined,FacebookFilled,ReloadOutlined,GlobalOutlined ,CodeOutlined,BulbOutlined } from '@ant-design/icons';
import { fetchApp, fetchRestart, fetchSleep, fetchShutdown } from '../api/api';

export class Action extends React.Component {
    internet = async () =>{
        await fetchApp("web");
    }
    facebook = async () =>{
        await fetchApp("facebook");
    }
    youtube = async () =>{
        await fetchApp("youtube");
    }
    code = async () =>{
        await fetchApp("code");
    }
    shutdown = async () =>{
        await fetchShutdown();
    }
    sleep = async () =>{
        await fetchSleep();
    }
    restart = async () =>{
        await fetchRestart();
    }
    render() {
        return (
            <Space direction="vertical" style={{paddingTop:"8px"}}>
                <Space wrap>
                    <Button type="primary" icon={<GlobalOutlined />} onClick={this.internet} size="large">Internet</Button>
                    <Button type="primary" icon={<YoutubeOutlined />} onClick={this.youtube} size="large" danger>Youtube</Button>
                    <Button type="primary" icon={<FacebookFilled />} onClick={this.facebook} size="large">Facebook</Button>
                </Space>
                <Space wrap>
                    <Button type="primary" icon={<CodeOutlined />} onClick={this.code} size="large">Code</Button>
                </Space>
                <Divider></Divider>
                <Space wrap>
                    <Button type="primary" icon={<ReloadOutlined />} size="large" onClick={this.restart}>Restart</Button>
                    <Button type="primary" icon={<PoweroffOutlined />} size="large" onClick={this.shutdown} danger>Shut down</Button>
                    <Button type="primary" icon={<BulbOutlined />} size="large" onClick={this.sleep}>Sleep</Button>
                </Space>
            </Space>
        )
    }
}