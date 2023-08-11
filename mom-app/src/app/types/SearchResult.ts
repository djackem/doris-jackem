import { Item } from "./item";
export interface SearchResult {
    url: string;
    params: number | undefined; 
    text: string;
    desc: string | undefined;
    item: Item | undefined;
}