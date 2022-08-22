import React, { Component } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Card, Spin, Alert } from 'antd'
import '../../ui/ui.less'

export default class Loading extends Component {

    render() {
        const icon = (
            <LoadingOutlined
                style={{
                    fontSize: 24,
                }}
                spin
            />
        )
        return (
            <>
                <Card title="Spin用法" className='card-wrap' >
                    <Spin size='small' />
                    <Spin style={{ margin: '0 10px' }} />
                    <Spin size='large' />
                    <Spin indicator={icon} style={{ margin: '0 10px' }} />
                </Card>
                <Card title="内容遮罩" className='card-wrap'>
                    <Alert
                        message="React标题"
                        description="描述信息--info"
                        type="success"
                    />
                    <Spin>
                        <Alert
                            message="React标题"
                            description="描述信息--waring"
                            type="warning"
                        />
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert
                            message="React标题"
                            description="描述信息--waring"
                            type="warning"
                        />
                    </Spin>
                    <Spin indicator={icon}>
                        <Alert
                            message="React标题"
                            description="描述信息--waring"
                            type="warning"
                        />
                    </Spin>
                </Card>
            </>
        )
    }
}
