import React, { Component } from 'react'
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DownloadOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Card, Button, Radio } from 'antd'
import '../../ui/ui.less'
export default class Buttons extends Component {
    state = {
        loading: true,
        size: "default"
    }
    handleCloseLoading = () => {
        this.setState({ loading: !this.state.loading })
    }
    handleChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({ size: e.target.value })
    }
    render() {
        return (
            <>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">Imooc</Button>
                    <Button>Imooc</Button>
                    <Button type="dashed">Imooc</Button>
                    <Button type="danger">Imooc</Button>
                    <Button disabled>Imooc</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap">
                    <Button icon={<PlusOutlined />}>创建</Button>
                    <Button icon={<EditOutlined />}>编辑</Button>
                    <Button icon={<DeleteOutlined />}>删除</Button>
                    <Button type="circle" icon={<SearchOutlined />}></Button>
                    <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
                    <Button type="primary" icon={<DownloadOutlined />}>下载</Button>
                </Card>
                <Card title="Loding按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape='circle' loading={this.state.loading}></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button shape='circle' loading={this.state.loading}></Button>
                    <Button type="primary" onClick={() => { this.handleCloseLoading() }} >{this.state.loading ? "关闭" : "下载"}</Button>
                </Card>
                <Card title="按钮组" style={{ marginBottom: 10, width: "100%" }} >
                    <Button.Group>
                        <Button type="primary" icon={<LeftOutlined />}>后退</Button>
                        <Button type="primary" icon={<RightOutlined />}>前进</Button>
                    </Button.Group>
                </Card>
                <Card title="按钮大小" className="card-wrap">
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Imooc</Button>
                    <Button size={this.state.size}>Imooc</Button>
                    <Button type="dashed" size={this.state.size}>Imooc</Button>
                    <Button type="danger" size={this.state.size}>Imooc</Button>
                    <Button disabled size={this.state.size}>Imooc</Button>
                </Card>
            </>
        )
    }
}
