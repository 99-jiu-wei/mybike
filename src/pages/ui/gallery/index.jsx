import React, { Component } from 'react'
import { Card, Col, Row, Modal } from 'antd'
const { Meta } = Card

export default class Gallery extends Component {
    state = {
        visible: false
    }
    openGallary = (imgSrc) => {
        this.setState({
            visible: true,
            currentImg: "/gallery/" + imgSrc
        })
    }
    render() {
        const imgs = [[], [], [], [], []]
        for (var i = 1; i <= 25; i++) {
            let index = Math.floor(i / 5);
            if (i % 5 === 0) {
                index--;
                imgs[index].push(`${i}.png`)
            } else {
                imgs[index].push(`${i}.png`)
            }
        }
        const imgList = imgs.map(list => list.map(item =>
            <Card style={{ marginBottom: 10 }}
                key={item}
                cover={<img src={"/gallery/" + item} onClick={() => { this.openGallary(item) }} alt="" />}>
                <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>))
        return (
            <>
                <Row gutter={10}>
                    <Col md={5}>{imgList[0]}</Col>
                    <Col md={5}>{imgList[1]}</Col>
                    <Col md={5}>{imgList[2]}</Col>
                    <Col md={5}>{imgList[3]}</Col>
                    <Col md={4}>{imgList[4]}</Col>
                </Row>
                <Modal
                    width={300}
                    visible={this.state.visible}
                    onCancel={() => {
                        this.setState({ visible: false })
                    }}
                    title="图片画廊">
                    <img src={this.state.currentImg} alt="" width="100%" />
                </Modal>
            </>
        )
    }
}
