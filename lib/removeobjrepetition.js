"use strict";
function removeobjrepetition(arr) {
    const cache = new Map();
    arr.forEach((obj) => {
        cache.set(obj.path, obj);
    });
    return [...cache.values()];
}
