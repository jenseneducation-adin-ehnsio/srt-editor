import Image from 'next/image';
import Head from 'next/head';
import Layout from '../components/layout';

export default function edit() {
  return (
    <Layout>
      <Head>
        <title>Edit</title>
      </Head>
      <div className="edit">
        <h1>hej</h1>
        <Image src="/images/profile.jpg" height={144} width={144} alt="profile.jpg" />
      </div>
    </Layout>
  );
}
