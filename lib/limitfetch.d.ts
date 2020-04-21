declare const limitedfetch: (
    url: string,
    opt?: RequestInit | undefined
) => Promise<Response>;
export { limitedfetch as fetch };
