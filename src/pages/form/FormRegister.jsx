import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    DatePicker,
    TimePicker,
    Upload,
    Checkbox,
    Button,
    message
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import '../ui/ui.less'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;

export default class FormRegister extends Component {
    state = {
        loading: false,
        imageUrl: ""
    }
    onFinish = (values) => {
        console.log('Received values of form: ', values);
        message.success(`${values.user.name}恭喜你，登陆成功！密码为${values.user.pwd}`)
    };
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    handleChange = (info) => {
        console.log(info);
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }

        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, (url) => {
                this.setState({ loading: true, imageUrl: url });
            });
        }
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        //偏移量
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div
                    style={{
                        marginTop: 8,
                    }}
                >
                    Upload
                </div>
            </div>
        )
        return (
            <>
                <Card title="注册表单" className='card-wrap'>
                    <Form layout='horizontal' {...formItemLayout} onFinish={this.onFinish}>
                        <FormItem
                            name={['user', 'name']}
                            label="用户名"
                            rules={[
                                {
                                    required: true,
                                    message: "用户名不能为空"
                                }
                            ]}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            name={['user', 'pwd']}
                            label="密码"
                            rules={[
                                {
                                    required: true,
                                    message: "密码不能为空"
                                },
                            ]}
                        >
                            <Input type="password" />
                        </FormItem>
                        <FormItem
                            name={['user', 'sex']}
                            label="性别"
                            initialValue="1"
                        >
                            <RadioGroup>
                                <Radio value="1">男</Radio>
                                <Radio value="2">女</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem
                            name={['user', 'age']}
                            label="年龄"
                            initialValue="18"
                        >
                            <InputNumber />
                        </FormItem>
                        <FormItem
                            name={['user', 'state']}
                            label="当前状态"
                            initialValue="2"
                        >
                            <Select>
                                <Option value="1">咸鱼一条</Option>
                                <Option value="2">风华浪子</Option>
                                <Option value="3">北大才子</Option>
                                <Option value="4">百度FE</Option>
                                <Option value="5">创业者</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            name={['user', 'hobby']}
                            label="爱好"
                            initialValue={["2", "5"]}
                        >
                            <Select mode='multiple'>
                                <Option value="1">游泳</Option>
                                <Option value="2">打篮球</Option>
                                <Option value="3">踢足球</Option>
                                <Option value="4">跑步</Option>
                                <Option value="5">爬山</Option>
                                <Option value="6">骑行</Option>
                                <Option value="7">麦霸</Option>
                                <Option value="8">桌球</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            name={['user', 'isMarried']}
                            label="是否已婚"
                            valuePropName='checked'
                            initialValue={true}
                        >
                            <Switch />
                        </FormItem>
                        <FormItem
                            name={['user', "birthday"]}
                            label="生日"
                            initialValue={moment('2019-08-08 12:00:59')}>
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss" />
                        </FormItem>
                        <FormItem
                            name={['user', "address"]}
                            label="联系地址"
                            initialValue="北京市海淀区奥林匹克公园"
                        >
                            <TextArea rows={4} maxLength={6} />
                        </FormItem>
                        <FormItem
                            name={['user', "time"]}
                            label="早起时间"
                        >
                            <TimePicker />
                        </FormItem>
                        <FormItem label="头像">
                            <FormItem name={['user', "img"]} valuePropName="fileList">
                                <Upload
                                    listType="picture-card"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    onChange={this.handleChange}
                                >
                                    {this.state.imageUrl ? (
                                        <img
                                            src={this.state.imageUrl}
                                            alt=""
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>
                            </FormItem>
                        </FormItem>
                        <FormItem
                            {...offsetLayout}
                            valuePropName="checked"
                            name={['user', "promise"]}

                        >
                            <Checkbox>我已阅读过<a href='#'>朗科协议</a></Checkbox>
                        </FormItem>
                        <FormItem
                            {...offsetLayout}
                        >
                            <Button type="primary" htmlType="submit">注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </>
        )
    }
}
