import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';

import HamburgerMenu from '@/components/HamburgerMenu';
import NoSignal from '@/components/NoSignal';
import WaveTextCSS from '@/components/WaveTextCSS';
import ButtonFancy from '@/components/ButtonFancy';

const CursorCircle = dynamic(() => import('@/components/CursorCircle'), {
  ssr: false,
});

export default function Home() {
  return (
    <div
      className={`${styles.container} min-h-screen flex flex-col justify-center align-center`}
    >
      <Head>
        <title>prototype</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HamburgerMenu />
      <main
        className={`${styles.main} flex w-screen h-screen overflow-hidden absolute items-center justify-center`}
      >
        <NoSignal />
        <WaveTextCSS />
        <ButtonFancy
          buttonClassName="tracking-widest uppercase text-md transition duration-500 ease-in-out"
          className="pt-[300px]"
        >
          Click Me
        </ButtonFancy>
      </main>

      <footer
        className={`${styles.footer} w-full h-[50px] bg-black text-white px-[40px] flex align-center items-center justify-center uppercase`}
      >
        Powered by passion
      </footer>
      {/* <CursorCircle /> */}
    </div>
  );
}
