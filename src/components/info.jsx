import styles from './components.module.scss'

function Info({notes}) {
  return (
    <div className={styles.info}>
        <div className={styles.info__left}>
            <h3 className={styles.info__title}>Tasks created</h3>
            <p className={styles.info__count}>{notes.length}</p>
        </div>
        <div className={styles.info__left}>
            <h3 className={styles.info__title}>Completed</h3>
            <p className={styles.info__count}>{notes.filter((note)=>note.completed == true).length} / {notes.length}</p>
        </div>
    </div>
  )
}

export default Info