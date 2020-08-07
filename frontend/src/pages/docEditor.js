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
        this.state = {
            rawText: null
        };
        this.onEditorTextChange = this.onEditorTextChange.bind(this);
    }

    onEditorTextChange(editor, data, value) {
        console.log("data: ", data);
        console.log("value: ", value);
        this.setState({ rawText: value });
    }

    render() {
        const passedState = this.props.location ? this.props.location.state : null;
        const doc = passedState ? passedState.doc : null;

        var buttonText = "添加", titleText = null, editorText = null;
        if (doc) {
            buttonText = "更新";
            titleText = doc.title;
            editorText = doc.paragraph
        }

        return <Layout className="doc-editor">
            <Header className="editor-header header">
                <Input placeholder="标题" className="editor-title-input" value={titleText} />
                <Button type="primary">{buttonText}</Button>
            </Header>
            <Layout className="editor-holder">
                <CodeMirror
                    options={{
                        mode: 'markdown',
                        theme: 'material',
                        lineNumbers: true
                    }}
                    className="editor-codemirror"
                    value={editorText}
                    onChange={this.onEditorTextChange} />
                <ReactMarkdown className="editor-preview" source={this.state.rawText} />
            </Layout>
        </Layout>;
    }
};
