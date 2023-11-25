import React, {useEffect} from 'react';
import styles from "./Filter.module.css";
import Search from "antd/es/input/Search";
import {Select} from "antd";
import {useStore} from "effector-react";
import {$tags, searchTitle, selectTags} from "../../store/app.store";
const Filter = () => {
    const tags = useStore($tags);
    const options = tags.map((tag)=>{
        return {
            label: tag,
            value: tag
        }
    })

    useEffect(() => {
        return ()=>{
            searchTitle(null)
            selectTags([])
        }
    }, []);
    return (
        <div className={styles["container"]}>
            <Search placeholder="input search text" onSearch={(value)=>{
                searchTitle(value)
            }} />
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={[]}
                onChange={(value, option)=>{
                    if (Array.isArray(option)) {
                        selectTags(option.map((o)=>{
                            return o.value
                        }))
                        return
                    }
                    selectTags([option.value])

                }}
                options={options}
            />
        </div>
    );
};

export default Filter;