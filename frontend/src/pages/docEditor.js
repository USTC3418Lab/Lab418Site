import React from 'react';
import { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Layout, Input, Button, message } from 'antd';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/markdown/markdown';
import '../styles/docEditor.css'
import { client } from '../client';
const { Header } = Layout;

export default class DocEditor extends Component {
    constructor(props) {
        super(props);
        const passedState = this.props.location ? this.props.location.state : null;
        const doc = passedState ? passedState.doc : null;

        this.tempContent = doc ? doc.paragraph : null;
        this.state = {
            editorContent: doc ? doc.paragraph : null,
            inputTitle: doc ? doc.title : null,
            typeUpdating: doc ? true : false,
        };
        this.onEditorTextChange = this.onEditorTextChange.bind(this);
        this.onInputTitleTextChange = this.onInputTitleTextChange.bind(this);
        this.updateDoc = this.updateDoc.bind(this);
        this.addDoc = this.addDoc.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    onEditorTextChange(editor, data, value) { this.setState({ editorContent: value }); }

    onInputTitleTextChange(ev) { this.setState({ inputTitle: ev.target.value }); }

    addDoc() {
        client.addDoc(this.state.inputTitle, this.state.editorContent)
            .then(data => {
                if (data.code === 200) {
                    message.info("添加成功");
                    this.props.history.push('/page/doc');
                }
                else if (data.code === 400)
                    message.warn("添加失败 - 已存在同标题信息");
                else
                    message.warn("添加失败 - 服务器错误");
            })
            .catch(v => {
                console.error(v);
                message.error("添加失败");
            });
    }

    updateDoc() {
        client.updateDoc(this.state.inputTitle, this.state.editorContent)
            .then(data => {
                if (data.code === 200) {
                    message.info("更新成功");
                    this.goBack();
                }
                else if (data.code === 401)
                    message.warn("更新失败 - 信息不存在");
                else
                    message.warn("更新失败 - 服务器错误");
            })
            .catch(v => {
                console.error(v);
                message.error("更新失败");
            });
    }

    goBack() { this.props.history.goBack(); }

    render() {
        var buttonText = "添加";
        if (this.state.typeUpdating) buttonText = "更新";
        const cancelButton = this.state.typeUpdating ?
            <Button onClick={this.goBack} type="primary" className="editor-button">
                取消
            </Button> : null;

        return <Layout className="doc-editor">
            <Header className="editor-header header">
                <Input onChange={this.onInputTitleTextChange} placeholder="标题" className="editor-title-input" value={this.state.inputTitle} />
                <Button
                    onClick={this.state.typeUpdating ? this.updateDoc : this.addDoc}
                    type="primary"
                    className="editor-button">
                    {buttonText}
                </Button>
                {cancelButton}
            </Header>
            <Layout className="editor-holder">
                <CodeMirror
                    options={{
                        mode: 'markdown',
                        theme: 'material',
                        lineNumbers: true
                    }}
                    className="editor-codemirror"
                    value={this.tempContent}
                    onChange={this.onEditorTextChange} />
                <ReactMarkdown className="editor-preview" source={this.state.editorContent} />
            </Layout>
        </Layout>;
    }
};
