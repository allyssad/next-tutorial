import Link from 'next/link';
import Head from 'next/head';
// next/script simplifies loading third-party scripts
import Script from 'next/script';
import Layout from '../../components/layout';

const FirstPost = () => (
  <Layout>
    <Head>
      <title>First Post</title>
    </Head>
    <Script
      src='https://connect.facebook.net/en_US/sdk.js'
      // strategy controls when the third-party script should load
      // lazyOnload tells next to load this script lazily during browser idle time
      strategy='lazyOnload'
      // onLoad is used to run ay JS code immediately after the script has finished loading
      onLoad={() =>
        console.log(`script loaded correctly, window.FB has been populated`)
      }
    />
    <h1>First Post</h1>
    <h2>
      <Link href='/'>Back to home</Link>
    </h2>
  </Layout>
);
export default FirstPost;
