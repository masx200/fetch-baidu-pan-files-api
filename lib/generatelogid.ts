//https://pan.baidu.com/box-static/disk-system/js/prefetch.js?t=1582036131654
import btoa from "btoa";
const d = btoa;
const r = String.fromCharCode;
// const n =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/~！@#￥%……&";
const a = function(e: string) {
    if (e.length < 2) {
        var t = e.charCodeAt(0);
        return 128 > t
            ? e
            : 2048 > t
            ? r(192 | (t >>> 6)) + r(128 | (63 & t))
            : r(224 | ((t >>> 12) & 15)) +
              r(128 | ((t >>> 6) & 63)) +
              r(128 | (63 & t));
    } else {
        let t =
            65536 +
            1024 * (e.charCodeAt(0) - 55296) +
            (e.charCodeAt(1) - 56320);
        return (
            r(240 | ((t >>> 18) & 7)) +
            r(128 | ((t >>> 12) & 63)) +
            r(128 | ((t >>> 6) & 63)) +
            r(128 | (63 & t))
        );
    }
};
const o = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
// const d = function(e) {
//     return e.replace(/[\s\S]{1,3}/g, i);
// };
const l = function() {
    return d(c(new Date().getTime()));
};
// const i = function(e) {
//     var t = [0, 2, 1][e.length % 3],
//         r =
//             (e.charCodeAt(0) << 16) |
//             ((e.length > 1 ? e.charCodeAt(1) : 0) << 8) |
//             (e.length > 2 ? e.charCodeAt(2) : 0),
//         a = [
//             n.charAt(r >>> 18),
//             n.charAt((r >>> 12) & 63),
//             t >= 2 ? "=" : n.charAt((r >>> 6) & 63),
//             t >= 1 ? "=" : n.charAt(63 & r)
//         ];
//     return a.join("");
// };
const c = function(e: number) {
    return (String(e) + "" + Math.random()).replace(o, a);
};
export function generatelogid() {
    return l();
}
