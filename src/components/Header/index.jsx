import { Col, Row } from 'antd'
import React, { Component } from 'react'
import './index.less'
import { utils } from '../../utils/utils'
// import axios from '../../axios'
import axios from 'axios'
export default class Header extends Component {
    UNSAFE_componentWillMount() {
        this.setState({
            userName: "河畔一角"
        })
        setInterval(() => {
            let sysTime = utils.formateDate(new Date().getTime())
            this.setState({
                sysTime
            })
        }, 1000);
        this.getWeatherAPIData();
    }
    getWeatherAPIData() {
        let city = "101091101"
        axios.get(`/v7/weather/now?location=${city}&key=8749891d6df543519e508b6d36b83a7e`)
            .then(res => {
                if (res.status === 200) {
                    let weatherIcon = res.data.now.icon;
                    let weatherText = res.data.now.text;
                    let weatherTemp = res.data.now.temp;
                    this.setState({
                        weatherIcon,
                        weatherText,
                        weatherTemp
                    })
                }

            })
    }
    render() {
        const { menuType } = this.props
        let weathIconSrc = `/assets/weather-img/icons/${this.state.weatherIcon}.svg`;
        return (
            <div className="header">
                <Row className='header-top'>
                    {
                        menuType ? <Col span='6' className='logo'>
                            <img src="/assets/logo-antd.svg" alt='' />
                            <span>IMooc 通用管理系统</span>
                        </Col> : ""
                    }
                    <Col span={menuType ? "18" : "24"} >
                        <span>欢迎，{this.state.userName}</span>
                        <a href='#'>退出</a>
                    </Col>
                </Row>
                {
                    menuType ? "" : <Row className='breadcrumb'>
                        <Col span="4" className='breadcrumb-title'>
                            首页
                        </Col>
                        <Col span="20" className='weather'>
                            <span className='data'>{this.state.sysTime}</span>
                            <span className='weather-img'>
                                <img src={weathIconSrc} alt='' />
                                <span className='weather-temp'>{this.state.weatherTemp}℃</span>
                                <span className='weather-text'>{this.state.weatherText}</span>
                            </span>
                        </Col>
                    </Row>
                }

            </div>
        )
    }
}
