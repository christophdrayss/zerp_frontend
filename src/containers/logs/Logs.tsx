import React, {useEffect} from 'react';
import {Typography, PageHeader, Space, Table, Tag} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {getLogs} from './logs-slice';
import {RootState} from '../index';
import {ColumnsType} from 'antd/es/table';
import moment from 'moment';

interface DataType {
    id: string;
    userId: string;
    level: string;
    event: string;
    service: string;
    message: string;
    createdAt: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        width: '5%',
        render: (text) => text,
    },
    {
        title: 'User',
        dataIndex: 'userId',
        key: 'userId',
        width: '5%',
        render: (text) => text,
    },
    {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
        width: '5%',
        render: (text) => {
            let color = 'grey';
            if (text === 'error') {
                color = 'red';
            } else if (text === 'warning') {
                color = 'yellow';
            } else if (text === 'info') {
                color = 'blue';
            } else if (text === 'notice') {
                color = 'purple';
            }
            return (
                <Tag color={color} key={text}>
                    {text}
                </Tag>
            );
        },
    },
    {
        title: 'Service',
        dataIndex: 'service',
        key: 'service',
        width: '5%',
        render: (text) => text,
    },
    {
        title: 'event',
        dataIndex: 'event',
        key: 'event',
        width: '5%',
        render: (text) => text,
    },
    {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
        // width: '20%',
        render: (text) => text,
    },
    {
        title: 'payload',
        dataIndex: 'data',
        key: 'data',
        render: (text) => text,
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '24%',
        render: (text) => {
            return moment(text).format('ddd, DD-MMM-YYYY @ h:mm:ss A');
        },
    },
];

export default function Logs() {
    const dispatch = useDispatch<any>();
    const logs = useSelector((state: RootState) => state.log.logs);

    useEffect(() => {
        dispatch(getLogs());
    }, []);

    return (
        <div>
            <div>
                <Typography.Title level={2}>Logs</Typography.Title>
            </div>
            {/*{JSON.stringify(logs)}*/}
            <Table dataSource={logs} columns={columns} />
        </div>
    );
}
