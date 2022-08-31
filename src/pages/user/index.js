import React, { useState, useEffect } from 'react'
import { Card, Button, Modal } from 'antd'
import axios from './../../axios'
import { utils } from './../../utils/utils'
import ETable from './../../components/ETable'
import BaseForm from '../../components/BaseForm'
import RequestList from '../../axios/RequestList'

export default function User() {
    const [list, setList] = useState([])
    const [pagination, setPagination] = useState()
    const [selectedItem, setSelectedItem] = useState([])
    const [orderInfo, setOrderInfo] = useState({})
    const [orderConfirmVisible, setOrderConfirmVisible] = useState(false)


    const formList = [
        {
            type: 'INPUT',
            label: '用户名',
            name: 'user_name',
            initialvalues: "请输入用户名称",
            width: 150,
        },
        {
            type: 'INPUT',
            label: '手机号',
            name: 'user_mobile',
            initialValues: "请输入用户手机号",
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
                    pagination={false}
                    setSelectedItem={setSelectedItem}
                    selectedItem={selectedItem}
                />
            </div>
        </>
    )
}
