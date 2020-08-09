import React from 'react';
import ReactDom from 'react-dom';
import 'antd/dist/antd.css';
import './styles/index.css';
import { AppWrapper } from './App';
import { BrowserRouter as Router } from 'react-router-dom';


ReactDom.render(<Router><AppWrapper /></Router>, document.getElementById("root"));