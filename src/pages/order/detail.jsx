import React, { useState, useEffect, Component } from 'react'
import { Card, Button, Table, Form, Select, Modal, DatePicker, message } from 'antd'
import axios from '../../axios'
import "./../ui/ui.less"
import "./detail.less"
import "./../../style/common.less"

const OrderDetail = (props) => {
    const orderId = props.match.params.orderId;
    const [orderInfo, setOrderInfo] = useState({});
    useEffect(() => {
        if (orderId) {
            const getDetailInfo = (orderId) => {
                axios.ajax({
                    url: '/order/detail',
                    data: {
                        params: {
                            orderId
                        }
                    }
                }).then((res) => {
                    if (res.code === 0) {
                        setOrderInfo(res.result);
                        renderMap(res.result);
                    }
                })
            }
            getDetailInfo();
        }
    }, [])
    //初始化地图
    const renderMap = (result) => {

        let positionList = result.position_list;
        let serverArea = result.area;
        var map = new window.BMapGL.Map("orderDetaiMap")
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        //添加地图控件
        let zoomCtrl = new window.BMapGL.ZoomControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT });  // 添加缩放控件
        map.addControl(zoomCtrl);
        let cityCtrl = new window.BMapGL.CityListControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT });  // 添加城市列表控件
        map.addControl(cityCtrl);

        let startPoint = '';
        let endPoint = '';
        if (positionList.length > 0) {
            let arrStart = positionList[0];
            let arrEnd = positionList[positionList.length - 1];
            startPoint = new window.BMapGL.Point(arrStart.lon, arrStart.lat);
            endPoint = new window.BMapGL.Point(arrEnd.lon, arrEnd.lat);
        }

        // 创建小车图标
        let myIconSrart = new window.BMapGL.Icon("/assets/start_point.png", new window.BMapGL.Size(36, 42));
        // 创建Marker标注，使用图标
        let markerStart = new window.BMapGL.Marker(startPoint, {
            icon: myIconSrart
        });
        //将标注添加到地图
        map.addOverlay(markerStart);
        let myIconEnd = new window.BMapGL.Icon("/assets/end_point.png", new window.BMapGL.Size(36, 42));
        // 创建Marker标注，使用图标
        let markerEnd = new window.BMapGL.Marker(endPoint, {
            icon: myIconEnd
        });
        //将标注添加到地图
        map.addOverlay(markerEnd);

        //连接路线图
        let trackPoint = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new window.BMapGL.Point(point.lon, point.lat))
        }
        let polyline = new window.BMapGL.Polyline(trackPoint, {
            strokeColor: '#1869AD',
            strokeWeight: 3,
            strokeOpacity: 1
        });
        map.addOverlay(polyline);

        //绘制服务区
        let serverPoint = [];
        for (let i = 0; i < serverArea.length; i++) {
            let point = serverArea[i];
            serverPoint.push(new window.BMapGL.Point(point.lon, point.lat))
        }
        let polygon = new window.BMapGL.Polygon(serverPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605'
        });
        map.addOverlay(polygon);
        map.centerAndZoom(endPoint, 11);

    }

    return (
        <>
            <Card className='card-wrap'>
                <div id='orderDetaiMap' className='order-map'></div>
                <div className="detail-items">
                    <div className="item-title">基础信息</div>
                    <ul className="detail-form">
                        <li>
                            <div className="detail-form-left">用车模式</div>
                            <div className="detail-form-content">{orderInfo.mode === 1 ? "服务区" : "停车点"}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">订单编号</div>
                            <div className="detail-form-content">{orderInfo.order_sn}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">车辆编号</div>
                            <div className="detail-form-content">{orderInfo.bike_sn}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">用户姓名</div>
                            <div className="detail-form-content">{orderInfo.user_name}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">手机号码</div>
                            <div className="detail-form-content">{orderInfo.mobile}</div>
                        </li>
                    </ul>
                </div>
            </Card>
            <Card className='card-wrap'>
                <div id='orderDetaiMap'></div>
                <div className="detail-items">
                    <div className="item-title">行驶轨迹</div>
                    <ul className="detail-form">
                        <li>
                            <div className="detail-form-left">行程起点</div>
                            <div className="detail-form-content">{orderInfo.start_location}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">行程终点</div>
                            <div className="detail-form-content">{orderInfo.end_location}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">行驶里程</div>
                            <div className="detail-form-content">{orderInfo.distance}</div>
                        </li>
                    </ul>
                </div>
            </Card>
        </>
    )
}
export default OrderDetail