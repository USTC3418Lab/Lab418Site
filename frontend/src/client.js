import { shuffle } from './utils';

const axios = require('axios').default;

const mock = false;

const code2msg = {
    200: "SUCCESS",
    400: "DOC_EXISTED",
    401: "DOC_NOT_FOUND",
}

const mockClient = {
    getDoc() {
        return new Promise((resolve, reject) => {
            const tmpRes = "[{ \"title\": \"halo\", \"paragraph\": \"# 中您将学习如何使用 \\n ## Bootstrap工具包来创建基于导航、标签、胶囊式标签的导航。我们有演示实例及相关的解释,包括:基本\", \"timestamp\": 1596716036000 }, { \"title\": \"halo\", \"paragraph\": \"中,您将学习如何使用Bootstrap工具包来创建基于导航、标签、胶囊式标签的导航。我们有演示实例及相关的解释,包括:基本\", \"timestamp\": 1596716046000 },{ \"title\": \"halo\", \"paragraph\": \"中,您将学习如何使用Bootstrap工具包来创建基于导航、标签、胶囊式标签的导航。我们有演示实例及相关的解释,包括:基本\", \"timestamp\": 1596716046000 }, { \"title\": \"halo\", \"paragraph\": \"中,您将学习如何使用Bootstrap工具包来创建基于导航、标签、胶囊式标签的导航。我们有演示实例及相关的解释,包括:基本\", \"timestamp\": 1596716046000 }, { \"title\": \"halo\", \"paragraph\": \"中,您将学习如何使用Bootstrap工具包来创建基于导航、标签、胶囊式标签的导航。我们有演示实例及相关的解释,包括:基本\", \"timestamp\": 1596733046000 }, { \"title\": \"halo\", \"paragraph\": \"中,您将学习如何使用Bootstrap工具包来创建基于导航、标签、胶囊式标签的导航。我们有演示实例及相关的解释,包括:基本\", \"timestamp\": 1596716046000 }, { \"title\": \"halo\", \"paragraph\": \"中,您将学习如何使用Bootstrap工具包来创建基于导航、标签、胶囊式标签的导航。我们有演示实例及相关的解释,包括:基本\", \"timestamp\": 1596715746000 }, { \"title\": \"halo\", \"paragraph\": \"中,您将学习如何使用Bootstrap工具包来创建基于导航、标签、胶囊式标签的导航。我们有演示实例及相关的解释,包括:基本\", \"timestamp\": 1596716046000, \"title\": \"halo\", \"paragraph\": \"中,您将学习如何使用Bootstrap工具包来创建基于导航、标签、胶囊式标签的导航。我们有演示实例及相关的解释,包括:基本\", \"timestamp\": 1596111384 }, { \"title\": \"halo\", \"paragraph\": \"中,您将学习如何使用Bootstrap工具包来创建基于导航、标签、胶囊式标签的导航。我们有演示实例及相关的解释,包括:基本\", \"timestamp\": 1598886046000 }, { \"title\": \"halo\", \"paragraph\": \"中,您将学习如何使用Bootstrap工具包来创建基于导航、标签、胶囊式标签的导航。我们有演示实例及相关的解释,包括:基本\", \"timestamp\": 1596717046000 }, { \"title\": \"halo\", \"paragraph\": \"中,您将学习如何使用Bootstrap工具包来创建基于导航、标签、胶囊式标签的导航。我们有演示实例及相关的解释,包括:基本\", \"timestamp\": 1596716046000 }]";
            resolve(JSON.parse(tmpRes));
        });
    },
    deleteDoc(title) {
        return new Promise((resolve, reject) => {
            const code = 200;
            if (code === 200) resolve({ code: code, message: code2msg[code] });
            else reject({ code: code, message: code2msg[code] });
        });
    },
    updateDoc(title, para) {
        return new Promise((resolve, reject) => {
            const code = 200;
            if (code === 200) resolve({ code: code, message: code2msg[code] });
            else reject({ code: code, message: code2msg[code] });
        });
    },
    addDoc(title, paras) {
        return new Promise((resolve, reject) => {
            const code = 200;
            if (code === 200) resolve({ code: code, message: code2msg[code] });
            else reject({ code: code, message: code2msg[code] });
        });
    },
    getClipboardTexts() {
        return new Promise((resolve, reject) => {
            const tmpLi = [1, 2, 3, 4, 5, 6, 7, 8];
            const tmpi = Math.floor(Math.random() * tmpLi.length);
            const res = [];
            for (let i = 0; i < tmpLi[tmpi] * 2; i++) {
                res.push({
                    id: i,
                    text: "this " + i + "短文本分享，类似于云剪贴板\n\n前端\n\nimage\n\n后端\n\n短文本格式: {id, string, timestamp}，直接存放在数组中\n接口\n获取所有短文本 GET 无参数 返回JSON数组[]\n添加某个短文本 POST 参数:{string} 返回 {code, message}\n数组设置上限(1000)，超过此上限就移除时间戳最小（下标最小的）的\n删除某个短文本 GET 参数:{id} 返回{code, message}\ncode,云剪贴板\n\n前端\n\nimage\n\n后端\n\n短文本格式: {id, string, timestamp}，直接存放在数组中\n接口\n获取所有短文本 GET 无参数 返回JSON数组[]\n添加某个短文本 POST 参数:{string} 返回 {code, message}\n数组设置上限(1000)，超过此上限就移除时间戳最小（下标最小的）的\n删除某个短文本 GET 参数:{id} 返回{code, message}\ncode, 云剪贴板\n\n前端\n\nimage\n\n后端\n\n短文本格式: {id, string, timestamp}，直接存放在数组中\n接口\n获取所有短文本 GET 无参数 返回JSON数组[]\n添加某个短文本 POST 参数:{string} 返回 {code, message}\n数组设置上限(1000)，超过此上限就移除时间戳最小（下标最小的）的\n删除某个短文本 GET 参数:{id} 返回{code, message}\ncode, 云剪贴板\n\n前端\n\nimage\n\n后端\n\n短文本格式: {id, string, timestamp}，直接存放在数组中\n接口\n获取所有短文本 GET 无参数 返回JSON数组[]\n添加某个短文本 POST 参数:{string} 返回 {code, message}\n数组设置上限(1000)，超过此上限就移除时间戳最小（下标最小的）的\n删除某个短文本 GET 参数:{id} 返回{code, message}\ncode, 云剪贴板\n\n前端\n\nimage\n\n后端\n\n短文本格式: {id, string, timestamp}，直接存放在数组中\n接口\n获取所有短文本 GET 无参数 返回JSON数组[]\n添加某个短文本 POST 参数:{string} 返回 {code, message}\n数组设置上限(1000)，超过此上限就移除时间戳最小（下标最小的）的\n删除某个短文本 GET 参数:{id} 返回{code, message}\ncode,  mes: 200 SUCCESS, 400 FAIL\n后端我也直接写了吧\n",
                    timestamp: 1500000000290 + i * 10000000,
                })
            }
            resolve(shuffle(res));
        });
    },
    deleteClipboardText(id) {
        return new Promise((resolve, reject) => {
            resolve({ code: 200, message: "SUCCESS" });
        });
    },
    addClipboardText(text) {
        return new Promise((resolve, reject) => {
            resolve({ code: 200, message: "SUCCESS" });
        });
    },
    ccfSearch(text) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([{ "title": "A fork() in the road.", "href": "https://github.com/USTC3418Lab/Lab418Site/issues/8", "conference": "HotOS2019", "degree": "B类" }]);
            }, 1000);
        });
    }
};

function makeFormBody(paras) {
    var body = new FormData();
    for (const key in paras) {
        if (paras.hasOwnProperty(key)) {
            const value = paras[key];
            body.set(key, value.toString());
        }
    }
    return body;
}

const realClient = {
    getDoc() {
        return new Promise((resolve, reject) => {
            axios.get("/doc").then(resp => {
                if (resp.status === 200)
                    resolve(resp.data);
                else
                    reject({ "status": resp.status, "text": resp.statusText });
            }).catch(reason => reject(reason));
        });
    },
    deleteDoc(title) {
        return new Promise((resolve, reject) => {
            axios.get("/doc/delete?title=" + title)
                .then(resp => {
                    if (resp.status === 200)
                        resolve(resp.data);
                    else reject(resp.statusText)
                })
                .catch(reason => reject(reason));
        });
    },
    updateDoc(title, paragraph) {
        return new Promise((resolve, reject) => {
            axios.post(
                '/doc/update',
                makeFormBody({ title: title, paragraph: paragraph }),
                { headers: { 'Content-Type': 'multipart/form-data' } }
            ).then(resp => {
                if (resp.status === 200)
                    resolve(resp.data);
                else reject(resp.statusText);
            }).catch(v => reject(v));
        });
    },
    addDoc(title, paragraph) {
        return new Promise((resolve, reject) => {
            axios.post(
                '/doc/add',
                makeFormBody({ title: title, paragraph: paragraph }),
                { headers: { 'Content-Type': 'multipart/form-data' } }
            ).then(resp => {
                if (resp.status === 200)
                    resolve(resp.data);
                else reject(resp.statusText);
            }).catch(v => reject(v));
        });
    },
    getClipboardTexts() {
        return new Promise((resolve, reject) => {
            axios.get("/clipboard")
                .then(resp => {
                    if (resp.status === 200)
                        resolve(resp.data);
                    else
                        reject(resp.statusText);
                })
                .catch(reason => reject(reason));
        });
    },
    deleteClipboardText(id) {
        return new Promise((resolve, reject) => {
            axios.get("/clipboard/delete?id=" + id)
                .then(resp => {
                    if (resp.status === 200)
                        resolve(resp.data);
                    else
                        reject(resp.statusText)
                })
                .catch(reason => reject(reason));
        });
    },
    addClipboardText(text) {
        return new Promise((resolve, reject) => {
            axios.post(
                "/clipboard/add",
                makeFormBody({ text: text }),
                { headers: { 'Content-Type': 'multipart/form-data' } }
            ).then(resp => {
                if (resp.status === 200)
                    resolve(resp.data);
                else
                    reject(resp.statusText);
            }).catch(v => reject(v));
        });
    },
    ccfSearch(paper) {
        return new Promise((resolve, reject) => {
            axios.get("/ccf?paper=" + paper)
                .then(resp => {
                    if (resp.status === 200)
                        resolve(resp.data);
                    else
                        reject(resp.statusText)
                })
                .catch(reason => reject(reason));
        });
    }
};

export const client = (mock ? mockClient : realClient);

