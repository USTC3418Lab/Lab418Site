import React from 'react';
import { Component } from 'react';
import { Layout, Button, Card, message, Tooltip } from 'antd';
import '../styles/clipboard.css';
import { EyeOutlined, DeleteOutlined, CloseCircleOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import TextArea from 'antd/lib/input/TextArea';
import { client } from '../client';
import { isStrEmpty, timeStamp2Str } from '../utils';
import Text from 'antd/lib/typography/Text';

const { Header, Content } = Layout;

export default class ClipboardPage extends Component {
    constructor(props) {
        super(props);

        this.editingText = "";
        this.state = {
            viewing: false,
            viewingText: "",
            // {id, text, timestamp}
            clipboardTexts: []
        }
        this.hideViewer = this.hideViewer.bind(this);
        this.showViewer = this.showViewer.bind(this);
        this.delete = this.delete.bind(this);
        this.pasteText = this.pasteText.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.getClipboardTexts = this.getClipboardTexts.bind(this);
    }

    componentDidMount() { this.getClipboardTexts(); }

    getClipboardTexts() {
        client.getClipboardTexts()
            .then(data => this.setState({
                clipboardTexts: data.sort((a, b) => b.timestamp - a.timestamp)
            }))
            .catch(v => {
                message.error("获取剪贴板历史记录失败: " + v);
                console.error(v);
            });
    }

    pasteText() {
        if (isStrEmpty(this.editingText)) {
            message.warn("不要粘贴空字符串啊 ~_~");
            return;
        }
        client.addClipboardText(this.editingText)
            .then(data => {
                if (data.code === 200) {
                    message.info("粘贴成功");
                    this.getClipboardTexts();
                } else {
                    message.warn("粘贴失败，服务器错误");
                }
            })
            .catch(v => {
                message.error("粘贴失败: " + v);
                console.error(v);
            });
    }

    delete(index) {
        client.deleteClipboardText(this.state.clipboardTexts[index].id)
            .then(data => {
                if (data.code === 200) {
                    message.info("删除成功");
                    this.getClipboardTexts();
                } else {
                    message.warn("删除失败，服务器错误");
                }
            })
            .catch(v => {
                message.error("删除失败: " + v);
                console.error(v);
            })
    }

    hideViewer() { this.setState({ viewing: false }) }

    showViewer(e, index) {
        this.setState({
            viewing: true,
            viewingText: this.state.clipboardTexts[index].text
        });
        e.stopPropagation();
    }

    onTextChange(e) { this.editingText = e.target.value }

    render() {
        const viewerStyle = this.state.viewing ?
            { opacity: 1, zIndex: 2 } : { opacity: 0, zIndex: -1 };

        const historyCards = <>
            {this.state.clipboardTexts.map((data, index) =>
                <Card
                    className="clipboard-result-card"
                    key={"cb-card-" + index}
                    title={data.id}
                    extra={timeStamp2Str(data.timestamp)}
                    actions={[
                        <DeleteOutlined onClick={(e) => { this.delete(index) }} />,
                        <EyeOutlined onClick={(e) => { this.showViewer(e, index) }} />
                    ]}>
                    <Text
                        key={"cb-text" + index}
                        copyable={{ tooltips: ["复制", "已复制"] }}
                        ellipsis>
                        {data.text}
                    </Text>
                </Card>
            )}
        </>;

        return <div className="clipboard" onClick={this.hideViewer}>
            <Header className="header-text">
                短文本分享剪贴板
            </Header>
            <Content className="clipboard-content">
                <div className="clipboard-textare-holder">
                    <TextArea
                        placeholder="你想要分享什么=_=?"
                        className="clipboard-textarea"
                        onChange={this.onTextChange}
                        rows={20} />
                    <Button type="primary" block onClick={this.pasteText}>粘贴!</Button>
                </div>
                <div className="clipboard-result-holder">
                    <strong>分享记录</strong>
                    <div className="clipboard-result-list">
                        {historyCards}
                    </div>
                </div>
                <div className="clipboard-view-holder" style={viewerStyle}>
                    <div
                        className="clipboard-view-content"
                        onClick={(e) => e.stopPropagation()}>
                        <div style={{ alignSelf: "flex-end" }}>
                            <Tooltip title="滚动到底部">
                                <VerticalAlignBottomOutlined
                                    style={{ float: "left", color: "gray", marginRight: "5px" }}
                                    onClick={() => { this.viewHolderEnd.scrollIntoView() }} />
                            </Tooltip>
                            <Tooltip title="关闭">
                                <CloseCircleOutlined
                                    style={{ float: "left", color: "gray" }}
                                    onClick={this.hideViewer} />
                            </Tooltip>
                        </div>
                        <Text
                            copyable={{ tooltips: ["复制", "已复制"] }}>
                            {this.state.viewingText}
                        </Text>
                        <div ref={(el) => { this.viewHolderEnd = el; }}></div>
                    </div>
                </div>
            </Content>
        </div>
    }
};