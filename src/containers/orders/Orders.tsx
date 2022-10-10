import React, {useEffect, useState} from 'react';
import {Typography, PageHeader, Space, Table, DatePicker, Row, Col, Button, message} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {getOrders} from './orders-slice';
import {ColumnsType} from 'antd/es/table';
import {AppDispatch, RootState, ThunkFunctionType} from '../index';
import {AnyAction, Dispatch} from 'redux';
import moment from 'moment';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

export default function Orders() {
    const dispatch = useDispatch<any>();

    const [createdAfter, setCreatedAfter] = useState<any>();

    const orders = useSelector((state: RootState) => state.order.orders);

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

    function handleSearch() {
        if (createdAfter) {
            dispatch(getOrders(createdAfter));
        } else {
            message.error('please select crated after date');
        }
    }

    return (
        <div>
            <div>
                <Typography.Title level={2}>Orders</Typography.Title>
            </div>
            <div>
                <Row align={'middle'} justify={'start'}>
                    <Col span={2}>
                        <Typography.Text strong>Created After </Typography.Text>
                    </Col>
                    <Col span={3}>
                        <DatePicker
                            disabledDate={(currentDate) => currentDate.isAfter(moment(), 'day')}
                            onChange={(date) => {
                                setCreatedAfter(date?.toISOString());
                            }}
                            style={{width: '100%'}}
                        />
                    </Col>
                    <Col span={2}>
                        <Button onClick={() => handleSearch()} type="primary">
                            Search
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table dataSource={orders} columns={columns} pagination={false} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}
