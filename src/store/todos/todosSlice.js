import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    try {
        const response = await axios.get("http://localhost:5000/todos")
        return response.data
    } catch (error) {
        return error
    }
})

export const addTodoFetch = createAsyncThunk( "todos/addTodoFetch" , async (newTodo) => {
    const response = await axios.post("http://localhost:5000/todos", newTodo)
    return response.data
})

export const deleteTodoFetch = createAsyncThunk("todos/deleteTodoFetch", async (todoId) => {
    await axios.delete(`http://localhost:5000/todos/${todoId}`)
    return todoId
})

export const completeTodoFetch = createAsyncThunk(
    "todos/completeTodoFetch",
    async (todo) => {
        const response = await axios.patch(
            `http://localhost:5000/todos/${todo.id}`,
            {
                isCompleted: !todo.isCompleted,
            }
        )
        return response.data
    }
)

export const editTodoFetch = createAsyncThunk(
    "todos/editTodoFetch",
    async (todo) => {
        const response = await axios.patch(
            `http://localhost:5000/todos/${todo.id}`,
            {
                title: todo.title
            }
        )
        return response.data
    }
)

export const editTodoTextFetch = createAsyncThunk(
    "todos/editTodoTextFetch",
    async (todo) => {
        const response = await axios.patch(
            `http://localhost:5000/todos/${todo.id}`,
            {
                text: todo.text
            }
        )
        return response.data
    }
)
export const priorityTodoFetch = createAsyncThunk(
    "todos/priorityTodoFetch",
    async (todo) => {
        const response = await axios.patch(
            `http://localhost:5000/todos/${todo.id}`,
            {
                priority: todo.priority
            }
        )
        return response.data
    }
)

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        list: [],
        loading: "",
        error: null
    },
    reducers: {
        addTodo: (state, action) => {
            state.list = [action.payload, ...state.list]
        },
        deleteTodo: (state, action) => {
            state.list = state.list.filter((todo) => todo.id !== action.payload)
        },
        completeTodo: (state, action) => {
            state.list = state.list.map((todo) => {
                if(todo.id === action.payload) {
                    return {
                        ...todo,
                        isCompleted: !todo.isCompleted
                    }
                }
                return todo
            })
        },
        editTodo: (state, action) => {
            const { id, title } = action.payload
            state.list = state.list.map(todo => (todo.id === id ? { ...todo, title } : todo))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
            state.loading = "TODOS_PENDING"
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = "TODOS_SUCCESS"
                state.list = action.payload
                state.error = null
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = "TODOS_FAILURE"
                state.error = action.error.message
            })
            .addCase(addTodoFetch.pending, (state) => {
                state.loading = "ADD_TODO_PENDING"
            })
            .addCase(addTodoFetch.fulfilled, (state, action) => {
                state.loading = "ADD_TODO_SUCCESS"
                state.list.push(action.payload)
                state.error = null
            })
            .addCase(addTodoFetch.rejected, (state, action) => {
                state.loading = "ADD_TODO_FAILURE"
                state.error = action.error.message
            })
            .addCase(deleteTodoFetch.pending, (state) => {
                state.loading = "DELETE_TODO_PENDING"
            })
            .addCase(deleteTodoFetch.fulfilled, (state, action) => {
                state.loading = "DELETE_TODO_SUCCESS"
                state.list = state.list.filter(todo => todo.id !== action.payload)
            })
            .addCase(deleteTodoFetch.rejected, (state, action) => {
                state.loading = "DELETE_TODO_FAILURE"
                state.error = action.error.message
            })
            .addCase(completeTodoFetch.pending, (state) => {
                state.loading = "COMPLETE_TODO_PENDING"
            })
            .addCase(completeTodoFetch.fulfilled, (state, action) => {
                state.loading = "COMPLETE_TODO_SUCCESS"
                state.list = state.list.map((todo) =>
                    todo.id === action.payload.id ? action.payload : todo
                )
            })
            .addCase(completeTodoFetch.rejected, (state, action) => {
                state.loading = "COMPLETE_TODO_FAILURE"
                state.error = action.error.message
            })
            .addCase(editTodoFetch.pending, (state) => {
                state.loading = "EDIT_TODO_PENDING"
            })
            .addCase(editTodoFetch.fulfilled, (state, action) => {
                state.loading = "EDIT_TODO_SUCCESS"
                const { id, title } = action.payload
                state.list = state.list.map((todo) =>
                    (todo.id === id ? { ...todo, title } : todo))
            })
            .addCase(editTodoFetch.rejected, (state, action) => {
                state.loading = "EDIT_TODO_FAILURE"
                state.error = action.error.message
            })
            .addCase(priorityTodoFetch.pending, (state) => {
                state.loading = "PRIORITY_TODO_PENDING"
            })
            .addCase(priorityTodoFetch.fulfilled, (state, action) => {
                state.loading = "PRIORITY_TODO_SUCCESS"
                const { id, priority } = action.payload
                state.list = state.list.map((todo) => (
                    (todo.id === id ? {...todo, priority} : todo))
                )
            })
            .addCase(priorityTodoFetch.rejected, (state, action) => {
                state.loading = "PRIORITY_TODO_FAILURE"
                state.error = "An error occurred while updating priority."
            })
            .addCase(editTodoTextFetch.pending, (state) => {
                state.loading = "EDIT_TEXT_PENDING"
            })
            .addCase(editTodoTextFetch.fulfilled, (state, action) => {
                state.loading = "EDIT_TEXT_SUCCESS"
                const { id, text } = action.payload
                state.list = state.list.map((todo) => (
                    (todo.id === id ? {...todo, text} : todo))
                )
            })
            .addCase(editTodoTextFetch.rejected, (state, action) => {
                state.loading = "EDIT_TEXT_FAILURE"
                state.error = action.error.message
            })
}
})

export const {
    addTodo,
    deleteTodo,
    completeTodo,
    editTodo
}   = todosSlice.actions

export default todosSlice.reducer
