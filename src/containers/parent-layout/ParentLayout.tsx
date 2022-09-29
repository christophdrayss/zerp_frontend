import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu} from 'antd';
import './style.css';
import React from 'react';
import Navigator from '../navigator/Navigator';
import Sidebar from '../sidebar/Sidebar';
import CustomHeader from '../header/CustomHeader';
import {useSelector} from 'react-redux';
import {RootState} from '../index';

const {Header, Content, Sider} = Layout;
// const items1 = ['1', '2', '3'].map((key) => ({
//     key,
//     label: `nav ${key}`,
// }));

export default function ParentLayout() {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    return (
        <Layout>
            {isLoggedIn && <CustomHeader />}
            <Layout className={`${isLoggedIn ? 'body-layout' : ''}`}>
                {isLoggedIn && <Sidebar />}

                <Layout className="layout-background">
                    {/*<Breadcrumb*/}
                    {/*    style={{*/}
                    {/*        margin: '16px 0',*/}
                    {/*    }}>*/}
                    {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
                    <Content className="content-box-style">
                        <Navigator />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
