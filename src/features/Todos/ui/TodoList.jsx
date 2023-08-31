import React from 'react';
import {useSelector} from "react-redux";
import { selectTodoList } from "../../../store/todos/todosSelector";
import Todo from "./Todo";
import "../../../styles/index.css"
import {Typography} from "@mui/material";



const TodoList = () => {
    const todoList = useSelector(selectTodoList)

    return (
        <div>
            <ul className="TodoUl">
                {todoList?.length ? todoList.map((todo) => (
                    <>
                        <Todo
                            todo={todo}
                            key={todo.id}
                        />
                    </>

                )) : (
                    <Typography style={{
                        textAlign: "center"
                    }}>No more tasks</Typography>
                )}
            </ul>
        </div>
    );
};

export default TodoList;