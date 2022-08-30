import React from 'react';
import './style.css';
import {Breadcrumb, Layout, Menu} from 'antd';

export default function CustomHeader() {
    return (
        <Layout.Header className="header">
            <div className="logo">
                <a>
                    <img src={'https://zerp.io/wp-content/uploads/2022/07/Untitled-design-24.png'} width={170} height={50} />
                </a>
            </div>
            <Menu theme="light" mode="horizontal" />
        </Layout.Header>
    );
}
