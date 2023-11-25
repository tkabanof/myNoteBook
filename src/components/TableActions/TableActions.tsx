import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Popconfirm, Space} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {$editingNote, createNote, deleteNote, openNote, resetEditNote, updateNote} from "../../store/app.store";
import NoteForm from "../NoteForm/NoteForm";
import {Note} from "../../store/types/notes";
import {useStore} from "effector-react";

type TableActionsProps = {
    id: string
}
const TableActions = ({id}:TableActionsProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noteForm] = Form.useForm<Note>();
    const noteToEdit = useStore($editingNote);

    const handleCancel = () => {
        setIsModalOpen(false);
        noteForm.resetFields()
    };

    const onNoteFormFinish = (values: Note)=>{
        console.log(values)
        updateNote(values)
        setIsModalOpen(false);
        noteForm.resetFields()
    }

    const onOpenModal = ()=>{
        openNote(id);
    }

    useEffect(()=>{
        if (noteToEdit?.id === id) {
            noteForm.setFieldsValue(noteToEdit)
            setIsModalOpen(true)
        }
        return ()=>{
            resetEditNote()
        }
    },[noteToEdit])
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

        <Space>
            <Button onClick={onOpenModal} icon={<EditOutlined />}/>
            <Popconfirm
                title="Delete the note"
                description="Are you sure to delete this note?"
                onConfirm={()=>{
                    deleteNote(id)
                }}
                okText="Yes"
                cancelText="No"
            >
                <Button icon={<DeleteOutlined />}/>
            </Popconfirm>
        </Space>
        </>
    );
};

export default TableActions;