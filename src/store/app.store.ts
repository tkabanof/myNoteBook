import {createEffect, createEvent, createStore, sample} from "effector";
import {Note, Notes} from "./types/notes";
import {isNotes} from "./types/typeguards/isNotes";

export const createNote = createEvent<Note>()
export const updateNote = createEvent<Note>()
export const deleteNote = createEvent<Note["id"]>();
export const openNote = createEvent<Note["id"]>();
export const resetEditNote = createEvent();

export const selectTags = createEvent<string[]>()
export const searchTitle = createEvent<string | null>()

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
export const $notesFiltered = createStore<Notes>([]);


export const $tags = $notes.map<string[]>((state, lastState)=>{
    const tags = state.reduce<string[]>((prev, curr)=>{
        return curr.tags.concat(prev)
    }, [])
    const distinctTags = new Set(tags)
    return Array.from(distinctTags);
})
export const $selectedTags = createStore<string[]>([]);
$selectedTags.on(selectTags, (state, payload)=>{
    return payload
})

export const $searchTitle = createStore<string | null>(null);
$searchTitle.on(searchTitle, (state, payload)=>{
    return payload
})
sample({
    source: {
        notes: $notes,
        searchTitle: $searchTitle
    },
    fn: (values)=>{
        if (values.searchTitle !== null) {
            return values.notes.filter((note)=>{
                // @ts-ignore
                return note.title.includes(values.searchTitle)
            })
        }
        return values.notes
    },
    target: $notesFiltered
})

sample({
    source: {
        notes: $notes,
        selectedTags: $selectedTags
    },
    fn: (values)=>{
        if (values.selectedTags.length > 0) {
            return values.notes.filter((note)=>{
                const noteTagsAndSearchTagsLength = note.tags.length + values.selectedTags.length;
                const distinctTagsLength = Array.from(new Set([...note.tags, ...values.selectedTags])).length
                return noteTagsAndSearchTagsLength !== distinctTagsLength;
            })
        }
        return values.notes
    },
    target: $notesFiltered
})

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



