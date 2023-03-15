import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";
import Header from '../components/common/Header/Header.js';
import Footer from '../components/common/Footer.js';

const createHtml = (htmlString) => {
  return {__html: htmlString};
}

export default function MembershipPage({ membershipPageContent, lcdLogoUrl }) {
  return (
    <div>
      <Header lcdLogoUrl={lcdLogoUrl} />
      <div className="max-w-screen-lg m-auto pt-20">
        <div className="m-4" dangerouslySetInnerHTML={createHtml(membershipPageContent)} />
      </div>
      <Footer />
    </div>
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
    query: GET_MEMBERSHIP_PAGE_CONTENT
  });
  const membershipPageContent = response?.data?.pages?.nodes[0]?.content;
  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;

  return {
    props: {
      membershipPageContent,
      lcdLogoUrl
    }
  }
}