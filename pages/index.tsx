import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import Link from 'next/link'
import Navigation from '@/components/navigation/navigation'

export default function Home() {
  return (
    <>
      <Head>
        <title>Zulu Vision</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='layout'>
        <section className={styles['home_bg_body']}>          
          <main >
            <div className={styles.hero_bg}>
              <div className={styles.dust}>
                <Link className="hero_area" href="/portfolio">
                  
                  <h1 className='text-zinc-50	lg:text-6xl text-2xl prose prose-stone'>欢迎 Zulu Vision 来到</h1>
                  <span className="hero_area__top"></span>
                  <span className="hero_area__right"></span>
                  <span className="hero_area__bottom"></span>
                  <span className="hero_area__left"></span>
                </Link>
              </div>
            </div>
          </main>
        </section>
      </div>
    </>
  )
}
