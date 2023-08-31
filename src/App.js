import React from "react";
import Todos from "./features/Todos";
import './styles/index.css'
import './styles/reset.css'
import HeaderBottom from "./components/HeaderBottom/HeaderBottom";
import HeaderTop from "./components/HeaderTop/HeaderTop";
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import LangSwitcher from "./components/LangSwitcher/LangSwitcher";


const App = () => {
    const { t } = useTranslation()

    return (
            <div>
                <div>
                    <HeaderTop>
                    </HeaderTop>
                    <HeaderBottom>
                    </HeaderBottom>
                </div>
                <Todos/>
            </div>
    );
}
export default App;
