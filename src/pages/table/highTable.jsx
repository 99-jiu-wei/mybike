import React, { Component } from 'react'
import { Card, Table, Badge, message, Modal, Button } from 'antd'
import axios from './../../axios'
import '../ui/ui.less'

export default class HighTable extends Component {
    state = {
        dataSource: []
    }
    param = {
        page: 1
    }//不需要重新渲染
    componentDidMount() {
        this.request();
    }
    request = () => {
        let _this = this;
        axios.ajax({
            url: 'table/high/list',
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
                    dataSource: res.result.list
                })
            }
        })
    }
    handleChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        // this.setState({ sortOrder: sorter.order })
    };
    handleDelete = (item) => {
        let id = item.id;
        Modal.confirm({
            title: "确认",
            content: "您确认要删除此条数据吗？",
            onOk: () => {
                message.success("删除成功");
                this.request();

            }
        })
    }
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
                key: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 80,
                key: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                key: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
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
                width: 80,
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
                width: 80,
                render(isMarried) {
                    return isMarried === 1 ? '已婚' : '未婚'
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120,
                key: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 120,
                key: 'time'
            }

        ]
        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
                fixed: "left",
                key: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 80,
                fixed: "left",
                key: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                key: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
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
                width: 80,
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
                width: 80,
                render(isMarried) {
                    return isMarried === 1 ? '已婚' : '未婚'
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120,
                fixed: "right",
                key: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 120,
                fixed: "right",
                key: 'time'
            }

        ]
        const columns3 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
                key: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 80,
                key: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                key: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 80,
                key: 'age',
                sorter: (a, b) => {
                    return a.age - b.age;
                },
                defaultSortOrder: 'descend',
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
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
                width: 80,
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
                width: 80,
                render(isMarried) {
                    return isMarried === 1 ? '已婚' : '未婚'
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120,
                key: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 120,
                key: 'time'
            }

        ]
        const columns4 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
                key: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 80,
                key: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                key: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 80,
                key: 'age'
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
                key: 'state',
                render(state) {
                    let config = {
                        "1": "河畔一角",
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
                width: 80,
                render(hobby) {
                    let config = {
                        "1": <Badge status='success' text="成功" />,
                        "2": <Badge status='error' text="报错" />,
                        "3": <Badge status='default' text="正常" />,
                        "4": <Badge status='processing' text="进行中" />,
                        "5": <Badge status='warning' text="警告" />
                    }
                    return config[hobby];
                }
            },
            {
                title: '婚姻',
                dataIndex: 'isMarried',
                key: 'isMarried',
                width: 80,
                render(isMarried) {
                    return isMarried === 1 ? '已婚' : '未婚'
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120,
                key: 'address'
            },
            {
                title: '操作',
                render: (text, item) => {
                    return <Button onClick={(item) => { this.handleDelete(item) }}>删除</Button>
                },
                key: 'opration'
            }

        ]
        return (
            <>
                <Card className='card-wrap' title="表头固定">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ y: 240 }}
                    />
                </Card>
                <Card className='card-wrap' title="左侧固定">
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ x: 1500 }}
                    />
                </Card>
                <Card className='card-wrap' title="表格排序">
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card className='card-wrap' title="操作按钮">
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
            </>
        )
    }
}
