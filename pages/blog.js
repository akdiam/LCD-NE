import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";

import Header from '../components/common/Header/Header.js';
import PageHeader from "../components/common/PageHeader";
import Footer from "../components/common/Footer";

export default function Blog({ lcdLogoUrl }) {
  return (
    <div className="w-full">
      <Header lcdLogoUrl={lcdLogoUrl} />
      <PageHeader 
        title='Blog' 
        headerBackgroundImageClass='bg-contact'
        subtitle={'The latest from LCD'}
        subtitleSize='text-3xl lg:text-7xl'
      />
      <Footer />
    </div>
  )
}

export async function getStaticProps(){
  const GET_BLOG_INFO = gql`
    query GetBlogInfo {
      mediaItemBy(id: "cG9zdDoyMzU=") {
        sourceUrl
      }
    }
  `

  const response = await client.query({
    query: GET_BLOG_INFO,
  });

  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;

  return {
    props: {
      lcdLogoUrl,
    },
    revalidate: 20,
  }
}