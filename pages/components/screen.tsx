import type { NextPage } from 'next';
import Head from 'next/head';
import ThreeDWorld from '../../canvas/world';

const Screen: NextPage = () => {
  return (
    <div className="w-full h-screen">
      <Head>
        <title>X-Plore World</title>
        <meta name="description" content="A simple 3D world using Next.js and Three.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-full">
        <ThreeDWorld />
      </main>
    </div>
  );
};

export default Screen;
