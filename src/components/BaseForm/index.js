import React from 'react'
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from 'antd'
import { utils } from '../../utils/utils';
const FormItem = Form.Item;


const BaseForm = (props) => {
    const [form] = Form.useForm();
    let { filterSubmit } = props
    const handleFilterSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                // form.resetFields();
                // console.log(values);
                filterSubmit(values)
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }
    const reset = () => {
        form.resetFields();
    }
    const initFormList = () => {
        const { formList } = props;
        const FormItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item, index) => {
                let { label, name, placeholder, width, initialvalues } = item;
                if (item.type === '时间查询') {
                    const begin_time = <FormItem label="订单时间" name={name} key={100}>
                        <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" />
                    </FormItem>
                    FormItemList.push(begin_time)
                    const end_time = <FormItem label="~" colon={false} name={name} key={index}>
                        <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" />
                    </FormItem>
                    FormItemList.push(end_time)
                }
                else if (item.type === 'SELECT') {
                    const SELECT = <FormItem label={label} name={name} key={index}>
                        <Select style={{ width: width, margin: '0 20px' }}
                            placeholder={placeholder}>
                            {utils.getOptionList(item.list)}
                        </Select>
                    </FormItem>
                    FormItemList.push(SELECT)
                } else if (item.type === 'INPUT') {
                    const INPUT = <FormItem label={label} name={name} key={index}>
                        <Input style={{ width: width, margin: '0 20px' }}
                            // initiavalue小写
                            placeholder={placeholder}>
                        </Input>
                    </FormItem>
                    FormItemList.push(INPUT)
                } else if (item.type === 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} name={name} key={index}>
                        <Checkbox>{label}</Checkbox>
                    </FormItem>
                    FormItemList.push(CHECKBOX)
                } else if (item.type === 'DATAPICKER') {
                    const DATAPICKER = <FormItem label={label} name={name} key={index}>
                        <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" />
                    </FormItem>
                    FormItemList.push(DATAPICKER)
                }

            })
        }
        return FormItemList;
    }

    return (
        <>
            <Form layout='inline' form={form}>
                {initFormList()}
                <FormItem>
                    <Button type='primary' style={{ margin: '0 20px' }} onClick={() => { handleFilterSubmit() }}>查询</Button>
                    <Button onClick={() => { reset() }}>重置</Button>
                </FormItem>
            </Form>
        </>
    )
}
export default BaseForm;
