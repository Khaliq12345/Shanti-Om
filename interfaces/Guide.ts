import { Travel } from "./Travel";

export interface Guide {
    title: string,
    body: string,
    cover: string,
    destination_id: number,
    travels: Travel[]
}