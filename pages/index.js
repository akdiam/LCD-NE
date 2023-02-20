import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";
import Header from '../components/common/Header';

export default function Home({ lcdLogoUrl }) {
  return (
    <div>
      <Header lcdLogoUrl={lcdLogoUrl} />
      <div className="slant box-border">
        <div className="mask-container">
          <div className="mask-background bg-slate-900" />
        </div>
        <div className="content-container flex relative bg-slate-900 text-white pt-8 md:pt-28 h-full">
          <div className="max-w-screen-lg m-auto text-center px-12">
            Dedicated to building a legal community in which all lawyers can thrive and succeed.
          </div>
        </div>
      </div>
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
    query: GET_HOME_INFO
  });

  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;

  return {
    props: {
      lcdLogoUrl
    }
  }
}
