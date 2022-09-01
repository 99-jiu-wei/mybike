import React, { useState, useEffect } from 'react'
import { Card, Button, Modal, Form, Input, Radio, DatePicker, Select } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ETable from './../../components/ETable'
import BaseForm from '../../components/BaseForm'
import RequestList from '../../axios/RequestList'
import axios from './../../axios'
import moment from 'moment'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea
const Option = Select.Option;

export default function User() {
    const [list, setList] = useState([])
    //判断是否选择了行
    const [selectedItem, setSelectedItem] = useState()
    const [pagination, setPagination] = useState()
    const [isVisible, setIsVisible] = useState(false)
    const [title, setTitle] = useState()
    const [type, setType] = useState()

    const formList = [
        {
            type: 'INPUT',
            label: '用户名',
            name: 'user_name',
            placeholder: "请输入用户名称",
            width: 150,
        },
        {
            type: 'INPUT',
            label: '手机号',
            name: 'user_mobile',
            placeholder: "请输入用户手机号",
            width: 150,
        }, {
            type: 'DATAPICKER',
            label: '请选择入职日期',
            name: 'user_date',
            palceholder: "请输入日期"
        }
    ]
    let param = {
        page: 1
    }
    const handleFilter = (value) => {
        param = value;
        requestList()
    }
    const requestList = () => {
        RequestList('user/list', param, setList, setPagination);
    }
    useEffect(() => {
        requestList();
    }, [])
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
        },
        {
            title: '用户名',
            dataIndex: 'userName',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            render(sex) {
                return sex === 1 ? "男" : "女"
            },
        },
        {
            title: '年龄',
            dataIndex: 'age',
        },
        {
            title: '状态',
            dataIndex: 'state',
            render(state) {
                return {
                    1: '咸鱼一条',
                    2: '风华浪子',
                    3: '北大才子一枚',
                    4: '百度FE',
                    5: '创业者'
                }[state]
            }
        },
        {
            title: '婚姻状态',
            dataIndex: 'isMarried',
        },
        {
            title: '生日',
            dataIndex: 'birthday',
        },
        {
            title: '地址',
            dataIndex: 'address',
        },
        {
            title: '入职时间',
            dataIndex: 'time',
        }
    ]
    const handleOperate = (type) => {
        if (type === 'create') {
            setType(type)
            setIsVisible(true)
            setTitle('创建员工')
        } else if (type === 'edit') {
            if (!selectedItem) {
                Modal.info({
                    title: "提示",
                    content: '请选择一个用户'
                })
                return
            }
            setType(type)
            setIsVisible(true)
            setTitle('编辑员工')
            // console.log(selectedItem);

        } else if (type === 'detail') {
            if (!selectedItem) {
                Modal.info({
                    title: "提示",
                    content: '请选择一个用户'
                })
                return
            }
            setType(type)
            setIsVisible(true)
            setTitle('员工详情')
        } else if (type === 'delete') {
            if (!selectedItem) {
                Modal.info({
                    title: "提示",
                    content: '请选择一个用户'
                })
                return
            }
            Modal.confirm({
                title: '确认删除',
                content: '谁否要删除选中的员工信息？',
                onOk() {
                    axios.ajax({
                        // url: '/user/delete',换接口
                        url: 'user/add',
                        data: {
                            param: {
                                id: selectedItem.id
                            }
                        }
                    }).then((res) => {
                        if (res.code === 0) {
                            setIsVisible(false);
                            requestList();
                        }
                    })
                }
            })
        }
    }
    // const handleConfirm = () => {
    //     let item = selectedItem;
    //     if (!item) {
    //         Modal.info({
    //             title: "信息",
    //             content: "请选择一条订单进行结束"
    //         })
    //         return;
    //     }
    //     axios.ajax({
    //         url: "/order/ebike_info",
    //         data: {
    //             param: {
    //                 orderId: item.id
    //             }
    //         }
    //     }).then((res) => {
    //         if (res.code === 0) {
    //             setOrderInfo(res.result)
    //             setOrderConfirmVisible(true)
    //         }
    //     })
    // }
    //创建员工提交
    const onCreate = (values) => {
        // let type = type;
        let data = values;
        // console.log('Received values of form: ', values);
        axios.ajax({
            // 操作类型不同---访问不同的端口
            url: type === 'create' ? '/user/add' : '/user/edit',
            data: {
                param: data
            }
        }).then((res => {
            if (res.code === 0) {
                setIsVisible(false);
                requestList()
            }
        }))
    }
    const onCancel = () => {
        setIsVisible(false)
    }
    return (
        <>
            <Card className='card-wrap'>
                <BaseForm formList={formList} filterSubmit={handleFilter} />
            </Card>
            <Card className='card-wrap'>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => { handleOperate('create') }}>创建员工</Button>
                <Button type="primary" icon={<EditOutlined />} onClick={() => { handleOperate('edit') }}>编辑员工</Button>
                <Button type="primary" onClick={() => { handleOperate('detail') }}>员工详情</Button>
                <Button type="primary" icon={<DeleteOutlined />} onClick={() => { handleOperate('delete') }}>删除员工</Button>
            </Card>
            <UserForm type={type} title={title} visible={isVisible} onCreate={onCreate} onCancel={onCancel} selectedItem={selectedItem} />
            <div className='content-wrap'>
                <ETable
                    columns={columns}
                    dataSource={list}
                    pagination={false}
                    setSelectedItem={setSelectedItem}
                    selectedItem={selectedItem}
                />
            </div>

        </>
    )
}
const UserForm = (props) => {
    const [form] = Form.useForm();
    const { type, visible, title, onCreate, onCancel } = props;
    let selectedItem = props.selectedItem || {};
    console.log(selectedItem);
    const formItemLayout = {
        lablecol: { span: 5 },
        wrappercol: { span: 19 }
    }
    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                //获取表单的信息，要给表单项加name
                onCreate(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }
    // 详情中显示state
    const getState = (state) => {
        return {
            1: '咸鱼一条',
            2: '风华浪子',
            3: '北大才子一枚',
            4: '百度FE',
            5: '创业者'
        }[state]
    }
    // 如何控制Modal中的属性
    let footer = {};
    if (type === 'detail') {
        footer = {
            footer: null
        }
    }
    return (
        <Modal
            title={title}
            visible={visible}
            onOk={() => { handleSubmit() }}
            onCancel={onCancel}
            width={600}
            {...footer}
        >
            <Form form={form} {...formItemLayout} layout='horizontal'>
                {/* 设置表单项的默认值--Form.Item---initialValue */}
                <FormItem label="用户名:">
                    {type === "detail" ? selectedItem.userName :
                        <FormItem name="userName" initialValue={selectedItem.userName}>
                            <Input type="text" placeholder="请输入用户名" />
                        </FormItem>
                    }
                </FormItem>
                {/* 表单项的name属性 */}
                <FormItem label="性别:">
                    {
                        type === "detail" ? selectedItem.sex === 1 ? "男" : "女" :
                            <FormItem name='sex' initialValue={selectedItem.sex}>
                                <RadioGroup>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </RadioGroup>
                            </FormItem>
                    }
                </FormItem>
                <FormItem label="状态:">
                    {type === "detail" ? getState(selectedItem.state) :
                        <FormItem name='state' initialValue={selectedItem.state}>
                            <Select>
                                <Option value={1}>'咸鱼一条'</Option>
                                <Option value={2}>'风华浪子'</Option>
                                <Option value={3}>'北大才子一枚'</Option>
                                <Option value={4}>'百度FE'</Option>
                                <Option value={5}>'创业者'</Option>
                            </Select>
                        </FormItem>
                    }
                </FormItem>
                <FormItem label="生日:">
                    {/* 生日日期转成字符串---moment() */}
                    {type === "detail" ? selectedItem.birthday : <FormItem name='birthday' initialValue={moment(selectedItem.birthday)}>
                        <DatePicker />
                    </FormItem>}
                </FormItem>
                <FormItem label="联系地址:">
                    {type === "detail" ? selectedItem.address :
                        <FormItem name='address' initialValue={selectedItem.address}>
                            <TextArea rows={3} placeholder="请输入联系地址" ></TextArea>
                        </FormItem>}
                </FormItem>
            </Form>
        </Modal>

    )
}
