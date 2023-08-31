import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {
    completeTodoFetch,
    deleteTodoFetch,
    editTodoFetch, editTodoTextFetch,
} from "../../../store/todos/todosSlice";
import '../../../styles/index.css'
import {titleValidationSchema} from "../../../modules/ValidationModule/validationModule";
import {toast, ToastContainer} from "react-toastify";
import {Button, Card, CardContent, Checkbox, Input, Typography} from "@mui/material";
import { MdDelete, MdCancel } from "react-icons/md"
import { AiFillEdit } from "react-icons/ai"
import { BsFillCheckSquareFill } from "react-icons/bs"
import {useTranslation} from "react-i18next";

const Todo = ({ todo }) => {
    const dispatch = useDispatch()

    const [editingTitle, setEditedTitle] = useState(todo.title)

    const [editingText, setEditedText] = useState(todo.text)

    const [isEditing, setIsEditing] = useState(false)

    const { t } = useTranslation()


    const handleDelete = useCallback(async () => {
        try {
            await dispatch(deleteTodoFetch(todo.id))
        } catch (error) {
            console.log(error)
        }
    }, [dispatch, todo.id])

    const handleEditClick = useCallback(() => {
        setIsEditing(true)
    }, [])

    const handleSaveClick = async () => {
        try {
            await titleValidationSchema.validate({ title: editingTitle ,  text: editingText })
            dispatch(editTodoFetch({ id: todo.id, title: editingTitle }))
            dispatch(editTodoTextFetch({id: todo.id, text: editingText}))
            setIsEditing(false)
        } catch (error) {
            if (error.name === "ValidationError") {
                toast.error(error.errors[0])
                console.log(error)
            } else {
                console.log(error)
            }
        }
    }

    const handleCancelClick = () => {
        setEditedTitle(todo.title)
        setIsEditing(false)
    }

    const onChangeTitle = useCallback((event) => {
        setEditedTitle(event.target.value)
    }, [])

    const onChangeText = useCallback((event) => {
        setEditedText(event.target.value)
    }, [])

    const handleCheckboxChange = useCallback(async () => {
            await dispatch(completeTodoFetch(todo));
    }, [dispatch, todo]);

    const priorityStyles = {
        1: { backgroundColor: '#61B165FF' },
        2: { backgroundColor: '#FFFB09FF' },
        3: { backgroundColor: '#D53B30FF' },
    };

    const cardStyle = {
        ...priorityStyles[todo.priority],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
            borderRadius: '8px',
        transition: 'background-color 0.3s ease',
        gap: '5px'
    }

    const buttonStyle = {
        color: 'black',
        border: '1px solid black',
        borderRadius: '8px',
        fontSize: '0.8rem',
        padding: '5px'
    }


    return (
        <div className="todosLi" >
            <Card sx={{ minWidth: "30%" }}>
                <CardContent style={cardStyle} >
                    <Checkbox
                        onChange={handleCheckboxChange}
                        checked={todo.isCompleted}
                    />
                    {isEditing ? (
                        <>
                            <Input
                                type="text"
                                value={editingTitle}
                                onChange={onChangeTitle}
                            />
                            <Input
                                value={editingText}
                                onChange={onChangeText}
                                maxRows={3}
                                multiline
                            />
                            <Button style={buttonStyle} variant="outlined" startIcon={<BsFillCheckSquareFill />} onClick={handleSaveClick}>{t('saveButton')}</Button>
                            <Button style={buttonStyle} variant="outlined" startIcon={<MdCancel />} onClick={handleCancelClick}>{t('cancelButton')}</Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h5" component="div">{todo.title}</Typography>
                            <Typography variant="body2">{todo.text}</Typography>
                            <Button style={buttonStyle} variant="outlined" startIcon={<AiFillEdit />} onClick={handleEditClick}>{t('editButton')}</Button>
                            <Button style={buttonStyle} variant="outlined" startIcon={<MdDelete />} onClick={handleDelete}>{t('deleteButton')}</Button>
                        </>
                    )}
                </CardContent>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            </Card>
        </div>

    );
};

export default Todo;