import btoa from "btoa";
const d = btoa;
const r = String.fromCharCode;
const a = function(e) {
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
const l = function() {
    return d(c(new Date().getTime()));
};
const c = function(e) {
    return (String(e) + "" + Math.random()).replace(o, a);
};
export function generatelogid() {
    return l();
}
