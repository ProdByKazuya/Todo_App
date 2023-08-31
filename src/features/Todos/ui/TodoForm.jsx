import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import { addTodoFetch, fetchTodos } from "../../../store/todos/todosSlice";
import '../../../styles/index.css'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SelectRange from "../../../components/SelectRange/SelectRange";
import {titleValidationSchema} from "../../../modules/ValidationModule/validationModule";
import {Button, TextField} from "@mui/material";
import {useTranslation} from "react-i18next";
const TodoForm = (callback, deps) => {
    const [ value, setValue ] = useState('')
    const [textValue, setTextValue] = useState('')
    const [priority, setPriority] = useState(1)
    const dispatch = useDispatch()

    const { t } = useTranslation()

    const onTitleChange = useCallback((event) => {
        setValue(event.target.value)
    }, [])

    const onTextChange = useCallback((event) => {
        setTextValue(event.target.value)
    })

    const handlePriorityChange = ((event) => {
        setPriority(parseInt(event.target.value, 10))
    })


    const onSubmit = async (event) => {
        event.preventDefault()

        const newTodo = {
            title: value,
            text: textValue,
            id: Date.now(),
            priority: priority,
            isCompleted: false
        }
        try {
            await titleValidationSchema.validate(newTodo)
            await dispatch(addTodoFetch(newTodo))
            await dispatch(fetchTodos())
            setValue('')
            setTextValue('')

        } catch (error) {
                if (error.name === "ValidationError") {
                    toast.error(error.errors[0])
                } else {
                    console.log(error)
                }
        }
    }

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);




    return (
        <div>
            <form
                style={{
                    display: 'flex',
                    justifyContent: "space-evenly"
                }}
                onSubmit={onSubmit} >
                <TextField
                    value={value}
                    onChange={onTitleChange}
                    variant="filled"
                    label={t('todoTitle')}
                />
                <TextField
                    value={textValue}
                    onChange={onTextChange}
                    variant="filled"
                    label={t('todoText')}
                    rows={3}
                />
                <SelectRange value={priority} onChange={handlePriorityChange} />
                <Button
                    variant="contained"
                    type={"submit"}
                >
                    {t('addButton')}
                </Button>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </form>
        </div>

    );
};

export default TodoForm;