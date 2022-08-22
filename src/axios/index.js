import axios from 'axios'
import JsonP from 'jsonp'
import { Modal } from 'antd'
export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: "callback"
            }, (err, response) => {
                if (response) {
                    resolve(response)
                } else {
                    reject(err.message)
                }
            })
        })
    }
    static ajax(options) {
        let baseApi = "https://mock.presstime.cn/mock/62f27d7199bc590021df2964/mockapi/";
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.param) || '',
            }).then(response => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status === 200) {
                    let res = response.data;
                    if (res.code === 0) {
                        resolve(res);
                    } else {
                        Modal.info({
                            title: "提示",
                            content: res.message
                        })
                    }
                } else {
                    reject(response.data)
                }
            })
        })

    }
}