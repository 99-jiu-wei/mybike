import React, { useState } from 'react'
import { Table } from 'antd';

export default function ETable(props) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const tableInit = () => {
        // let { onSelectChange } = props;
        let row_selection = props.rowSelection;
        const rowSelection = {
            type: "radio",
            selectedRowKeys,
        }
        const saveDetail = (selectedItem, selectedIds) => {
            if (selectedIds) {
                console.log(selectedItem, selectedIds);
                props.setSelectedItem(selectedItem);
                props.setSelectedIds(selectedIds);

            } else {
                props.setSelectedItem(selectedItem);
            }
        }
        const onRowClick = (record, index) => {
            let rowSelection = props.rowSelection;
            if (rowSelection === 'checkbox') {
                let { selectedIds, selectedItem } = props;
                if (selectedIds) {
                    const i = selectedIds.indexOf(record.id);
                    if (i === -1) {
                        selectedIds.push(record.id);
                        setSelectedRowKeys([index, ...selectedRowKeys]);
                        selectedItem.push(record);
                    } else {
                        selectedIds.splice(i, 1);
                        setSelectedRowKeys(selectedRowKeys.splice(i, 1))
                        selectedItem.splice(i, 1);
                    }
                } else {
                    selectedIds = [record.id];//存id
                    setSelectedRowKeys(index);//存下标
                    selectedItem = [record];//存每条的信息
                }
                saveDetail(selectedItem, selectedIds);
            } else {
                setSelectedRowKeys(index);
                let selectedItem = [record];
                saveDetail(selectedRowKeys, selectedItem);
            }

        }
        if (row_selection === false || row_selection === null) {
            row_selection = false;
        } else if (row_selection === 'checkbox') {
            rowSelection.type = 'checkbox';
        } else {
            row_selection = 'radio';
        }
        console.log(rowSelection);
        return <Table
            {...props}
            bordered
            rowSelection={{ ...rowSelection }}
            onRow={(record, index) => {
                return {
                    onClick: () => {
                        if (!row_selection) {
                            return;
                        }
                        onRowClick(record, index);
                    }// 点击行
                };
            }}
        />
    }
    return (
        <>
            {tableInit()}
        </>
    )
}
