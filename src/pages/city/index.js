import React, { useState, useEffect, Component } from 'react'
import { Card, Button, Table, Form, Select, Modal, message } from 'antd'
import axios from './../../axios'
import { utils } from '../../utils/utils'
import "./../ui/ui.less"
import "./../../style/common.less"
const FormItem = Form.Item;
const { Option } = Select;

const City = () => {
    const [visible, setVisible] = useState(false);
    const [list, setList] = useState([]);
    const [pagination, setPagination] = useState()
    const params = {
        page: 1
    }
    const onCreate = (cityInfo) => {
        console.log('Received values of form: ', cityInfo);
        axios.ajax({
            url: "/city/open",
            data: {
                params: cityInfo
            }
        }).then(res => {
            if (res.code === 0) {
                message.success('开通成功');
                setVisible(false);
            }
        })

    };
    //控制开通城市提交
    const requestList = () => {
        axios.ajax({
            url: 'open_city',
            data: {
                params: {
                    page: params.page
                }
            }
        }).then(res => {
            setList(res.result.item_list.map((item, index) => {
                item.key = index;
                return item;
            }));
            setPagination(utils.pagination(res, (current) => {
                params.page = current;
                requestList();
            }))
        })
    }
    useEffect(() => {
        requestList();
    }, [])
    const columns = [
        {
            title: '城市ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '城市名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '用车模式',
            dataIndex: 'mode',
            render: (mode) => {
                return mode === 1 ? "停车点" : "禁停区"
            },
            key: 'mode',
        },
        {
            title: '运营模式',
            dataIndex: 'op_mode',
            render: (op_mode) => {
                return op_mode === 1 ? "加盟" : "自营"
            },
            key: 'op_mode',
        },
        {
            title: '授权加盟商',
            dataIndex: 'franchisee_name',
            key: 'franchisee_name',
        },
        {
            title: '城市管理员',
            dataIndex: 'city_admins',
            render: (arr) => {
                return arr.map(item => {
                    return item.user_name;
                }).join(',')
            },
            key: 'city_admins',
        },
        {
            title: '城市开通时间',
            dataIndex: 'open_time',
            key: 'open_time',
        },
        {
            title: '操作时间',
            dataIndex: 'update_time',
            render: utils.formateDate,
            key: 'update_time',
        },
        {
            title: '操作人',
            dataIndex: 'sys_user_name',
            key: 'sys_user_name',
        },
    ]
    return (
        <>
            <Card className='card-wrap'>
                <FilterForm />
            </Card>
            <Card className='card-wrap'>
                <Button type="primary" onClick={() => {
                    setVisible(true);
                }}>开通城市</Button>
            </Card>
            <div className='content-wrap'>
                <Table
                    columns={columns}
                    dataSource={list}
                    pagination={pagination} />
            </div>
            <OpenCityForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </>
    )
}

class FilterForm extends Component {
    render() {
        return (
            <Form layout='inline'>
                <FormItem label="城市"
                    name={['city', 'id']}>
                    <Select
                        style={{ width: 100, margin: '0 20px' }}
                        placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">天津市</Option>
                        <Option value="3">深圳市</Option>
                    </Select>
                </FormItem>
                <FormItem label="用车模式"
                    name={['city', 'mode']}>
                    <Select
                        style={{ width: 150, margin: '0 20px' }}
                        placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="1">指定停车点模式</Option>
                        <Option value="2">禁停区模式</Option>
                    </Select>
                </FormItem>
                <FormItem label="运营模式"
                    name={['city', 'op_mode']}>
                    <Select
                        style={{ width: 80, margin: '0 20px' }}
                        placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                    </Select>
                </FormItem>
                <FormItem label="加盟商授权状态"
                    name={['city', 'auth_status']}>
                    <Select
                        style={{ width: 100, margin: '0 20px' }}
                        placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="1">已授权</Option>
                        <Option value="2">未授权</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type='primary' style={{ margin: "0 100px" }}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
const OpenCityForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: {
            span: 5
        },
        wrapperCol: {
            span: 10
        }
    }
    return (
        <Modal
            title="开通城市"
            visible={visible}
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form layout='horizontal' {...formItemLayout} form={form}>
                <FormItem label="选择城市"
                    name={['city', 'city_id']}
                    initialValue="1"
                >
                    <Select style={{ width: 100 }}>
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">天津市</Option>
                    </Select>
                </FormItem>
                <FormItem
                    label="运营模式"
                    name={['city', 'op_mode']}
                    initialValue="1"
                >
                    <Select style={{ width: 100 }}>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                    </Select>
                </FormItem>
                <FormItem
                    label="用车模式"
                    name={['city', 'use_mode']}
                    initialValue="1">
                    <Select style={{ width: 100 }}>
                        <Option value="1">指定停车点</Option>
                        <Option value="2">禁停区</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    );
};
export default City;
