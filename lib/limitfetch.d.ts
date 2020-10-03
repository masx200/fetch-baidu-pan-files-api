declare const limitedfetch: (url: string, opt?: RequestInit) => Promise<Response>;
export { limitedfetch as fetch };
export declare function fetchresjson(url: string, opt?: RequestInit): Promise<any>;
