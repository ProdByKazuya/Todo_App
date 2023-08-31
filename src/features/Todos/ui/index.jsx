import React from 'react';
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import '../../../styles/index.css'


const Todos = () => {

    return (
        <div className="STodos" >
                <TodoForm />
            <div style={{
                width: '100%'
            }}>
                <TodoList />
            </div>

        </div>
    );
};

export default Todos;