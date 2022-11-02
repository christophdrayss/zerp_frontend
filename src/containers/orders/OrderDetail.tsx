import React, {useEffect} from 'react';
import {useParams} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../index';
import {getOrderFromState, updateStatus, updateTracking} from './orders-slice';
import ReactJson from 'react-json-view';
import {Row, Col, Form, Input, Radio, Button, message, Typography} from 'antd';
import {Collapse} from 'antd';

export default function OrderDetail() {
    const dispatch = useDispatch<any>();
    const {orderId} = useParams();

    const orderDetail: any = useSelector((state: RootState) => state.order.orderDetail);

    useEffect(() => {
        dispatch(getOrderFromState(orderId));
    }, []);

    function handleSetStatusSubmit(data: any) {
        console.log(data);
        let orderItemId = data.orderItemId;
        let orderLineId = data.orderLineId;
        let orderReasonNo = data.orderReasonNo;
        let status = data.status;
        if (orderId) {
            dispatch(updateStatus(orderId, orderItemId, orderLineId, orderReasonNo, status));
        }
    }

    function handleTrackingSubmit(data: any) {
        console.log(data);
        let trackingNo = data.trackingNo;
        let returnTrackingNo = data.returnTrackingNo;
        if (orderId) {
            dispatch(updateTracking(orderId, trackingNo, returnTrackingNo));
        } else {
            message.error('orderId is not valid');
        }
    }

    return (
        <div>
            <Row style={{marginBottom: 20}}>
                <Col>
                    <Typography.Text>
                        <b>Order Id: </b>
                        <span>{orderId}</span>
                    </Typography.Text>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Collapse>
                        <Collapse.Panel header="Order Items" key="1">
                            {orderDetail?.orderItems?.map((item: any, idx: number) => {
                                return (
                                    <Collapse defaultActiveKey={idx}>
                                        <Collapse.Panel header={`Item no: ${idx + 1}`} key={idx + 2}>
                                            {item?.orderLines?.map((line: any, idx: number) => {
                                                return (
                                                    <Row>
                                                        <Col>
                                                            <Row>
                                                                <div>
                                                                    <b>Type:</b> {line.type}
                                                                </div>
                                                            </Row>
                                                            <Row>
                                                                <div>
                                                                    <b>Order Item Id: </b>
                                                                    {item.orderItem.id}
                                                                </div>
                                                            </Row>
                                                            <Row>
                                                                <div>
                                                                    <b>Order Line Id: </b>
                                                                    {line.id}
                                                                </div>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    <ReactJson
                                                                        name={'attributes'}
                                                                        collapsed={true}
                                                                        src={line.attributes}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    <Typography.Title level={5}>Set Status</Typography.Title>
                                                                    <Form
                                                                        onFinish={(data) =>
                                                                            handleSetStatusSubmit({
                                                                                status: data.status,
                                                                                orderItemId: item.orderItem.id,
                                                                                orderReasonNo: data.orderReasonNo,
                                                                                orderLineId: line.id,
                                                                            })
                                                                        }
                                                                        wrapperCol={{span: 24}}
                                                                        layout="horizontal">
                                                                        <Form.Item name="orderReasonNo" label="Return Reason No">
                                                                            <Input />
                                                                        </Form.Item>
                                                                        <Form.Item name="status">
                                                                            <Radio.Group>
                                                                                <Radio value="shipped">Shipped</Radio>
                                                                                <Radio value="returned"> Returned </Radio>
                                                                            </Radio.Group>
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            style={{marginTop: 10}}
                                                                            wrapperCol={{offset: 0, span: 16}}>
                                                                            <Button type="primary" htmlType="submit">
                                                                                Submit
                                                                            </Button>
                                                                        </Form.Item>
                                                                    </Form>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                );
                                            })}
                                        </Collapse.Panel>
                                    </Collapse>
                                );
                            })}
                        </Collapse.Panel>
                    </Collapse>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <Typography.Title level={5}>Set Tracking</Typography.Title>
                    <Form onFinish={handleTrackingSubmit} wrapperCol={{span: 24}} layout="horizontal">
                        <Form.Item name="trackingNo" label="Tracking No">
                            <Input />
                        </Form.Item>
                        <Form.Item name="returnTrackingNo" label="Return Tracking No">
                            <Input />
                        </Form.Item>

                        <Form.Item style={{marginTop: 10}} wrapperCol={{offset: 0, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>{/*<ReactJson src={orderDetail} />*/}</Col>
            </Row>
        </div>
    );
}
