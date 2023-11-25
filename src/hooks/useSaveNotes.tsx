import {useEffect} from "react";
import { loadNotesFx} from "../store/app.store";

export const useSaveNotes = ()=>{

    useEffect(()=>{
        loadNotesFx()

    },[]);
}
