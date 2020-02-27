import cookie from "cookie";
export function objtostrcookie(panobj: Record<string, string>) {
    return Object.entries(panobj)
        .map(([key, value]) => {
            return cookie.serialize(key, String(value));
        })
        .join(";");
}
