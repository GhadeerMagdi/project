import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Head from 'next/head';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Basemicrosite</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
      <Navbar />
      < Component {...pageProps } />
      <Footer/>
      </SessionProvider>
    </>
  ) 
}