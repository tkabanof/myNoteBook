import React, {useEffect, useState} from 'react';
import NoteList from "../components/NoteList/NoteList";
import styles from "./MainPage.module.css";
import {Button, Form, Modal} from "antd";
import NoteForm from "../components/NoteForm/NoteForm";
import {Note} from "../store/types/notes";
import {createNote} from "../store/app.store";
import {useSaveNotes} from "../hooks/useSaveNotes";

const MainPage = () => {
    useSaveNotes();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noteForm] = Form.useForm<Note>()

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        noteForm.resetFields()
    };

    const onNoteFormFinish = (values: Note)=>{
        createNote({...values, id: new Date().toUTCString()})
        handleCancel()
    }

    return (
        <>
            <Modal title="Creation new note"
                   open={isModalOpen}
                   footer={<Button onClick={()=>{
                       noteForm.submit()
                   }} type="primary" htmlType="submit">
                       Save
                   </Button>}
                   onCancel={handleCancel}
            >
                <NoteForm form={noteForm} onFinish={onNoteFormFinish} />
            </Modal>
            <div className={styles["container"]}>
                <Button type="primary" onClick={showModal}>
                    Create new Note!
                </Button>
                <NoteList />
            </div>
        </>
    );
};

export default MainPage;