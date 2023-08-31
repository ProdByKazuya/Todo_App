export const selectTodoList = (state) => state.todos.list

export const selectTotalTasksCount = state => state.todos.list.length;

export const selectCompletedTasksCount = state =>
    state.todos.list.filter(todo => todo.isCompleted).length;

export const selectUrgentTasksCount = state =>
    state.todos.list.filter(todo => todo.priority === 1).length;

export const selectDesirableTasksCount = state =>
    state.todos.list.filter(todo => todo.priority === 2).length;

export const selectNotUrgentTasksCount = state =>
    state.todos.list.filter(todo => todo.priority === 3).length;

// export const selectImportantTodoList = createSelector()