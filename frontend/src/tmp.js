const { Menu } = require("antd");
const { default: SubMenu } = require("antd/lib/menu/SubMenu");
const { Link } = require("react-router-dom");

const route2MenuWrapper = {
    allRoutes: [
        {
            "path": "/index.html",
            "page": HomePage,
            "title": "首页",
            "alias": new Set(["/"])
        },
        {
            "title": "实验室常用信息",
            "child": [
                {
                    "path": "/page/doc",
                    "page": DocPage,
                    "title": "常用信息",
                },
                {
                    "path": "/page/doc-editor",
                    "page": DocEditor,
                    "title": "添加信息",
                }
            ]
        },
        {
            "path": "/page/temp-cloud-disk",
            "page": TempCloudDisk,
            "title": "内部网盘",
        },
        {
            "path": "/page/clipboard",
            "page": ClipboardPage,
            "title": "剪贴板",
        },
        {
            "path": "/page/ccf-search",
            "page": CCfSearchPage,
            "title": "常用信息",
        },
        {
            "path": "/page/doc-update",
            "page": DocEditor,
            "fake": true
        },
    ],
    getIndexByPath(path) {
        var k = 0;
        for (let i = 0; i < allRoutes.length; i++) {
            const route = allRoutes[i];
            if (route.child) {
                for (let j = 0; j < route.child.length; j++) {
                    // should check childRoute alias too
                    if (route.child[j].path === path)
                        return k;
                    k++;
                }
            }
            else {
                if (route.path === path || (route.alias && route.alias.has(path)))
                    return k;
                k++;
            }
        }
        return 0;
    }
}

const allRoutes = [
    {
        "path": "/index.html",
        "page": HomePage,
        "title": "首页",
        "alias": new Set(["/"])
    },
    {
        "title": "实验室常用信息",
        "child": [
            {
                "path": "/page/doc",
                "page": DocPage,
                "title": "常用信息",
            },
            {
                "path": "/page/doc-editor",
                "page": DocEditor,
                "title": "添加信息",
            }
        ]
    },
    {
        "path": "/page/temp-cloud-disk",
        "page": TempCloudDisk,
        "title": "内部网盘",
    },
    {
        "path": "/page/clipboard",
        "page": ClipboardPage,
        "title": "剪贴板",
    },
    {
        "path": "/page/ccf-search",
        "page": CCfSearchPage,
        "title": "常用信息",
    },
    {
        "path": "/page/doc-update",
        "page": DocEditor,
        "fake": true
    },
];

function makeMenuList() {
    var currentKey = 0;
    return <Menu
        siderCollapsed
        theme={'light'}
        onClick={this.handleClick}
        defaultOpenKeys={['sub1']}
        // selectedKeys={path2All.getIndexByPath(this.props.location.pathname).toString() || '0'}
        mode="inline" >
        {allRoutes.map((path, index) => {
            if (path.fake)
                return null;
            var res;
            if (path.child) {
                res = <SubMenu
                    key={"sub" + index}
                    title={path.title}>
                    {path.child.map((childpath, index) => {
                        var tmpRes = <Menu.Item key={currentKey}>
                            <Link to={childpath.path}>{childpath.title}</Link>
                        </Menu.Item>
                        currentKey++;
                        return tmpRes;
                    })}
                </SubMenu>
            } else {
                res = <Menu.Item key={currentKey}>
                    <Link to={path.path}>{path.title}</Link>
                </Menu.Item>
                currentKey++;
            }
            return res;
        })}
    </Menu>
}

function makeRouteList() {
}
const menuChildren = makeMenuList();