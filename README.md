# fetch-baidu-pan-files-api

# 获取 `bduss` 的方法

http://tool.cccyun.cc/tool/bduss/index3.html

# 功能说明

这个代码库是`百度网盘批量清理重复文件计划`的一部分。

模拟浏览器脚本操作,使用 `nodejs` 来批量读取和操作网盘文件信息

获取目录的文件信息,模拟浏览器的脚本操作来发送网络请求

还提供了直接获取指定目录下的所有文件信息的功能,若遇到网络错误自动重试

还提供了直接删除指定的批量文件的功能,多次尝试,判断要删除的文件是否存在

网盘对于每次删除操作的文件数有限制,故只能拆分多次尝试删除,轮询任务完成状态

# 百度网盘批量清理重复文件计划

https://github.com/masx200/baidu-pan-delete-repeated-files

https://github.com/masx200/fetch-baidu-pan-files-api

https://github.com/masx200/fetch-file-list-to-mongodb

https://github.com/masx200/mongodb-file-find-md5-repeat

# 使用方法

## 安装模块

```shell

yarn add @masx200/fetch-baidu-pan-file


```

## 安装 `node_modules`

```shell
yarn install
```

## 编译脚本

```shell
yarn build
```

## 运行脚本

```shell
yarn start
```

# 使用前先获取 `cookie`

使用浏览器登陆百度网盘的网页版,并登陆

`https://pan.baidu.com/`

然后按`F12`打开浏览器的`devtools`

点击`network`页,选择监视`Doc`类型

然后刷新页面,点击下方的`home`一行,右键选择`copy`,`copy request headers`

获得如下内容

```txt
GET /disk/home HTTP/1.1

Cookie: BAIDUID=xxx; pan_login_way=xxx; PANWEB=xxx; BIDUPSID=xxx; PSTM=xxx; cflag=xxx; BDCLND=xxx; BDUSS=xxx; STOKEN=xxx; SCRC=xxx; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=xxx; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=xxx; PANPSC=xxx

```

提取出其中`Cookie:`后的内容为 `cookie`

![./sshot-2020-02-26-[13-50-52].png](sshot-2020-02-26-%5B13-50-52%5D.png)

## 使用前先保存 `cookie`,并解析 `cookie`

# 使用前先获取 `bdstoken`

使用浏览器登陆百度网盘的网页版,并登陆

`https://pan.baidu.com/`

点击右键菜单,点击查看页面源代码

然后搜索`bdstoken`

找到`locals.set('bdstoken', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');`

提取出 `"bdstoken"`之后的内容为`bdstoken`

![./sshot-2020-10-01-[15-53-29].png](sshot-2020-10-01-[15-53-29].png)

# 详细的网盘 API

https://github.com/masx200/fetch-baidu-pan-files-api/tree/master/api

# 直接获取指定目录下的所有文件信息,若遇到网络错误自动重试

```js
import { listonedir } from "@masx200/fetch-baidu-pan-files-api";
listonedir("/path/to/your/dir").then(console.log);
```

# 直接获取指定目录下的一页文件信息,若遇到网络错误自动重试,默认每页最多 1000 条

```js
import { listdirpage } from "@masx200/fetch-baidu-pan-files-api";
listdirpage("/path/to/your/dir", 1).then(console.log);
```

# 先判断要删除的文件是否存在,然后直接删除指定的批量文件,若遇到网络错误多次尝试,

```js
import { deletefiles } from "@masx200/fetch-baidu-pan-files-api";
deletefiles(["/path/to/your/file1", "/path/to/your/file2"]).then(console.log);
```

# 直接删除指定的批量文件,并获得任务的序号,若遇到网络错误多次尝试,

```js
import { fetchdeletetaskid } from "@masx200/fetch-baidu-pan-files-api";
fetchdeletetaskid(["/path/to/your/file1", "/path/to/your/file2"]).then(
    console.log
);
```

# 查询一次任务的进度,根据任务的序号,若遇到网络错误多次尝试,

```js
import { taskquerydeleteonce } from "@masx200/fetch-baidu-pan-files-api";
taskquerydeleteonce(278400522319194).then(console.log);
```

# 轮询查询任务的进度,根据任务的序号,直到任务成功为止,若遇到网络错误多次尝试,

```js
import { taskquerydeletepoll } from "@masx200/fetch-baidu-pan-files-api";
taskquerydeletepoll(278400522319194).then(console.log);
```
