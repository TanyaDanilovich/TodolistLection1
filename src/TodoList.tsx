import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
//rsc
// typescript =>
// 1. Variable
// 2. Param of func
// 3. Return of func

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTodoListFilter: (nextFilterValue: FilterValuesType) => void
}

const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const tasksListItems = props.tasks.length
        ? <ul>{
            props.tasks.map((task) => {
                const removeTask = () => props.removeTask(task.id)
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                    props.changeTaskStatus(task.id, e.currentTarget.checked)

                return (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTaskStatus}
                        />
                        <span
                            className={task.isDone ? "task-done" : ""}>{task.title}</span>
                        <button onClick={removeTask}>x</button>
                    </li>
                )
            })}</ul>
        : <span>List is empty</span>

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onClickHandlerCreator = (filter: FilterValuesType) =>
        () => props.changeTodoListFilter(filter)


    const errorStyles = {fontWeight: "bold", color: "red"}
    const errorMessage = error
        ? <div style={errorStyles}>Please, enter task title</div>
        : null

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onKeyDown={onEnterAddTask}
                    onChange={setLocalTitle}
                    className={error ? "input-error" : ""}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            {tasksListItems}
            <div>
                <button
                    className={props.filter === "all" ? "btn-active" : ""}
                    onClick={onClickHandlerCreator("all")}>All
                </button>
                <button
                    className={props.filter === "active" ? "btn-active" : ""}
                    onClick={onClickHandlerCreator("active")}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "btn-active" : ""}
                    onClick={onClickHandlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;