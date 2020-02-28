declare function removeobjrepetition(arr: {
    path: string;
    [key: string]: any;
}[]): {
    [key: string]: any;
    path: string;
}[];
