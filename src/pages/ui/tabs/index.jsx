import React, { Component } from 'react'
import { Tabs, Card, message } from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

export default class Tab extends Component {
    constructor() {
        super();
        this.newTabIndex = React.createRef(0)
    }
    handleCallback = (key) => {
        message.info("Hi!您选择了页签" + key)
    }
    UNSAFE_componentWillMount() {
        const panes = [
            {
                title: 'Tab 1',
                content: 'Content of Tab 1',
                key: '1',
            },
            {
                title: 'Tab 2',
                content: 'Content of Tab 2',
                key: '2',
            },
            {
                title: 'Tab 3',
                content: 'Content of Tab 3',
                key: '3',
                closable: false,
            },
        ]
        this.setState({
            activeKey: panes[0].key,
            panes,
            index: panes.length
        });
    }
    onChange = (activeKey) => {
        this.setState({ activeKey });
    };

    add = () => {
        const newActiveKey = `newTab${this.newTabIndex.current++}`;
        const newPanes = [...this.state.panes];
        newPanes.push({
            title: 'New Tab',
            content: 'Content of new Tab',
            key: newActiveKey,
        });
        this.setState({ panes: newPanes, activeKey: newActiveKey })
    };

    remove = (targetKey) => {
        let newActiveKey = this.state.activeKey;
        let lastIndex = -1;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = this.state.panes.filter((pane) => pane.key !== targetKey);

        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        this.setState({ panes: newPanes, activeKey: newActiveKey })
    };
    onEdit = (targetKey, action) => {
        if (action === 'add') {
            this.add();
        } else {
            this.remove(targetKey);
        }
    };
    render() {
        return (
            <>
                <Card title="Tab页签" className='card-wrap'>
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">内容1</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>内容2</TabPane>
                        <TabPane tab="Tab 3" key="3">内容3</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图标的页签" className='card-wrap'>
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback} >
                        <TabPane tab={<span><PlusOutlined />Tab 1</span>} key="1">
                            内容1
                        </TabPane>
                        <TabPane tab={<span><EditOutlined />Tab 2</span>} key="2">
                            内容2
                        </TabPane>
                        <TabPane tab={<span><DeleteOutlined />Tab 3</span>} key="3">
                            内容3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab页签" className='card-wrap'>
                    <Tabs
                        onChange={this.onChange}
                        type="editable-card"
                        activeKey={this.state.activeKey}
                        onEdit={this.onEdit}>
                        {this.state.panes.map(panel => {
                            return (
                                <TabPane
                                    key={panel.key}
                                    tab={panel.title}
                                >{panel.content}
                                </TabPane>
                            )
                        })}
                    </Tabs>
                </Card>
            </>
        )
    }
}
