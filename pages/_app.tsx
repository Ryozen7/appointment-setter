import Layout from '../components/layout';
import Head from 'next/head';
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import '../styles/globals.css';

function AppointmentSetter({ Component, pageProps } : any) {
  return (
    <>
      <Head>
        <title>Appointment Setter</title>
        <meta name="description" content="This is a sample task for creating and saving user into JSON file." />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout className="h-screen w-screen font-sans">
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default AppointmentSetter
