import React from 'react';
import {useSelector} from "react-redux";
import {SHeaderBottom} from "./styled";
import {
    selectCompletedTasksCount,
    selectDesirableTasksCount,
    selectNotUrgentTasksCount,
    selectTotalTasksCount,
    selectUrgentTasksCount
} from "../../store/todos/todosSelector";
import {Typography} from "@mui/material";
import { PiSmileyXEyesFill, PiSmileyFill, PiSmileyMehFill ,PiCheckCircleFill, PiListDashesBold } from 'react-icons/pi'
import LangSwitcher from "../LangSwitcher/LangSwitcher";

const HeaderBottom = () => {
    const totalTasksCount = useSelector(selectTotalTasksCount);
    const completedTasksCount = useSelector(selectCompletedTasksCount);
    const urgentTasksCount = useSelector(selectUrgentTasksCount);
    const desirableTasksCount = useSelector(selectDesirableTasksCount);
    const notUrgentTasksCount = useSelector(selectNotUrgentTasksCount);

    return (
        <SHeaderBottom.Container>
            <Typography fontSize="32px" i variant="h5">
                <PiListDashesBold />{totalTasksCount}
            </Typography>
            <Typography fontSize="32px" variant="h5">
                <PiCheckCircleFill />{completedTasksCount}
            </Typography>
            <Typography fontSize="32px" variant="h5">
                <PiSmileyXEyesFill />{urgentTasksCount}
            </Typography>
            <Typography fontSize="32px" variant="h5">
                <PiSmileyMehFill />{desirableTasksCount}
            </Typography>
            <Typography fontSize="32px" variant="h5">
                <PiSmileyFill />{notUrgentTasksCount}
            </Typography>
            <div>
                <LangSwitcher />
            </div>
        </SHeaderBottom.Container>
    )
}
export default HeaderBottom;