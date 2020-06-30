declare const limitedfetch: (
    url: string,
    opt: RequestInit
) => Promise<Response>;
export { limitedfetch as fetch };
