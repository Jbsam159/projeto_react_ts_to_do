import React from 'react'

//__Interface__//
import { ITask } from "../Interfaces/Task"

//__CSS__//
import styles from "./TaskList.module.css"

type Props = {

    taskList: ITask[];
    handleDelete(id: number): void
    handleEdit(task: ITask): void

}

const TaskList = ({ taskList, handleDelete, handleEdit }: Props) => {

    return (

        <>

            {taskList.length > 0 ? (

                taskList.map((task) => (

                    <div key={task.id} className={styles.task}>

                        <div className={styles.details}>

                            <h4><p>{task.title}</p></h4>
                            <p>Dificuldade da Tarefa:{task.difficulty}</p>

                        </div>

                        <div className={styles.actions}>

                            <i onClick={() => { handleEdit(task) }} className="bi bi-pencil"></i>
                            <i onClick={() => { handleDelete(task.id); }} className="bi bi-trash"></i>

                        </div>

                    </div>

                ))

            ) : (

                <p>Não há tarefas cadastradas</p>

            )}

        </>

    )

}

export default TaskList