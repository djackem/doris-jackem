export interface Item {
    id?: number;
    name: string;
    category: string;
    desc: string;
    img: string;
    imgs? : string[];
    dimensions?: string;
    links?: {[key: string]: string};
    note?: string;
    extra?: string;
}