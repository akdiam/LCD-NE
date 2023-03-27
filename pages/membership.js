import Head from 'next/head.js';
import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";

import Header from '../components/common/Header/Header.js';
import Footer from '../components/common/Footer.js';
import PageHeader from '../components/common/PageHeader.js';
import { createHtmlString } from '../util/wordpressUtil.js';

export default function MembershipPage({ membershipPageContent, lcdLogoUrl }) {
  return (
    <>
      <Head>
        <title>Membership - Lawyers Collaborative for Diversity</title>
        <meta name="description" content="Membership at Lawyers Collaborative for Diversity (LCD)." />
      </Head>
      <Header lcdLogoUrl={lcdLogoUrl} />
      <PageHeader 
        title='Membership' 
        subtitle='LCD welcomes new members who are looking to support diversity and inclusion in the legal profession.' 
        headerBackgroundImageClass='bg-membership'
        subtitleSize={'text-3xl lg:text-6xl'}
        maxWidth={'lg:max-w-3xl'}
      />
      <div className="max-w-6xl px-6 m-auto py-24">
        <div className="" dangerouslySetInnerHTML={createHtmlString(membershipPageContent)} />
      </div>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const GET_MEMBERSHIP_PAGE_CONTENT = gql`
    query getMembershipPage {
      pages(where: {title: "Membership"}) {
        nodes {
          content
        }
      }
      mediaItemBy(id: "cG9zdDoyMzU=") {
        sourceUrl
      }
    }
  `
  const response = await client.query({
    query: GET_MEMBERSHIP_PAGE_CONTENT,
  });
  const membershipPageContent = response?.data?.pages?.nodes[0]?.content;
  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;

  return {
    props: {
      membershipPageContent,
      lcdLogoUrl,
    },
    revalidate: 60,
  }
}