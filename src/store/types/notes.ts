export type Note = {
    id: string;
    title: string;
    value: string;
    tags: Array<string>
}
export type Notes = Note[];
export type NoteListItem = Pick<Note, "title" | "tags" | "id">;
