import React from 'react';
import {Space, Tag} from "antd";
import {Note} from "../../store/types/notes";

type TableTagsProps = {
    tags?: Note["tags"];
}
const TableTags = ({tags}: TableTagsProps) => {
    return (
        <Space size={[0, 8]} wrap>
            {Array.isArray(tags) && tags.map((tag, idx)=>{
                return <Tag key={idx}>{tag}</Tag>
            })}
        </Space>
    );
};

export default TableTags;