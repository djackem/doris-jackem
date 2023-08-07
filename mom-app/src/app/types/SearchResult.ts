import { Item } from "./item";
export interface SearchResult {
    url: string;
    params: any; 
    text: string;
    desc: string | undefined;
    item: Item | undefined;
}