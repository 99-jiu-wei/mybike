import React, { Component } from 'react'
import { Card, Table, Modal, Button, message } from 'antd'
import axios from './../../axios'
import { utils } from './../../utils/utils'
import '../ui/ui.less'

export default class BasicTable extends Component {
    state = {
        dataSource: [],
        dataSource2: []
    }
    param = {
        page: 1
    }//不需要重新渲染
    componentDidMount() {
        const dataSource = [
            {
                id: '0',
                userName: 'Jack',
                sex: '1',
                state: '1',
                hobby: '1',
                isMarried: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            }, {
                id: '1',
                userName: 'Tom',
                sex: '1',
                state: '1',
                hobby: '1',
                isMarried: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            }, {
                id: '2',
                userName: 'Susan',
                sex: '1',
                state: '1',
                hobby: '1',
                isMarried: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            }
        ]
        dataSource.map((item, index) => {
            item.key = index;
            return item;
        })
        this.setState({ dataSource });
        this.request();
    }
    request = () => {
        let _this = this;
        axios.ajax({
            url: '/table/list',
            data: {
                param: {
                    page: this.param.page
                },
                isShowLoading: true
            }
        }).then(res => {
            if (res.code === 0) {
                res.result.list.map((item, index) => {
                    item.key = index;
                    return item;
                })
                this.setState({
                    dataSource2: res.result.list,
                    selectedRowKeys: [],
                    selectedRows: null,
                    pagination: utils.pagination(res, (current) => {
                        _this.param.page = current;
                        this.request();
                    })
                })
            }
        })
    }
    onRowClick = (record, index) => {
        let selectKey = [index];
        Modal.info({
            title: '信息',
            content: `用户名：${record.userName},用户爱好：${record.hobby}`
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
    handleDelete = () => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map(item => {
            ids.push(item.id)
            return item;
        })
        Modal.confirm({
            title: "删除提示",
            content: `您确定要删除这些数据吗？${ids.join(',')}`,
            onOk: () => {
                message.success('删除成功');
                this.request();
            }
        })
    }
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                render(state) {
                    let config = {
                        "1": "咸鱼一条",
                        "2": "风华浪子",
                        "3": "北大才子",
                        "4": "百度FE",
                        "5": "创业者"
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'hobby',
                key: 'hobby',
                render(hobby) {
                    let config = {
                        "1": "游泳",
                        "2": "打篮球",
                        "3": "踢足球",
                        "4": "跑步",
                        "5": "爬山",
                        "6": "骑行",
                        "7": "麦霸",
                        "8": "桌球"
                    }
                    return config[hobby];
                }
            },
            {
                title: '婚姻',
                dataIndex: 'isMarried',
                key: 'isMarried',
                render(isMarried) {
                    return isMarried === 1 ? '已婚' : '未婚'
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                key: 'time'
            }

        ]
        let { selectedRowKeys } = this.state
        const rowSelection = {
            type: "radio",
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: "checkbox",
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                // let ids = [];
                // selectedRows.map(item => {
                //     ids.push(item.id)
                // })
                console.log(selectedRowKeys, selectedRows);
                this.setState({
                    selectedRowKeys,
                    // selectedIds: ids
                    selectedRows
                })
            }
        }
        return (
            <>
                <Card className='card-wrap' title="基础表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card className='card-wrap' title="动态数据渲染表格--Mock">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card className='card-wrap' title="Mock--单选">
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }// 点击行
                            };
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card className='card-wrap' title="Mock--复选框">
                    <div style={{ marginBottom: 10 }}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card className='card-wrap' title="Mock--表格分页">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </>
        )
    }
}
