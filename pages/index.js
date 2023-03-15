import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";
import Header from '../components/common/Header/Header.js';
import Footer from '../components/common/Footer.js';
import Announcements from '../components/home/Announcements.js';

export default function Home({ lcdLogoUrl }) {
  return (
    <div className='w-full'>
      <Header lcdLogoUrl={lcdLogoUrl} />
      <div className='h-screen md:h-screen bg-hero bg-cover bg-center bg-top text-center'>
        <div className='text-white text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-extrabold max-w-6xl mx-auto my-auto pt-90pcnt md:pt-30pcnt px-6'>
          Dedicated to building a legal community in which all lawyers can thrive and succeed.
        </div>
        <button className='bg-yellow-300 mt-12 p-3 rounded-md'>
          <a className='text-black font-bold' href='/about'>
            <span>
              Click to learn more
            </span>
          </a>
        </button>
      </div>
      <div className='bg-white'>
        <Announcements />
      </div>
      <div className='bg-slate-900'>
        hi
      </div>
      <Footer />
    </div>
  )
}

export async function getStaticProps(){
  const GET_HOME_INFO = gql`
    query GetHomeInfo {
      mediaItemBy(id: "cG9zdDoyMzU=") {
        sourceUrl
      }
    }
  `

  const response = await client.query({
    query: GET_HOME_INFO,
    context: {
      fetchOptions: {
        next:{ revalidate: 20 },
      },
    },
  });

  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;

  return {
    props: {
      lcdLogoUrl
    }
  }
}
