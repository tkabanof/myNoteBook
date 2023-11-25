import {Notes} from "../notes";
import {isNote} from "./isNote";

export const isNotes = (values: unknown): values is Notes=>{
    return Array.isArray(values) && values.every(isNote);
}