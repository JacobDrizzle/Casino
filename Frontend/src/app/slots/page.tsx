import Head from "next/head";
import SlotMachine from "../Components/Slots/SlotMachine";
import Layout from "../Layout/Layout";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Slot Machine Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <SlotMachine />
      </Layout>
    </div>
  );
};

export default Home;
