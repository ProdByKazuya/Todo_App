import React from 'react';
import {SHeaderTop} from "./styled";
import {useTranslation} from "react-i18next";
import {Typography} from "@mui/material";

const HeaderTop = () => {

    const { t } = useTranslation()


    return (
        <SHeaderTop.Container>
            <Typography variant="h2">{t('appTitle')}</Typography>
        </SHeaderTop.Container>
    );
};

export default HeaderTop;