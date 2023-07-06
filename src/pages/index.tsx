import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Parallax , ParallaxProvider  , useParallax} from 'react-scroll-parallax'
import styles from '@/styles/Home.module.css'
import Check from '@/Components/Check'




export default function Home() {
    

  return(
      <>
        <div className={styles.test}>

        </div>
        <ParallaxProvider>
          <Check/>
        </ParallaxProvider>
       <div className={styles.test}>

       </div>


      </>
  )
}
