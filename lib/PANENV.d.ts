interface PANENV {
    logid: string;
    bdstoken: string;
    cookie: string;
}
export declare function initPANENV(): Promise<PANENV>;
export {};
