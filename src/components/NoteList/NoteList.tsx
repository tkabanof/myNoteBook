import React, { useCallback, useEffect, useRef, useState} from 'react';
import {AgGridReact} from "ag-grid-react";
import styles from "./NoteList.module.css"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { $notesFiltered} from "../../store/app.store";
import {useStore} from "effector-react";
import {ColDef} from "ag-grid-community/dist/lib/entities/colDef";
import {Note, NoteListItem} from "../../store/types/notes";
import {ICellRendererParams} from "ag-grid-community";
import TableTags from "../TableTags/TableTags";
import TableActions from "../TableActions/TableActions";
import {useWindowDimensions} from "../../hooks/useDimensions";

const columnDefs: ColDef<NoteListItem>[] = [
    { field: "title", headerName: "Title" },
    { field: "tags", headerName: "Tags", cellRenderer: (params: ICellRendererParams<Note, Note["tags"] >)=>{
            return <TableTags tags={params.value ?? undefined} />
        }},
    { field: "id", headerName: 'Actions', cellRenderer: (params: ICellRendererParams<Note, Note["id"] >)=>{
            return <TableActions id={params.value ?? ""} />
        }},
];


const NoteList = () => {
    const {width}= useWindowDimensions()
    const [isLoaded, setIsLoaded] =useState(false);
    const gridRef = useRef<AgGridReact<NoteListItem>>(null);
    const notes = useStore($notesFiltered);
    const notesList = notes.map(({tags, title, id})=>{
        return {tags, title, id}
    })

    const onFirstDataRendered = useCallback(() => {
        gridRef.current && gridRef.current.api.sizeColumnsToFit();
        setIsLoaded(true)
    }, []);


    useEffect(() => {
        gridRef.current && isLoaded && gridRef.current.api.sizeColumnsToFit();
    }, [width]);
    return (
        <div className={["ag-theme-alpine", styles["wrapper"]].join(" ")} >
            <AgGridReact ref={gridRef} onFirstDataRendered={onFirstDataRendered} rowData={notesList} columnDefs={columnDefs}/>
        </div>
    );
};

export default NoteList;