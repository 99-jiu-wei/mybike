import React from "react";
import { Select } from "antd";
const { Option } = Select;
export const utils = {
    formateDate(time) {
        if (!time) return '';
        let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ';
    },
    pagination(data, callback) {
        return {
            onChange: (current) => {
                callback(current)
            },
            current: data.result.page,
            pageSize: data.result.page_size,
            total: data.result.total_count,
            showTotal: () => {
                return `共${data.result.total_count}条`
            },
            // showQuickJumper: true//是否自动跳转
        }
    },
    getOptionList(data) {
        if (!data) {
            return [];
        }
        let options = [];
        data.map((item, index) => {
            options.push(<Option value={index} key={item.key}>{item.name}</Option>)
        })
        return options;

    }
}