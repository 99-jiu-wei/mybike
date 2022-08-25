import React, { useState, useEffect, Component } from 'react'
import { Card, Button, Table, Form, Select, Modal, DatePicker, message } from 'antd'
import axios from '../../axios'
import RequestList from '../../axios/RequestList'
import { utils } from '../../utils/utils'
import "./../ui/ui.less"
import "./../../style/common.less"
import BaseForm from '../../components/BaseForm'
import ETable from '../../components/ETable'
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;


const Order = () => {
    const [list, setList] = useState([]);
    const [pagination, setPagination] = useState()
    const [orderConfirmVisible, setOrderConfirmVisible] = useState(false)
    const [orderInfo, setOrderInfo] = useState({})
    // const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectedItem, setSelectedItem] = useState([])
    const [selectedIds, setSelectedIds] = useState([])
    let selected = { selectedItem, selectedIds }
    let param = {
        page: 1
    }
    const handleFilter = (value) => {
        param = value;
        requestList();
    }
    const formList = [
        {
            type: 'SELECT',
            label: '城市',
            name: 'order_city',
            placeholder: '全部',
            width: 100,
            list: [{ key: "city_quanbu", name: '全部' }, { key: 'beijing', name: '北京市' }, { key: 'tianjin', name: '天津市' }, { key: 'shenzhen', name: '深圳市' }]
        }, {
            type: '时间查询',
            name: 'start_time',
        }, {
            type: 'SELECT',
            label: '订单状态',
            name: 'order_status',
            placeholder: '全部',
            width: 100,
            list: [{ key: 'status_quanbu', name: '全部' }, { key: 'jinxingzhong', name: '进行中' }, { key: 'jieshu', name: '结束行程' }]
        }
    ]
    const requestList = () => {
        RequestList('order/list', param, setList, setPagination);

        // axios.ajax({
        //     url: 'order/list',
        //     data: {
        //         param: param
        //     }
        // }).then(res => {
        //     setList(res.result.item_list.map((item, index) => {
        //         item.key = index;
        //         return item;
        //     }));
        //     setPagination(utils.pagination(res, (current) => {
        //         param.page = current;
        //         requestList();
        //     }))
        // })
    }
    useEffect(() => {
        requestList();
    }, [])
    const columns = [
        {
            title: '订单编号',
            dataIndex: 'order_sn',
            key: 'order_sn'
        },
        {
            title: '车辆编号',
            dataIndex: 'bick_sn',
            key: 'bick_sn'
        },
        {
            title: '用户名',
            dataIndex: 'user_name',
            key: 'user_name'
        },
        {
            title: '里程',
            dataIndex: 'distance',
            render(distance) {
                return distance / 1000 + 'Km'
            },
            key: 'distance'
        },
        {
            title: '行驶时长',
            dataIndex: 'total_time',
            key: 'total_time'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: '开始时间',
            dataIndex: 'start_time',
            key: 'start_time'
        },
        {
            title: '结束时间',
            dataIndex: 'end_time',
            key: 'end_time'
        },
        {
            title: '订单金额',
            dataIndex: 'total_fee',
            key: 'total_fee'
        },
        {
            title: '实付金额',
            dataIndex: 'user_pay',
            key: 'user_pay'
        }
    ]
    const formItemLayout = {
        labelCol: {
            span: 5
        },
        wrapperCol: {
            span: 19
        }
    }
    const handleConfirm = () => {
        let item = selectedItem;
        if (!item) {
            Modal.info({
                title: "信息",
                content: "请选择一条订单进行结束"
            })
            return;
        }
        axios.ajax({
            url: "/order/ebike_info",
            data: {
                param: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                setOrderInfo(res.result)
                setOrderConfirmVisible(true)
            }
        })
    }
    const handleFinishOrder = () => {
        let item = selectedItem;
        axios.ajax({
            url: "/order/finish_order",
            data: {
                param: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                message.success("订单结束成功")
                setOrderConfirmVisible(false)
                requestList();
            }
        })
    }
    // const onRowClick = (record, index) => {
    //     let selectKey = [index];
    //     setSelectedRowKeys(selectKey);
    //     setSelectedItem(record)
    // }
    const openOrderDetail = () => {
        let item = selectedItem;
        if (!item) {
            Modal.info({
                title: "信息",
                content: "请选择一条订单"
            })
            return;
        }
        window.open(`/common/order/detail/${item.id}`, "_blank")
        // props.history.push(`/common/order/detail/${item.id}`)
    }
    // const onSelectChange = (selectedRowKeys) => {
    //     setSelectedRowKeys(selectedRowKeys)

    // }
    return (
        <>
            <Card className='card-wrap'>
                <BaseForm formList={formList} filterSubmit={handleFilter} />
            </Card>
            <Card className='card-wrap'>
                <Button type="primary" onClick={() => { openOrderDetail() }}>订单详情</Button>
                <Button type="primary" style={{ marginLeft: 10 }} onClick={() => { handleConfirm() }}>结束订单</Button>
            </Card>
            <div className='content-wrap'>
                <ETable
                    columns={columns}
                    dataSource={list}
                    pagination={pagination}
                    // setSelectedRowKeys={setSelectedRowKeys}
                    setSelectedItem={setSelectedItem}
                    {...selected}
                    // onSelectChange={onSelectChange}
                    rowSelection={'checkbox'}
                    setSelectedIds={setSelectedIds}
                />
                {/* <Table
                    rowSelection={{ type: "radio", selectedRowKeys }}
                    columns={columns}
                    dataSource={list}
                    pagination={pagination}
                    onRow={(record, index) => {
                        return {
                            onClick: () => {
                                onRowClick(record, index);
                            }// 点击行
                        };
                    }}
                /> */}
            </div>
            <Modal
                title="结束订单"
                visible={orderConfirmVisible}
                onCancel={() => {
                    setOrderConfirmVisible(false)
                }}
                onOk={() => { handleFinishOrder() }}
                width={600}>
                <Form layout='horizontal'
                    {...formItemLayout}
                >
                    <FormItem label="车辆编号">
                        {orderInfo.bike_sn}
                    </FormItem>
                    <FormItem label="剩余电量">
                        {orderInfo.battery + "%"}
                    </FormItem>
                    <FormItem label="行程开始时间">
                        {orderInfo.start_time}
                    </FormItem>
                    <FormItem label="当前位置">
                        {orderInfo.location}
                    </FormItem>
                </Form>
            </Modal>

        </>
    )
}

// class FilterForm extends Component {
//     render() {
//         return (
//             <Form layout='inline'>
//                 <FormItem label="城市"
//                     name={['order', 'city']}>
//                     <Select
//                         style={{ width: 100, margin: '0 20px' }}
//                         placeholder="全部">
//                         <Option value="">全部</Option>
//                         <Option value="1">北京市</Option>
//                         <Option value="2">天津市</Option>
//                         <Option value="3">深圳市</Option>
//                     </Select>
//                 </FormItem>
//                 <FormItem label="订单时间"
//                     name={['order', 'start_time']}>
//                     <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
//                 </FormItem>
//                 <FormItem label="订单状态"
//                     name={['order', 'status']}>
//                     <Select
//                         style={{ width: 80, margin: '0 20px' }}
//                         placeholder="全部">
//                         <Option value="">全部</Option>
//                         <Option value="1">进行中</Option>
//                         <Option value="2">结束行程</Option>
//                     </Select>
//                 </FormItem>
//             </Form>
//         )
//     }
// }

export default Order;
