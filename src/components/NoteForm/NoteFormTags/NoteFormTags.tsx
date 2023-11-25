import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import {Form, Input, Space, Tag, Tooltip} from 'antd';
import {Note} from "../../../store/types/notes";

const NoteFormTags = () => {
    const form = Form.useFormInstance<Note>();
    const value:Note["tags"] = Array.isArray(form.getFieldValue("tags")) ? form.getFieldValue("tags") : [];
    const onChange = (value: Note["tags"])=>{
        form.setFieldValue("tags", value)
    }
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);
    const editInputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    useEffect(() => {
        editInputRef.current?.focus();
    }, [editInputValue]);

    const handleClose = (removedTag: string) => {
        const newTags = value.filter((tag) => tag !== removedTag);
        onChange(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && !value.includes(inputValue)) {
            onChange([...value, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditInputValue(e.target.value);
    };

    const handleEditInputConfirm = () => {
        const newTags = [...value];
        newTags[editInputIndex] = editInputValue;
        onChange(newTags);
        setEditInputIndex(-1);
        setEditInputValue('');
    };

    return (
        <Space size={[0, 8]} wrap>
            {value.map((tag, index) => {
                if (editInputIndex === index) {
                    return (
                        <Input
                            ref={editInputRef}
                            key={tag}
                            size="small"
                            value={editInputValue}
                            onChange={handleEditInputChange}
                            onBlur={handleEditInputConfirm}
                            onPressEnter={handleEditInputConfirm}
                        />
                    );
                }
                const isLongTag = tag.length > 20;
                const tagElem = (
                    <Tag
                        key={tag}
                        closable
                        style={{ userSelect: 'none' }}
                        onClose={() => handleClose(tag)}
                    >
            <span
                onDoubleClick={(e) => {
                    if (index !== 0) {
                        setEditInputIndex(index);
                        setEditInputValue(tag);
                        e.preventDefault();
                    }
                }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
                    </Tag>
                );
                return isLongTag ? (
                    <Tooltip title={tag} key={tag}>
                        {tagElem}
                    </Tooltip>
                ) : (
                    tagElem
                );
            })}
            {inputVisible ? (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            ) : (
                <Tag
                    icon={<PlusOutlined />} onClick={showInput}>
                    New Tag
                </Tag>
            )}
        </Space>
    );
};

export default NoteFormTags;