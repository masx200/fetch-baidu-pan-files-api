import { gethomehtmlandupdatecookie } from "./gethomehtmlandupdatecookie.js";
export const homeurl = `https://pan.baidu.com/disk/home`;
export async function getbdstokenanduser(): Promise<string> {
    const homehtml = await gethomehtmlandupdatecookie();
    // console.log(homehtml);
    return parsehtmlstoken(homehtml);
}

/* bdstoken获取方式发生改变了 
2020年6月6日
*/
function parsehtmlstoken(html: string): string {
    // text=`initPrefetch('dd1601843e05e55609ed49d51dabba42', 'masx20');`
    const reg = /"bdstoken":"(.+)",/g;
    const RegExpExecArray = reg.exec(html);
    if (RegExpExecArray) {
        const [, bdstoken] = RegExpExecArray;
        // console.log([raw, bdstoken, user]);
        return bdstoken;
    }
    throw Error("failed parse bdstoken :" + html);
}
// fetch("https://pan.baidu.com/disk/home?", {
//   "headers": {
//     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//     "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
//     "cache-control": "max-age=0",
//     "sec-fetch-dest": "document",
//     "sec-fetch-mode": "navigate",
//     "sec-fetch-site": "same-origin",
//     "sec-fetch-user": "?1",
//     "upgrade-insecure-requests": "1",
//     "cookie": "BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582435770,1582439059,1582458059,1582507482; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582507482; PANPSC=17104741590485773119%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl4V4y6jLL5Rb3KGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG"
//   },
//   "referrer": "https://pan.baidu.com/disk/home?",
//   "referrerPolicy": "no-referrer-when-downgrade",
//   "body": null,
//   "method": "GET",
//   "mode": "cors"
// });
// /* GET /disk/home HTTP/1.1
// Host: pan.baidu.com
// Connection: keep-alive
// accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
// cache-control: max-age=0
// accept-language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
// upgrade-insecure-requests: 1
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.17 Safari/537.36 Edg/81.0.416.12
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: cors
// Sec-Fetch-Dest: empty
// Referer: https://pan.baidu.com/disk/home?
// Accept-Encoding: gzip, deflate, br
// Cookie: BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582435770,1582439059,1582458059,1582507482; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582508457; PANPSC=6808505982233591071%3AZdTG9lVgpnuetahVhw%2BA5lcS2d9ns3O5vd9dRSgT3onjD5%2FhM08MsSpPymoB8yIZOD8tuTtuXwKv%2FNj2q7IDPOKiycrkhrnWQjQ1mFHTd8V1tt%2Bk9Cane%2BomA%2FKeZTApdS8c7ndIzLEQUHeSSbUhhWzQAWXtbqM%2BhgUHpi7vcen7%2B0P3Gno3mFO4o7rVV8Q%2B7e7bgMsDOU6SsVZaqyA8TA%3D%3D */
