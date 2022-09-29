import React from 'react';
import {} from 'react-router-dom';
import {Breadcrumb, Layout, Menu} from 'antd';
import {useNavigate} from 'react-router-dom';
import {LaptopOutlined, NotificationOutlined, UserOutlined, DashboardOutlined} from '@ant-design/icons';
import type {MenuProps, MenuTheme} from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: string, key?: string, icon?: React.ReactNode, children?: MenuItem[], theme?: 'light' | 'dark'): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        theme,
    } as MenuItem;
}
const items: MenuItem[] = [
    getItem('Dashboard', 'd', <DashboardOutlined />, [getItem('Orders', 'orders'), getItem('Logs', 'logs')]),
    getItem('User Profile', 'u', <UserOutlined />, [getItem('Settings', 'u1'), getItem('Logout', 'logout')]),
];

export default function Sidebar() {
    const navigate = useNavigate();
    return (
        <Layout.Sider className="layout-background">
            <Menu mode="inline" items={items} defaultOpenKeys={['d']} onClick={(e) => navigate(e.key)} />
        </Layout.Sider>
    );
}
