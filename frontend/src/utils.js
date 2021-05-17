export function timeStamp2Str(timeStamp) {
    const s = new Date(timeStamp).toISOString();
    return s.substr(0, 10) + " " + s.substr(11, 5);
};

export function isStrEmpty(obj) {
    //判断字符是否为空的方法
    if (typeof obj === "undefined" || obj === null || obj === "") {
        return true;
    } else {
        return false;
    }
};

export function shuffle(array) {
    let len = array.length;
    for (let i = len - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export function getUserIdentity() {
    let id = localStorage.getItem("identity");
    if (id != null)
        return JSON.parse(id);
    return null;
}

export function setUserIdentity(username, password) {
    localStorage.setItem("identity", JSON.stringify(
        { username: username, password: password }
    ));
}