import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";

const SelectRange = ({ value, onChange }) => {
    const { t } = useTranslation()


    return (
        <FormControl>
            <InputLabel>{t('todoPriority')}</InputLabel>
            <Select value={value} onChange={onChange}>
                <MenuItem value="3">{t('todoUrgent')}</MenuItem>
                <MenuItem value="2">{t('todoDesirable')}</MenuItem>
                <MenuItem value="1">{t('todoNotIsUrgent')}</MenuItem>
            </Select>
        </FormControl>
    );
};

export default SelectRange;