function removeobjrepetition(
    arr: {
        path: string;
        [key: string]: any;
    }[]
) {
    const cache = new Map<
        string,
        {
            path: string;
            [key: string]: any;
        }
    >();
    arr.forEach((obj) => {
        cache.set(obj.path, obj);
    });
    return [...cache.values()];
}
