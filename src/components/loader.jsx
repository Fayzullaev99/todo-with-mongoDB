import styles from './components.module.scss'

function Loader() {
  return (
    <div className={styles.loader}>
        <span className={styles.loader__spinner}></span>
    </div>
  )
}

export default Loader