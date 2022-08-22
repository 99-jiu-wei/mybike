import axios from './index';
import { utils } from '../utils/utils';


const RequestList = (url, param, setList, setPagination) => {
    var data = {
        param: param
    }
    var list;
    axios.ajax({
        url,
        data
    }).then(data => {
        setList(data.result.item_list.map((item, index) => {
            item.key = index;
            return item;
        }));
        setPagination(utils.pagination(data, (current) => {
            param.page = current;
            RequestList();
        }))
    })


}

export default RequestList;