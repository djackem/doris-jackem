export interface Item {
    id: number;
    name: string;
    category: string;
    desc: string;
    img_src: string;
    imgs : string[] | undefined;
    links?: {[key: string]: string};
    note?: string;
    extra?: string;
}