// pages/index.js
import Head from 'next/head';
import UploadVideo from '../components/UploadVideo';

export default function Home() {
  return (
    <div>
      <Head>
        <title>AI Video Editing SaaS</title>
        <meta name="description" content="AI-powered video editing SaaS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>AI-Powered Video Editing</h1>
        <UploadVideo />
      </main>

      <footer>
        <p>Powered by AI and Next.js</p>
      </footer>
    </div>
  );
}