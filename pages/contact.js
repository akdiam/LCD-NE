import Head from 'next/head.js';
import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";

import Header from '../components/common/Header/Header.js';
import PageHeader from '../components/common/PageHeader.js';
import ContactForm from '../components/contact/ContactForm.js';
import Footer from '../components/common/Footer.js';
import { createCommonStaticProps } from '../util/getCommonStaticProps.js';

export default function ContactPage({ lcdLogoUrl, socials }) {
  return (
    <>
      <Head>
        <title>Contact - Lawyers Collaborative for Diversity (LCD)</title>
        <meta name="description" content="Contact Lawyers Collaborative for Diversity (LCD)." />
      </Head>
      <Header lcdLogoUrl={lcdLogoUrl} />
      <PageHeader 
        title='Interested in our mission?' 
        headerBackgroundImageClass='bg-contact'
        subtitle={'Reach out. Sign up.'}
        subtitleSize='text-3xl lg:text-7xl'
      />
      <ContactForm />
      <Footer socials={socials} />
    </>
  );
};

export const getStaticProps = createCommonStaticProps(async () => {
  const GET_CONTACT_PAGE_CONTENT = gql`
    query getContactPage {
      mediaItemBy(id: "cG9zdDoyMzU=") {
        sourceUrl
      }
    }
  `
  const response = await client.query({
    query: GET_CONTACT_PAGE_CONTENT,
  });
  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;

  return {
    props: {
      lcdLogoUrl,
    },
    revalidate: 120,
  }
});