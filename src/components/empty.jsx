import Image from 'next/image'
import empty from '@/empty.png'
import styles from './components.module.scss'

function Empty() {
  return (
    <div className={styles.empty}>
        <Image 
            src={empty} 
            alt='empty' 
            width={56} 
            height={56} 
            className={styles.empty__image} 
        />
        <div className={styles.empty__info}>
            <p>You don&apos;t have tasks registered yet</p>
            <p>Create tasks and organize your to-do items</p>
        </div>
    </div>
  )
}

export default Empty