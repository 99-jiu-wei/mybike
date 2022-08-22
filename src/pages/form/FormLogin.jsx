import React, { Component } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Form, Input, Button, message, Checkbox } from 'antd'
import '../ui/ui.less'
const FormItem = Form.Item

export default class FormLogin extends Component {
    onFinish = (values) => {
        // console.log('Received values of form: ', values);
        message.success(`${values.user.name}恭喜你，登陆成功！密码为${values.user.number}`)
    };
    render() {
        return (
            <>
                <Card title="登录行内表单" className='card-wrap'>
                    <Form layout='inline'>
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单" className='card-wrap'>
                    <Form style={{ width: 300 }} onFinish={this.onFinish} initialValues={{
                        remember: true,
                    }}>
                        <FormItem
                            name={['user', 'name']}
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: "用户名不能为空"
                                },
                                {
                                    min: 5, max: 10,
                                    message: "长度不在范围内"
                                },
                                {
                                    pattern: new RegExp('^\\w+$', 'g'),
                                    message: "用户名必须为字母或者数字"
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined />} />
                        </FormItem>
                        <FormItem
                            name={['user', 'number']}
                            label="Number"
                            rules={[
                                {
                                    required: true,
                                    message: "密码不能为空"
                                },
                            ]}

                        >
                            <Input type="password" prefix={<LockOutlined />} />
                        </FormItem>
                        <FormItem>
                            <FormItem
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>忘记密码</Checkbox>
                            </FormItem>
                            <a href="#" style={{ float: 'right' }}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </>
        )
    }
}
