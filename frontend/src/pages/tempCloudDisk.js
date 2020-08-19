import React from 'react';
import { Component } from 'react';
import { Layout, Tooltip, Space, Button, message } from 'antd';
import { InboxOutlined, DownloadOutlined, DeleteOutlined, FolderAddOutlined } from '@ant-design/icons';
import DirectoryTree from 'antd/lib/tree/DirectoryTree';
import Dragger from 'antd/lib/upload/Dragger';
import '../styles/tempCloudDisk.css';
import { client } from '../client';

const { Header, Content } = Layout;

function getPathOnTreeFromKey(key, treeData) {
    var resPath = "";
    var tmpData = treeData;
    key.split('-').forEach(index => {
        index = Number(index);
        resPath = resPath + "/" + tmpData[index].title;
        tmpData = tmpData[index].children;
    });
    return resPath;
}

export default class TempCloudDisk extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // tree
            dirData: [],
            selectedKey: "0",

            // uploader
            uploading: false,
            fileList: []
        }
        this.onTreeSelect = this.onTreeSelect.bind(this);
        this.onUploaderChange = this.onUploaderChange.bind(this);
        this.getFileTree = this.getFileTree.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.makeDir = this.makeDir.bind(this);
        this.titleRender = this.titleRender.bind(this);
    }

    onTreeSelect(keys, event) {
        this.setState({ selectedKey: keys[0] });
    }

    onUploaderChange(info) {
        this.setState({ fileList: [...info.fileList] });
    }

    componentDidMount() { this.getFileTree() }

    getFileTree() {
        client.getFileTree()
            .then(data => {
                if (data.code === 200) {
                    this.setState({ dirData: data.data });
                } else {
                    message.warn("获取文件列表失败，服务器错误");
                    console.warn("get uploaded file failed, server error");
                }
            })
            .catch(reason => {
                message.error("获取文件列表失败:" + reason);
                console.log("get uploaded files failed: ", reason);
            });
    }

    uploadFiles() {
        if (!this.state.fileList || this.state.fileList.length === 0)
            return;
        console.log("uploadFiles, files: ", this.state.fileList);
        this.setState({ uploading: true });
        client.uploadFiles(this.state.fileList)
            .then(data => {
                this.setState({
                    uploading: false,
                    fileList: []
                })
                // todo get data again here
            })
            .catch(reason => {
                message.error("上传失败: " + reason);
                console.error("upload file failed: ", reason);
            })

    }

    deleteFile(ev) {
        // delete and get list again
        console.log("deleteFile, state: ", this.state);
        console.log("deleteFile, path: ", getPathOnTreeFromKey(this.state.selectedKey, this.state.dirData));
    }

    downloadFile() {
        // send request and do nothing
    }

    makeDir() {
        // make and get list again
    }

    titleRender(node) {
        // {title: "parent 1", key: "0-1", children: Array(2)}
        // {title: "leaf 1-0", key: "0-1-0", isLeaf: true}
        var btnNodes;
        if (node.isLeaf)
            btnNodes = <Space size="small">
                <Tooltip title="下载">
                    <DownloadOutlined onClick={this.downloadFile} />
                </Tooltip>
                <Tooltip title="删除" >
                    <DeleteOutlined onClick={this.deleteFile} />
                </Tooltip>
            </Space>;
        else
            btnNodes = <Tooltip title="新建文件夹">
                <FolderAddOutlined onClick={this.makeDir} />
            </Tooltip>;
        return <Space size="middle">
            <span>{node.title}</span>
            <div>{node.key !== this.state.selectedKey ? null : btnNodes}</div>
        </Space>
    }

    render() {
        return <Layout className="cloud-disk-">
            <Header className="header-text">临时网盘-再也不用打开QQ/微信咯~ QAQ</Header>
            <Content className="cloud-disk-content">
                <DirectoryTree
                    className="directory-tree"
                    expandAction="doubleClick"
                    defaultSelectedKeys={["0"]}
                    onSelect={this.onTreeSelect}
                    titleRender={this.titleRender}
                    treeData={this.state.dirData}>
                </DirectoryTree>
                <Space direction="vertical" className="upload-holder">
                    <Dragger
                        multiple
                        fileList={this.state.fileList}
                        onChange={this.onUploaderChange}
                        beforeUpload={() => false}
                        name="文件">
                        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                        <p className="ant-upload-text">点击或拖拽文件到此处</p>
                        <p className="ant-upload-hint">支持选择多个文件</p>
                    </Dragger>
                    <Button
                        block
                        onClick={this.uploadFiles}
                        type="primary"
                        loading={this.state.uploading}>
                        {this.state.uploading ? "上传中" : "上传"}
                    </Button>
                </Space>
            </Content>
        </Layout >
    }
};
