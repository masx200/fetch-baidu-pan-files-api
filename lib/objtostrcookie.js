import cookie from "cookie";
export function objtostrcookie(panobj) {
    return Object.entries(panobj)
        .map(([key, value]) => {
            return cookie.serialize(key, String(value));
        })
        .join(";");
}
