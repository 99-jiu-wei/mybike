import React, { Component } from 'react'
import { Card, Carousel } from 'antd'
import '../../ui/ui.less'

export default class Carousels extends Component {
    render() {
        return (
            <>
                <Card title="文字背景轮播" className='card-wrap'>
                    <Carousel autoplay effect='fade'>
                        <div>
                            <h3 className='contentStyle'>Angular</h3>
                        </div>
                        <div>
                            <h3 className='contentStyle'>React</h3>
                        </div>
                        <div>
                            <h3 className='contentStyle'>Vue</h3>
                        </div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className='card-wrap'>
                    <Carousel autoplay >
                        <div>
                            <img src='/carousel-img/carousel-1.jpg' alt='' ></img>
                        </div>
                        <div>
                            <img src='/carousel-img/carousel-2.jpg' alt=''></img>
                        </div>
                        <div>
                            <img src='/carousel-img/carousel-3.jpg' alt=''></img>
                        </div>
                    </Carousel>
                </Card>
            </>
        )
    }
}
