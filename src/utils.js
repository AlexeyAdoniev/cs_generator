import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

export async function getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
        dirents.map((dirent) => {
            const res = resolve(dir, dirent.name); //.split("\\\\img\\\\")[1];
            return dirent.isDirectory() ? getFiles(res) : res;
        })
    );

    return Array.prototype.concat(...files);
}

export const kebabify = (str) => str.toLowerCase().split(" ").join("-");
export function camelize(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");
}
