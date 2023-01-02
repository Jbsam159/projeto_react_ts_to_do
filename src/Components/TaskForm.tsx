import React, { useState, ChangeEvent, FormEvent, useEffect } from "react"

//__CSS__//
import styles from "./TaskForm.module.css"

//__Interfaces__//
import { ITask } from "../Interfaces/Task"

type Props = {

    btnText: string,
    taskList: ITask[],
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>,
    task?: ITask | null,
    handleUpdate?(id: number, title: string, difficulty: number): void

}

const TaskForm = ({ btnText, taskList, setTaskList, task, handleUpdate }: Props) => {

    const [id, setId] = useState<number>(0)
    const [title, setTitle] = useState<string>("")
    const [difficulty, setDifficulty] = useState<number>(0)

    useEffect(() => {

        if (task) {

            setId(task.id)
            setTitle(task.title)
            setDifficulty(task.difficulty)

        }

    }, [task])

    const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if (handleUpdate) {

            handleUpdate(id, title, difficulty)

        } else {

            const id = Math.floor(Math.random() * 1000)
            const newTask: ITask = { id, title, difficulty }

            setTaskList!([...taskList, newTask])

            setTitle("")
            setDifficulty(0)

        }

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === "title") {

            setTitle(e.target.value)

        } else {

            setDifficulty(parseInt(e.target.value))

        }

    }

    return (

        <form onSubmit={addTaskHandler} className={styles.form}>

            <div className={styles.inputContainer}>

                <label htmlFor="title">Título</label>
                <input onChange={handleChange} value={title} type="text" name="title" placeholder="Título da Tarefe" />

            </div>

            <div className={styles.inputContainer}>

                <label htmlFor="difficulty">Dificuldade</label>
                <input onChange={handleChange} value={difficulty} type="number" name="difficulty" placeholder="Dificuldade da Tarefe" />

            </div>

            <input type="submit" value={btnText} />

        </form>

    )

}

export default TaskForm