import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";
import Header from '../components/common/Header/Header.js';
import PageHeader from '../components/common/PageHeader.js';
import ContactForm from '../components/contact/ContactForm.js';
import Footer from '../components/common/Footer.js';

export default function ContactPage({ lcdLogoUrl }) {
  return (
    <div>
      <Header lcdLogoUrl={lcdLogoUrl} />
      <PageHeader name='Contact Us' />
      <ContactForm />
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const GET_CONTACT_PAGE_CONTENT = gql`
    query getContactPage {
      mediaItemBy(id: "cG9zdDoyMzU=") {
        sourceUrl
      }
    }
  `
  const response = await client.query({
    query: GET_CONTACT_PAGE_CONTENT
  });
  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;

  return {
    props: {
      lcdLogoUrl
    }
  }
}