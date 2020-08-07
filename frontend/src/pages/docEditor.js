import React from 'react';
import { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Layout, Input, Button } from 'antd';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/markdown/markdown';
import '../styles/docEditor.css'
const { Header } = Layout;

export default class DocEditor extends Component {
    constructor(props) {
        super(props);

        this.state = { rawText: "" };
        this.onEditorTextChange = this.onEditorTextChange.bind(this);
    }

    onEditorTextChange(editor, data, value) {
        console.log("data: ", data);
        console.log("value: ", value);
        this.setState({ rawText: value });
    }


    render() {
        return <Layout className="doc-editor">
            <Header className="editor-header header">
                <Input placeholder="标题" className="editor-title-input" />
                <Button type="primary">添加</Button>
            </Header>
            <Layout className="editor-holder">
                <CodeMirror
                    options={{
                        mode: 'markdown',
                        theme: 'material',
                        lineNumbers: true
                    }}
                    className="editor-codemirror"
                    onChange={this.onEditorTextChange} />
                <ReactMarkdown className="editor-preview" source={this.state.rawText} />
            </Layout>
        </Layout>;
    }
};
