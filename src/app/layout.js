import { Inter } from 'next/font/google'
import './global.scss'
import styles from './page.module.scss'
import Image from 'next/image'
import logo from '../logo.svg'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Todo List',
  description: 'This project created by Sanjar',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className={styles.header}>
          <Image src={logo} alt='logo' width={22} height={36} className={styles.header__logo} />
          <p className={styles.header__text}>to<span>do</span></p>
        </header>
        {children}
        <footer></footer>
      </body>
    </html>
  )
}
