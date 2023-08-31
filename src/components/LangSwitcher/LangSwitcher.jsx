import React from 'react';
import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";

const LangSwitcher = () => {
    const { t, i18n } = useTranslation()

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
    }

    return (
        <div>
            <Button onClick={() => changeLanguage('en')}>EN</Button>
            <Button onClick={() => changeLanguage('ru')}>РУ</Button>
        </div>
    );
};

export default LangSwitcher;