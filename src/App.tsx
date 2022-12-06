import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";


//C - create (validation)
//R - read (pagination, sorting, filtration)
//U - update (validation)
//D - delete (validation)

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todoListTitle: string = "What to learn"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskId: string) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updatedTasks)
        console.log(tasks)
    }
    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    }


    const changeTodoListFilter = (nextFilterValue: FilterValuesType) => {
        setFilter(nextFilterValue)
    }
    const getFilteredTasks =
        (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
            switch (filter) {
                case "completed":
                    return tasks.filter(task => task.isDone)
                case "active":
                    return tasks.filter(task => !task.isDone)
                default:
                    return tasks
            }
        }
    return (
        <div className="App">
            <TodoList
                tasks={getFilteredTasks(tasks, filter)}
                title={todoListTitle}
                filter={filter}
                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
