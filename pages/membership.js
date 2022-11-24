import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";

const createHtml = (htmlString) => {
  return {__html: htmlString};
}

export default function MembershipPage({ membershipPageContent }) {
  return (
    <div className="max-w-screen-lg m-auto">
      <div dangerouslySetInnerHTML={createHtml(membershipPageContent)} />
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
    }
  `
  const response = await client.query({
    query: GET_MEMBERSHIP_PAGE_CONTENT
  });
  const membershipPageContent = response?.data?.pages?.nodes[0]?.content;

  return {
    props: {
      membershipPageContent
    }
  }
}