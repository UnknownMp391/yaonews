import type { Metadata } from "next"

import "./globals.scss"
import styles from './layout.module.scss'
import Link from "next/link"
import Image from "next/image"
import favicon from './favicon.ico'

export const metadata: Metadata = {
  title: "妖灵日报",
  description: "妖灵日报"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh">
      <head>
        <link
          rel="stylesheet"
          href="https://assets.unknownmp.top/fonts/KNMaiyuan-Regular/result.css"
        />
      </head>
      <body>
        <header className={styles.header}>
          <div className={styles.headerContainer}>
            <Link href="/"><div className={styles.title}><Image className={styles.titleLogo} src={favicon} alt="Logo" height={32} />妖灵日报</div></Link>
            <Link href="/"><div className={styles.titleLabel}>
              日刊
            </div></Link>
            <Link href="/week-news"><div className={styles.titleLabel}>
              周刊
            </div></Link>
            <Link href="/me-post"><div className={styles.titleLabel}>
              投稿
            </div></Link>
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.mainContainer}>{children}</div>
        </main>
        <hr className={styles.footHr}/>
        <footer className={styles.footer}>
          <p>出品: 兰亭会馆</p>
          <p>网站制作: UnknownMp</p>
        </footer>
      </body>
    </html>
  )
}
