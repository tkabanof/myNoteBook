import React from 'react';
import { Form, FormInstance, Input} from "antd";
import {Note} from "../../store/types/notes";
import {FormProps} from "rc-field-form/lib/Form";
import NoteFormTags from "./NoteFormTags/NoteFormTags";

type NoteFormProps = Pick<FormProps<Note>, "onFinish"> & {
    form: FormInstance<Note>
}
const NoteForm = ({onFinish, form}:NoteFormProps) => {
    return (
        <Form<Note>
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item hidden name={"id"}>
                <Input type={"hidden"}/>
            </Form.Item>
            <Form.Item<Note>
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input your note title!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<Note>
                label="Text"
                name="value"
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item label="Tags" name = "tags">
                <NoteFormTags />
            </Form.Item>

        </Form>
    );
};

export default NoteForm;