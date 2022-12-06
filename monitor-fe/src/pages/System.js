import React, {useEffect,useState} from 'react';
import { Space } from 'antd';
import '../index.css'
import { LineChart, Line,XAxis,YAxis, CartesianGrid,Label  } from 'recharts';
import { getSystemInfo } from '../api/api';
import moment from 'moment';
import doge from '../assets/doge.gif';
import sadDoge from '../assets/sad-doge.jpg';

function secondString(n) {
    let days = Math.floor(n / (60 * 60 * 24));
    n = n % (60 * 60 * 24);
    let hours = Math.floor(n / (60 * 60));
    n = n % (60 * 60);
    let mins = Math.floor(n / (60));
    n = n % 60;
    return `${days > 0 ? `${days} days ` : ''}${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins}:${n < 10 ? '0' + n : n}`
}

const System = ()=>{
    const [cpuData, setCPUData] = useState([]);
    const [ramData, setRAMData] = useState([]);
    const [upTime, setUptime] = useState(<span style={{fontSize:"large",color:"red", fontWeight:"bold"}}>OFF</span>);
    const [pic,setPic] = useState(sadDoge);
    useEffect(() => {
        const interval = setInterval(async () => {
            const data = await getSystemInfo();
            if (data) {
                setPic(doge)
                if (cpuData.length>180) cpuData.shift();
                setCPUData((old)=>[...old, {name:moment().format("HH:mm:ss"),uv:data.cpuUsage, amt: 2400}]);
                if (ramData.length>180) ramData.shift();
                setRAMData((old)=>[...old, {name:moment().format("HH:mm:ss"),uv:data.memUsage, amt: 2400}]);
                setUptime(secondString(data.timeOpen));
            } else {
                setPic(sadDoge);
                setUptime(<span style={{fontSize:"large",color:"red", fontWeight:"bold"}}>OFF</span>);
            }
        }, 2500);
        return () => {
          clearInterval(interval);
        };
    }, [cpuData,ramData,upTime,pic]);

    return (
        <Space direction='horizontal'>
        <Space direction="vertical">
            <LineChart width={360} height={98} data={cpuData}>
                <Line type="basic" dataKey="uv" stroke="#3633ff" dot={false} strokeWidth={3} isAnimationActive={false}/>
                <CartesianGrid stroke="#ccc" />
                <XAxis tick={false}>
                    <Label value={"CPU %"} offset={0} position="insideBottom" />
                </XAxis>
                <YAxis type='number' domain={[0,100]}/>
            </LineChart>
            <LineChart width={360} height={98} data={ramData}>
                <Line type="basic" dataKey="uv" stroke="#ff5733" dot={false} strokeWidth={3} isAnimationActive={false}/>
                <CartesianGrid stroke="#ccc" />
                <XAxis tick={false}>
                    <Label value={"RAM %"} offset={0} position="insideBottom" />
                </XAxis>
                <YAxis type='number' domain={[0,100]}/>
            </LineChart>
        </Space>
        <Space direction="vertical">
            <img src={pic} alt="doge" width={80}/>
            Uptime: 
            <br/>{upTime}
        </Space>
        </Space>
    )
}

export default System;