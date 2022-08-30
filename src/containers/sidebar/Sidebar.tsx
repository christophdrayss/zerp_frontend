import React from 'react';
import {Breadcrumb, Layout, Menu} from 'antd';
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
    getItem('Dashboard', 'd', <DashboardOutlined />, [
        getItem('Orders', 'd1'),
        getItem('Zerp Inventory', 'd2'),
        getItem('Shopify Inventory', 'd3'),
        getItem('Zalando Status', 'd4'),
        getItem('Logs', 'd4'),
    ]),
    getItem('User Profile', 'u', <UserOutlined />, [getItem('Settings', 'u1'), getItem('Logout', 'u3')]),
];

console.log(items);

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `    subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});

export default function Sidebar() {
    return (
        <Layout.Sider className="layout-background">
            <Menu mode="inline" items={items} defaultOpenKeys={['d']} />
        </Layout.Sider>
    );
}
