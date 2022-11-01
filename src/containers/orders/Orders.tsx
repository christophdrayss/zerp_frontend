import React, {useEffect, useState} from 'react';
import {Typography, PageHeader, Space, Table, DatePicker, Row, Col, Button, message, Modal} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {getOrders} from './orders-slice';
import {ColumnsType} from 'antd/es/table';
import {AppDispatch, RootState, ThunkFunctionType} from '../index';
import {AnyAction, Dispatch} from 'redux';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';

export default function Orders() {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const [createdAfter, setCreatedAfter] = useState<any>();

    const orders = useSelector((state: RootState) => state.order.orders);

    function navigateToOrderDetail(id: string) {
        navigate(`${id}`);
    }

    const columns: ColumnsType<any> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a onClick={() => navigateToOrderDetail(text)}>{text}</a>,
        },
        {
            title: 'Order Date',
            dataIndex: 'attributes',
            key: 'attributes.order_date',
            render: (item) => <div>{moment(item?.order_date).format('ddd, DD-MMM-YYYY @ h:mm:ss A')}</div>,
        },
        {
            title: 'Shipping to',
            dataIndex: 'attributes',
            key: 'attributes.shipping_address.address_line_1',
            render: (item) => <div>{item.shipping_address.address_line_1}</div>,
        },
        {
            title: 'Billing to',
            dataIndex: 'attributes',
            key: 'attributes.billing_address.address_line_1',
            render: (item) => <div>{item.billing_address.address_line_1}</div>,
        },
        {
            title: 'Tracking',
            key: '',
            dataIndex: 'tracking',
            render: (text, record) => (
                <div>
                    <div>
                        <span style={{color: 'darkblue', fontWeight: 700}}>Tracking No:</span> {record.attributes.tracking_number}
                    </div>
                    <br />
                    <div>
                        <span style={{color: 'orange', fontWeight: 700}}>Return No:</span>{' '}
                        {record.attributes.return_tracking_number}
                    </div>
                </div>
            ),
        },
        {
            title: 'Item Count',
            dataIndex: 'attributes.order_lines_count',
            key: 'attributes.order_lines_count',
        },
        {
            title: 'Order Items',
            key: '',
            dataIndex: 'tracking',
            render: (text, record) => {
                let orders = [];
                orders = record.orderItems.map((obj: any) => {
                    let description = obj.orderItem.attributes.description;
                    let initial = obj.orderItem.attributes.quantity_initial;
                    let reserved = obj.orderItem.attributes.quantity_reserved;
                    let shipped = obj.orderItem.attributes.quantity_shipped;
                    let returned = obj.orderItem.attributes.quantity_returned;
                    let canceled = obj.orderItem.attributes.quantity_canceled;
                    return {description, initial, reserved, shipped, returned, canceled};
                });
                return (
                    <div>
                        {orders.map((obj: any) => {
                            return (
                                <div>
                                    <div>{obj.description}</div>
                                    <br />
                                    <div>
                                        <span style={{color: 'purple', fontWeight: 700}}>initial: </span>
                                        {obj.initial}
                                    </div>
                                    <br />
                                    <div>
                                        <span style={{color: 'darkblue', fontWeight: 700}}>reserved:</span> {obj.reserved}
                                    </div>
                                    <br />
                                    <div>
                                        {' '}
                                        <span style={{color: 'green', fontWeight: 700}}>shipped: </span>
                                        {obj.shipped}
                                    </div>
                                    <br />
                                    <div>
                                        <span style={{color: 'orange', fontWeight: 700}}>returned: </span>
                                        {obj.returned}
                                    </div>
                                    <br />
                                    <div>
                                        <span style={{color: 'red', fontWeight: 700}}>canceled: </span>
                                        {obj.canceled}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            },
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
                        {/*{JSON.stringify(orders[0], null, 2)}*/}
                        <Table bordered={true} dataSource={orders} columns={columns} pagination={false} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}
