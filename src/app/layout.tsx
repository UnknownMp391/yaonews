import type { Metadata } from "next"

import "./globals.scss"
import styles from './layout.module.scss'
import Link from "next/link";
import Head from "next/head";

export const metadata: Metadata = {
  title: "妖灵日报",
  description: "妖灵日报"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
            <div className={styles.title}>妖灵日报</div>
            <Link href="/"><div className={styles.titleLabel}>
              日刊
            </div></Link>
            <Link href="/week-news"><div className={styles.titleLabel}>
              周刊
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
