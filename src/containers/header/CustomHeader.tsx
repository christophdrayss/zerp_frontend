import React from 'react';
import './style.css';
import {Breadcrumb, Layout, Menu} from 'antd';
import {useSelector} from 'react-redux';
import {RootState} from '../index';

export default function CustomHeader() {
    return (
        <Layout.Header className="header layout-background">
            <div className="logo">
                <a>
                    <img src={'https://zerp.io/wp-content/uploads/2022/07/Untitled-design-24.png'} width={170} height={50} />
                </a>
            </div>
            <Menu theme="light" mode="horizontal" />
        </Layout.Header>
    );
}
