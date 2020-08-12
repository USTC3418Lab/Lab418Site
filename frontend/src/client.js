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
    }
};

export const client = (mock ? mockClient : realClient);

