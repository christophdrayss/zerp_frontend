import React, {useEffect} from 'react';
import {Typography, PageHeader, Space, Table} from 'antd';
import {useDispatch} from 'react-redux';
import {getOrders} from './orders-slice';
import {ColumnsType} from 'antd/es/table';
import {AppDispatch, ThunkFunctionType} from '../index';
import {AnyAction, Dispatch} from 'redux';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

export default function Orders() {
    const dispatch = useDispatch<any>();

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, {tags}) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        dispatch(getOrders());
    }, []);

    return (
        <div>
            <div>
                <Typography.Title level={2}>Orders</Typography.Title>
            </div>
        </div>
    );
}
