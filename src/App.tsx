import { useState } from "react"

//__CSS__//
import styles from "./App.module.css"

//__Components__//
import Footer from './Components/Footer';
import Header from './Components/Header';
import Modal from "./Components/Modal";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";

//__Interfaces__//
import { ITask } from "./Interfaces/Task"

function App() {

  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  // Remoção de Task
  const deleteTask = (id: number) => {

    setTaskList(taskList.filter(task => {

      return task.id !== id

    }))

  }

  // Edição de Task
  const editTask = (task: ITask): void => {

    hideOrShowModal(true)
    setTaskToUpdate(task)

  }

  // Esconder ou mostrar Modal
  const hideOrShowModal = (display: boolean) => {

    const modal = document.querySelector("#modal")

    if (display) {

      modal!.classList.remove("hide")

    } else {

      modal!.classList.add("hide")

    }

  }

  const updateTask = (id: number, title: string, difficulty: number) => {

    const updatedTask: ITask = { id, title, difficulty }

    const updatedItems = taskList.map((task) => {

      return task.id === updatedTask.id ? updatedTask : task

    })

    setTaskList(updatedItems)

    hideOrShowModal(false)

  }

  return (

    <div className="App">

      <Modal children={<TaskForm btnText="Editar Tarefa" taskList={taskList} task={taskToUpdate} handleUpdate={updateTask} />} />

      <Header />

      <main className={styles.main}>

        <div>

          <h2>O que você vai fazer</h2>

          <TaskForm

            btnText="Criar Tarefa"
            taskList={taskList}
            setTaskList={setTaskList}

          />

        </div>

        <div>

          <h2>Suas Tarefas</h2>
          <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask} />

        </div>

      </main>

      <Footer />

    </div >

  );

}

export default App;
