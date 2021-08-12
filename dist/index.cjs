Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("process"), t = require("path"), o = require("@masx200/async-task-current-limiter"), n = require("https"), r = require("node-fetch"), a = require("assert"), i = require("fs-extra"), s = require("os"), c = require("btoa"), l = require("cookie");

function d(e) {
    return e && "object" == typeof e && "default" in e ? e : {
        default: e
    };
}

var p = d(e), u = d(t), f = d(o), h = d(n), g = d(r), m = d(a), w = d(i), y = d(s), k = d(c), b = d(l), S = '你的空间不足了哟，赶紧<a target="_blank" href="//yun.baidu.com/buy/center?tag=8&from=disk-home">购买容量</a>吧', q = {
    0: "成功",
    "-1": "用户名和密码验证失败",
    "-2": "备用",
    "-3": "用户未激活（调用init接口）",
    "-4": "COOKIE中未找到host_key&user_key（或BDUSS）",
    "-5": "host_key和user_key无效",
    "-6": '登录失败，请重新<a href="javascript:window.location.reload();">登录</a>',
    "-7": "文件或目录名错误或无权访问",
    "-8": "该目录下已存在此文件",
    "-9": "文件被所有者删除，操作失败",
    "-10": S,
    "-11": "父目录不存在",
    "-12": "设备尚未注册",
    "-13": "设备已经被绑定",
    "-14": "帐号已经初始化",
    "-19": "请输入验证码",
    "-21": "预置文件无法进行相关操作",
    "-22": "被分享的文件无法重命名，移动等操作",
    "-23": "数据库操作失败，请联系netdisk管理员",
    "-24": "要取消的文件列表中含有不允许取消public的文件。",
    "-25": "非公测用户",
    "-26": "邀请码失效",
    "-32": S,
    "-102": "云冲印文件7日内无法删除",
    1: "服务器错误 ",
    2: "接口请求错误，请稍候重试",
    3: "一次操作文件不可超过100个",
    4: "新文件名错误",
    5: "目标目录非法",
    6: "备用",
    7: "NS非法或无权访问",
    8: "ID非法或无权访问",
    9: "申请key失败",
    10: "创建文件的superfile失败",
    11: "user_id(或user_name)非法或不存在",
    12: "部分文件已存在于目标文件夹中",
    13: "此目录无法共享",
    14: "系统错误",
    15: "操作失败",
    102: "无权限操作该目录",
    103: "提取码错误",
    104: "验证cookie无效",
    111: "当前还有未完成的任务，需完成后才能操作",
    112: '页面已过期，请<a href="javascript:window.location.reload();">刷新</a>后重试',
    121: "网盘文件过多，请删至500万个以内再试",
    132: "删除文件需要验证您的身份",
    141: "内部错误",
    142: "您已被移出当前共享目录，无法继续操作",
    201: "系统错误",
    202: "系统错误",
    203: "系统错误",
    204: "系统错误",
    205: "系统错误",
    301: "其他请求出错",
    501: "获取的LIST格式非法",
    618: "请求curl返回失败",
    619: "pcs返回错误码",
    600: "json解析出错",
    601: "exception抛出异常",
    617: "getFilelist其他错误",
    211: "无权操作或被封禁",
    404: "秒传md5不匹配 rapidupload 错误码",
    406: "秒传创建文件失败 rapidupload 错误码",
    407: "fileModify接口返回错误，未返回requestid rapidupload 错误码",
    1024: "云冲印购物车文件15日内无法删除",
    31080: "我们的服务器出错了，稍候试试吧",
    31021: "网络连接失败，请检查网络或稍候再试",
    31075: "一次支持操作999个，减点试试吧",
    31116: '你的空间不足了哟，赶紧<a href="//yun.baidu.com/buy/center?tag=2&from=multi-file">购买空间</a>吧',
    31401: "移动后，所选文件将被取消共享，原成员将无法查看，是否继续？",
    31034: "操作过于频繁，请稍后再试",
    36009: "用户空间不足",
    36010: "文件不存在",
    36012: "操作超时，请重试",
    36013: "同时下载的任务过多，不能下载",
    36014: "存储路径已使用",
    36016: "任务已删除",
    36017: "任务已完成",
    36018: "解析失败，种子文件损坏",
    36019: "任务正在处理中",
    36020: "任务地址不存在",
    36021: "普通用户最多同时下载1个任务哦！马上开通离线下载套餐，立即下载更多！",
    36022: "同时下载的任务过多，不能下载",
    36023: "普通用户每月只能离线下载5个任务哦！马上开通离线下载套餐，立即下载更多！",
    36024: "本月下载数已超限制",
    36025: "分享链接已失效",
    36026: "链接格式有误",
    36027: "链接格式有误",
    36028: "暂时无法找到相关种子信息",
    36031: "网络繁忙，请稍候再试",
    36032: "离线文件因含有违规内容被系统屏蔽无法下载",
    9e3: "请不要申诉正常文件！",
    9001: "服务器开小差，请稍后重试",
    9002: "申诉频率太快，请稍后再试",
    9100: '你的帐号存在违规行为，已被冻结，<a href="/disk/appeal" target="_blank">查看详情</a>',
    9200: '你的帐号存在违规行为，已被冻结，<a href="/disk/appeal" target="_blank">查看详情</a>',
    9300: '你的帐号存在违规行为，该功能暂被冻结，<a href="/disk/appeal" target="_blank">查看详情</a>',
    9400: '你的帐号异常，需验证后才能使用该功能，<a href="/disk/appeal" target="_blank">立即验证</a>',
    9500: '你的帐号存在安全风险，已进入保护模式，请修改密码后使用，<a href="/disk/appeal" target="_blank">查看详情</a>',
    10013: "当前还有未完成的任务，完成后才能操作",
    10014: "未检测到可导入证件",
    10015: "任务创建失败，请稍后重试",
    10016: "抱歉，容量未领取成功，请重新添加证件领取",
    18201: "创建共享目录失败： 有已共享的子目录",
    18202: "创建共享目录失败： 有已共享的父目录",
    18203: "创建共享目录失败： 超过最大创建共享目录限制",
    18204: "超过最大接收共享目录限制",
    18205: "共享目录群组已达上限",
    18207: "为成员设置备注错误",
    18208: "您已被移出该共享目录",
    18209: "邀请链接失效",
    18210: "共享目录不存在",
    18211: "邀请链接已过期",
    18212: "该目录已经被共享",
    18214: "不能邀请目录拥有者",
    18215: "您已加入该共享文件夹",
    18220: "该共享目录目录已被冻结",
    18221: "文件夹名称因含有敏感文字，无法共享给他人",
    18222: "文件夹中因含有非法违规内容，无法共享给他人",
    10019: "格式有误"
};

function x(e) {
    if (-6 === e?.errno) {
        const t = new Error("response data error \n" + JSON.stringify(e) + "\n" + Reflect.get(q, e?.errno));
        console.error(t), process.exit(1);
    }
}

const A = f.default(15), T = new h.default.Agent({
    keepAlive: !0
});

h.default.globalAgent = T;

const C = A.asyncwrap((function(e, t = {}) {
    return t = Object.assign({
        agent: e.startsWith("https:") ? T : void 0
    }, t), function(e, t = {}) {
        const {method: o = "GET", body: n} = t;
        console.log("request", o, e, n);
    }(e, t), g.default(e, t);
}));

async function v(e, t = {}) {
    const o = t.method || "GET", n = await C(e, t);
    if (!n.ok) throw Error("fetch failed \n " + o + " " + e + " \n" + n.status + " " + n.statusText);
    const r = await n.json();
    return function(e) {
        m.default(e && "object" == typeof e);
        const t = e?.errno;
        0 !== t && console.error("response data error", e);
    }(r), r;
}

const j = u.default.join(y.default.homedir(), "baidupan", "./userdata"), R = u.default.resolve(j, "./bdstoken.txt"), E = u.default.resolve(j, "./cookies.json"), U = k.default, z = String.fromCharCode, F = function(e) {
    if (e.length < 2) {
        var t = e.charCodeAt(0);
        return 128 > t ? e : 2048 > t ? z(192 | t >>> 6) + z(128 | 63 & t) : z(224 | t >>> 12 & 15) + z(128 | t >>> 6 & 63) + z(128 | 63 & t);
    }
    {
        let t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
        return z(240 | t >>> 18 & 7) + z(128 | t >>> 12 & 63) + z(128 | t >>> 6 & 63) + z(128 | 63 & t);
    }
}, N = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, P = function(e) {
    return (String(e) + "" + Math.random()).replace(N, F);
};

function _() {
    return U(P((new Date).getTime()));
}

const L = "https://pan.baidu.com/disk/home";

function M(e) {
    return Object.entries(e).map((([e, t]) => b.default.serialize(e, String(t)))).join(";");
}

async function O() {
    if (!w.default.existsSync(E)) throw Error("没有找到cookie文件,请先登陆网盘,并保存 cookie");
    const e = M(await w.default.readJSON(E)), t = await C(L, {
        headers: {
            "Accept-Encoding": " gzip, deflate, br",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.17 Safari/537.36 Edg/81.0.416.12",
            Connection: "keep-alive",
            Host: "pan.baidu.com",
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "cache-control": "max-age=0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            cookie: e,
            Referer: "https://pan.baidu.com/disk/home?"
        },
        body: void 0,
        method: "GET"
    });
    if (t.ok) {
        const e = t.headers.get("set-cookie");
        return e && await async function(e) {
            const t = {};
            e.split(",").map((e => e.split(";"))).flat().forEach((e => Object.assign(t, b.default.parse(e))));
            const o = {
                ...await w.default.readJSON(E),
                ...t
            };
            Reflect.deleteProperty(o, "expires"), Reflect.deleteProperty(o, "domain"), Reflect.deleteProperty(o, "path"), 
            console.log(o), await w.default.writeJSON(E, o, {
                spaces: 4
            });
        }(e), t.text();
    }
    throw Error("fetch failed \n" + L + " \n" + t.status + " " + t.statusText);
}

let W, G = e => {}, H = e => {};

async function D() {
    if (W) return W;
    W = new Promise(((e, t) => {
        G = e, H = t;
    }));
    try {
        await O();
        const e = await async function() {
            return String(await w.default.readFile(R));
        }(), t = M(await w.default.readJSON(E)), o = {
            logid: _(),
            bdstoken: e,
            cookie: t
        };
        return console.log(o), G(o), o;
    } catch (e) {
        return H(e), Promise.reject(e);
    }
}

function K(e, t) {
    m.default("object" == typeof e && e && !Array.isArray(e));
    const o = e?.errno;
    if (m.default("number" == typeof o), 0 !== o) throw console.error("response body error", e), 
    Error("response data error \n" + t + " \n" + o + " " + Reflect.get(q, o));
}

async function B(e) {
    const t = await D(), o = {
        taskid: String(e),
        channel: "chunlei",
        web: "1",
        app_id: "250528",
        bdstoken: t.bdstoken,
        logid: t.logid,
        clienttype: "0"
    };
    try {
        const e = new URL(J);
        e.search = String(new URLSearchParams(o));
        const n = String(e), r = void 0, a = {
            Host: "pan.baidu.com",
            Connection: "keep-alive",
            Accept: "application/json, text/javascript, */*; q=0.01",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.26 Safari/537.36 Edg/81.0.416.16",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Origin: "https://pan.baidu.com",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            Referer: " https://pan.baidu.com/disk/home?",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            Cookie: t.cookie
        }, i = await v(n, {
            method: "POST",
            body: r,
            headers: a
        });
        x(i);
        const s = i?.status, c = i?.progress;
        return 0 === i?.errno && "string" == typeof s ? {
            status: s,
            progress: c
        } : (K(i, n), {});
    } catch (t) {
        return console.error("查询文件错误,5秒后重试."), console.error(t), await new Promise((e => {
            setTimeout(e, 5e3);
        })), B(e);
    }
}

const J = "https://pan.baidu.com/share/taskquery";

async function X(e) {
    for (;;) {
        const {status: t, progress: o} = await B(e);
        if (console.log("查询到任务状态成功", e, t, o), "success" === t || "failed" === t) return;
        await new Promise((e => {
            setTimeout(e, 5e3);
        }));
    }
}

async function I(e, t) {
    const o = await D(), n = {
        order: "time",
        desc: "1",
        showempty: "0",
        web: "1",
        page: String(t),
        dir: e,
        num: String(Q),
        channel: "chunlei",
        app_id: "250528",
        bdstoken: o.bdstoken,
        logid: o.logid,
        clienttype: "0"
    }, r = {
        "Accept-Encoding": "gzip, deflate, br",
        Referer: "https://pan.baidu.com/disk/home?",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.17 Safari/537.36 Edg/81.0.416.12",
        Connection: "keep-alive",
        Host: "pan.baidu.com",
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        cookie: o.cookie
    }, a = new URL(V);
    a.search = String(new URLSearchParams(n));
    const i = String(a);
    try {
        const e = await v(i, {
            headers: r,
            body: void 0,
            method: "GET"
        });
        x(e);
        const t = e?.errno, o = e?.list;
        return -9 === t ? [] : "number" == typeof t && 0 === t && Array.isArray(o) ? o : (K(e, i), 
        []);
    } catch (o) {
        return console.error("获取文件列表错误,5秒后重试." + e), console.error(o), await new Promise((e => {
            setTimeout(e, 5e3);
        })), I(e, t);
    }
}

const V = "https://pan.baidu.com/api/list", Q = 1e3;

async function Y(e) {
    let t = 1;
    const o = [];
    for (;;) {
        const n = await I(e, t);
        if (o.push(...n), n.length < Q) break;
        t++;
    }
    return o;
}

async function Z(e) {
    if (!e.length) return;
    const t = await D(), o = {
        async: "2",
        opera: "delete",
        onnest: "fail",
        channel: "chunlei",
        web: "1",
        app_id: "250528",
        bdstoken: t.bdstoken,
        logid: t.logid,
        clienttype: "0"
    };
    try {
        const n = new URL($);
        n.search = String(new URLSearchParams(o));
        const r = String(n), a = "filelist=" + encodeURIComponent(JSON.stringify(e)), i = {
            Host: "pan.baidu.com",
            Connection: "keep-alive",
            Accept: "application/json, text/javascript, */*; q=0.01",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.26 Safari/537.36 Edg/81.0.416.16",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Origin: "https://pan.baidu.com",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            Referer: " https://pan.baidu.com/disk/home?",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            Cookie: t.cookie
        }, s = await v(r, {
            method: "POST",
            body: a,
            headers: i
        });
        x(s);
        const c = s?.taskid, l = s?.info;
        if (0 === s?.errno && "number" == typeof c) return c;
        if (12 === s?.errno && Array.isArray(l)) {
            const t = new Set(e);
            for (let e of l) {
                let o = e?.path, n = e?.errno;
                -9 === n && t.delete(o);
            }
            const o = Array.from(t);
            if (!o.length) return;
            return Z(o);
        }
        return K(s, r), 0;
    } catch (t) {
        return console.error("删除文件错误,5秒后重试."), console.error(t), await new Promise((e => {
            setTimeout(e, 5e3);
        })), Z(e);
    }
}

const $ = "https://pan.baidu.com/api/filemanager";

function ee(e, t) {
    for (var o = [], n = 0; n < e.length; n += t) o.push(e.slice(n, n + t));
    return o;
}

async function te(e) {
    const t = await Z(e);
    t && (console.log("获取到删除的任务id", t), await X(t), console.log("删除文件成功", e));
}

p.default.on("unhandledRejection", (e => {
    throw e;
})), exports.deletefiles = async function e(o) {
    if (!o.length) return;
    if (o.length > 1600) {
        const t = ee(o, 1600);
        for (let o of t) await e(o);
    }
    const n = await async function(e) {
        const o = Array.from(new Set(e.map((e => t.posix.dirname(e)))));
        console.log("获取文件信息", o);
        const n = (await Promise.all(o.map((async e => (await Y(e)).filter((e => !e.isdir)).map((e => e.path)))))).flat();
        return e.filter((e => n.includes(e)));
    }(o);
    console.log("需要删除的文件", n), n.length ? await async function(e) {
        if (!e.length) return;
        const t = ee(e, 200);
        for (let e of t) await te(e);
    }(n) : console.log("没有需要删除的文件");
}, exports.fetchdeletetaskid = Z, exports.initPANENV = D, exports.listdirpage = I, 
exports.listonedir = Y, exports.taskquerydeleteonce = B, exports.taskquerydeletepoll = X;
//# sourceMappingURL=index.cjs.map
