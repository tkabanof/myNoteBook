import {createEffect, createEvent, createStore, sample} from "effector";
import {Note, Notes} from "./types/notes";
import {isNotes} from "./types/typeguards/isNotes";

export const createNote = createEvent<Note>()
export const updateNote = createEvent<Note>()
export const deleteNote = createEvent<Note["id"]>();
export const openNote = createEvent<Note["id"]>();
export const resetEditNote = createEvent();


const saveNotes = createEffect<Notes, void, void>((params)=>{
    localStorage.setItem("notes", JSON.stringify(params));
});

export const loadNotesFx = createEffect<void, Notes, void>(async ()=>{
    const notesRaw = localStorage.getItem('notes');
    const notes: unknown = JSON.parse(notesRaw ?? '');
    if (isNotes(notes)) {
        // loadNotes(notes)
        return notes
    }
    return []
});
export const $notes = createStore<Notes>([{
    tags: ["tag1"], title: "My first Note", value: "blablabla", id: new Date().toISOString()
}]);

export const $editingNote = createStore<Note | null>(null);
sample({
    clock: openNote,
    source: $notes,
    fn: (sourceData, clockData)=>{
        return sourceData.find((note)=>{return note.id === clockData}) ?? null
    },
    target: $editingNote
});

sample({
    source: $notes,
    target: saveNotes
})

$editingNote.on(resetEditNote, ()=>{
    return null
})
$notes.on(createNote, (state, payload)=>{
    return [payload].concat(state);
})
$notes.on(loadNotesFx.doneData, (state, payload)=>{
    return payload;
})
$notes.on(deleteNote, (state, payload)=>{
    return state.filter((note)=>{
        return note.id !== payload
    });
})
$notes.on(updateNote, (state, payload)=>{
    return state.map((note)=>{
        if (payload.id === note.id) {
            return payload
        }
        return note
    });
})



