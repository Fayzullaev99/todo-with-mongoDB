import Image from 'next/image'
import mark from '@/mark.svg'
import unmark from '@/unmark.svg'
import editIcon from '@/edit.svg'
import del from '@/delete.svg'
import styles from './components.module.scss'

function Todos({ handle, todos, }) {
    return (
        <div className={styles.todos}>
            {todos.map((todo) => (
                <div className={styles.todos__item} key={todo._id}>
                    <button className={styles.todos__mark} onClick={() => handle.checkTodo(todo)}>
                        <Image src={todo.completed ? mark : unmark} alt='mark' width={18} height={18} />
                    </button>
                    <p className={todo.completed ? styles.todos__text_active : styles.todos__text}>{todo.text}</p>
                    <div className={styles.todos__button}>
                        <button className={styles.todos__edit} onClick={() => handle.handleEdit(todo)}><Image src={editIcon} alt='edit' width={14} height={14} /></button>
                        <button className={styles.todos__delete} onClick={() => handle.deleteTodo(todo._id)}><Image src={del} alt='delete' width={14} height={14} /></button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Todos