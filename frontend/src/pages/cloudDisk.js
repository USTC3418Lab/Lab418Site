import React from 'react';
import { Component } from 'react';
import { Layout, Tooltip, Space, Button, message, Input, Popconfirm } from 'antd';
import { InboxOutlined, DownloadOutlined, DeleteOutlined, FolderAddOutlined } from '@ant-design/icons';
import DirectoryTree from 'antd/lib/tree/DirectoryTree';
import Dragger from 'antd/lib/upload/Dragger';
import '../styles/cloudDisk.css';
import { client } from '../client';
import Modal from 'antd/lib/modal/Modal';
import { isStrEmpty } from '../utils';

const { Header, Content } = Layout;

// relative path without root-dir
function getPathOnTreeFromKey(key, treeData, justPath) {
    var resPath = "";
    var tmpData = treeData[0].children;
    let indexList = key.split('-');
    for (let i = 1; i < indexList.length; i++) {
        const index = Number(indexList[i]);
        if (justPath && tmpData[index].isLeaf)
            break;
        resPath += tmpData[index].title;
        if (!tmpData[index].isLeaf)
            resPath += "/";
        tmpData = tmpData[index].children;
    }
    return resPath;
}

export default class CloudDisk extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // tree
            treeData: [],
            selectedKey: "0",

            // uploader
            uploading: false,
            fileList: [],

            // new folder modal
            modalVisible: false,
            confirmLoading: false,
            newDirName: ""
        }
        this.onTreeSelect = this.onTreeSelect.bind(this);
        this.onUploaderChange = this.onUploaderChange.bind(this);
        this.getFileTree = this.getFileTree.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.makeDir = this.makeDir.bind(this);
        this.titleRender = this.titleRender.bind(this);
        this.showMakeDirMoal = this.showMakeDirMoal.bind(this);
        this.hideMakeDirModal = this.hideMakeDirModal.bind(this);
        this.onMakeDirInputChange = this.onMakeDirInputChange.bind(this);
    }

    onTreeSelect(keys, event) {
        this.setState({ selectedKey: keys[0] });
    }

    onUploaderChange(info) {
        this.setState({ fileList: [...info.fileList] });
    }

    componentDidMount() { this.getFileTree() }

    componentWillUnmount() { this.setState = (state) => { return } }

    getFileTree() {
        client.getFileTree()
            .then(data => {
                this.setState(prev => {
                    return { treeData: data, selectedKey: prev.selectedKey }
                });
            })
            .catch(reason => {
                message.error("获取文件列表失败:" + reason);
                console.error("get uploaded files failed: ", reason);
            });
    }

    uploadFile() {
        if (!this.state.fileList || this.state.fileList.length === 0)
            return;
        const path = getPathOnTreeFromKey(this.state.selectedKey, this.state.treeData, true);
        this.setState({ uploading: true });
        client.uploadFile(this.state.fileList[0].originFileObj, path)
            .then(data => {
                if (data.code === 200) {
                    this.setState({
                        uploading: false,
                        fileList: []
                    });
                    this.getFileTree();
                } else {
                    message.error("上传失败，服务器错误");
                    console.error("upload file faield, internal server error");
                }
            })
            .catch(reason => {
                message.error("上传失败: " + reason);
                console.error("upload file failed: ", reason);
            })

    }

    deleteFile(ev) {
        const path = getPathOnTreeFromKey(this.state.selectedKey, this.state.treeData);
        client.deleteFile(path)
            .then(data => {
                if (data.code === 200) {
                    message.info("删除成功");
                    this.getFileTree();
                } else {
                    message.error("删除失败，服务器错误");
                    console.error("delete file failed, internal server error");
                }
            })
            .catch(reason => {
                message.error("删除失败: " + reason);
                console.error("delete file failed: ", reason);
            });
    }

    downloadFile() {
        // send request and do nothing
        const path = getPathOnTreeFromKey(this.state.selectedKey, this.state.treeData);
        client.downloadFile(path);
    }

    makeDir() {
        if (isStrEmpty(this.state.newDirName)) {
            message.info("文件夹名字为空 ~_~");
            return;
        }
        this.setState({ confirmLoading: true });
        // make and get list again
        const path = getPathOnTreeFromKey(this.state.selectedKey, this.state.treeData);
        client.makeDir(path + "/" + this.state.newDirName)
            .then(data => {
                if (data.code === 200) {
                    message.info("创建文件夹成功");
                    this.hideMakeDirModal();
                    this.getFileTree();
                } else {
                    message.error("创建文件夹失败，服务器错误");
                    console.error("make dir failed, internal server error");
                    this.setState({ confirmLoading: false });
                }
            })
            .catch(reason => {
                message.error("创建文件夹失败: " + reason);
                console.error("make dir failed: ", reason);
                this.setState({ confirmLoading: false });
            });
    }

    onMakeDirInputChange(ev) { this.setState({ newDirName: ev.target.value }) }

    showMakeDirMoal() { this.setState({ modalVisible: true, confirmLoading: false, newDirName: "" }) }

    hideMakeDirModal() { this.setState({ modalVisible: false, confirmLoading: false }) }

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
                    <Popconfirm
                        title="确定删除该文件？"
                        onConfirm={this.deleteFile}
                        okText="是"
                        cancelText="否">
                        <DeleteOutlined />
                    </Popconfirm>
                </Tooltip>
            </Space>;
        else
            btnNodes = <Tooltip title="新建文件夹">
                <FolderAddOutlined onClick={this.showMakeDirMoal} />
            </Tooltip>;
        return <Space size="middle">
            <span>{node.title}</span>
            <div>{node.key !== this.state.selectedKey ? null : btnNodes}</div>
        </Space>
    }

    render() {
        var dirTree = null;
        if (this.state.treeData && this.state.treeData.length > 0)
            dirTree =
                <DirectoryTree
                    defaultExpandAll
                    className="directory-tree"
                    expandAction="doubleClick"
                    defaultSelectedKeys={["0"]}
                    onSelect={this.onTreeSelect}
                    titleRender={this.titleRender}
                    treeData={this.state.treeData}>
                </DirectoryTree>

        return <Layout className="cloud-disk-">
            <Header className="header-text">临时网盘-再也不用打开QQ/微信咯~ QAQ</Header>
            <Content className="cloud-disk-content">
                <div className="directory-tree-holder">
                    {dirTree}
                </div>
                <Modal
                    cancelText="取消"
                    okText="确认"
                    title="新建文件夹"
                    visible={this.state.modalVisible}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.hideMakeDirModal}
                    onOk={this.makeDir}>
                    <Input placeholder="文件夹名称" value={this.state.newDirName} onChange={this.onMakeDirInputChange} />
                </Modal>
                <Space direction="vertical" className="upload-holder">
                    <Dragger
                        fileList={this.state.fileList}
                        onChange={this.onUploaderChange}
                        beforeUpload={() => false}
                        name="文件">
                        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                        <p className="ant-upload-text">点击或拖拽文件到此处</p>
                    </Dragger>
                    <Button
                        block
                        onClick={this.uploadFile}
                        type="primary"
                        loading={this.state.uploading}>
                        {this.state.uploading ? "上传中" : "上传"}
                    </Button>
                </Space>
            </Content>
        </Layout >
    }
};
