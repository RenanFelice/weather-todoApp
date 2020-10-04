import React, { useState, useRef } from 'react'
import styles from './Todo.module.css'
import cx from 'classnames'
import { Tooltip } from '@material-ui/core'

function Todo({ todo, deleteTodo, editTodo }) {
    const [editing, setEditing] = useState(false)
    const [editText, setEditText] = useState(todo.task)
    const [deleting, setDeleting] = useState(false)
    const editInputEl = useRef(null)
    return (
        <>
            {editing ?
                <div className={styles.TodoContainer}>
                    <form onSubmit={e => {
                        e.preventDefault()
                        editTodo(todo.id, editText)
                        setEditing(false)
                    }}>
                        <input className={styles.editForm}
                            ref={editInputEl}
                            value={editText}
                            onChange={e => {
                                setEditText(e.target.value)
                            }}
                        ></input>
                    </form>
                    <div className={styles.iconsContainer}>
                        <div className={styles.confirmBtn}
                            onClick={e => {
                                editTodo(todo.id, editText)
                                setEditing(false)
                            }}>
                            <Tooltip placement='top' title="Confirmar">
                                <i className={cx("fas fa-check", styles.faCheck)}></i>
                            </Tooltip>
                        </div>
                        <div className={styles.cancelBtn}
                            onClick={e => {
                                setEditText(todo.task)
                                setEditing(false)
                            }}>
                            <Tooltip placement='top' title="Cancelar">
                                <i className={cx("fas fa-times", styles.faTimes)}></i>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                :
                <div className={cx(styles.TodoContainer, { [styles.lastTodo]: todo.last, [styles.animateLastTodo]: todo.last, [styles.deletingAn]: deleting })}>
                    <div className={styles.Todo}>
                        <div className={styles.TodoTask}>{todo.task}</div>
                    </div>
                    <div className={styles.iconsContainer}>
                        <div className={styles.editBtn}
                            onClick={async e => {
                                await setEditing(true)
                                editInputEl.current.focus()
                            }}>
                            <Tooltip placement='top' title="Editar">
                                <i className={cx("fas fa-pen", styles.faPen)}></i>
                            </Tooltip>
                        </div>
                        <div className={styles.deleteBtn}
                            onClick={e => {
                                setDeleting(true)
                                setTimeout(() => {
                                    deleteTodo(todo.id)
                                }, 300);
                            }}>
                            <Tooltip placement='top' title="Deletar">
                                <i className={cx("fas fa-trash", styles.faTrash)}></i>
                            </Tooltip>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default Todo




