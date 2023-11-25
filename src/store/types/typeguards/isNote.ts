import {Note} from "../notes";

export const isNote = (value: unknown): value is Note=>{
    return typeof value === "object" && value !== null
        && "id" in value && typeof value["id"] === "string"
        && "title" in value && typeof value["title"] === "string"
        && "tags" in value && Array.isArray(value["tags"]);
}