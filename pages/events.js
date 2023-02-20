import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";
import Header from '../components/common/Header';

const createHtml = (htmlString) => {
  return {__html: htmlString};
}

export default function Events({ eventsContent, lcdLogoUrl }) {
  return (
    <div>
      <Header lcdLogoUrl={lcdLogoUrl} />
      <div className="max-w-screen-lg m-auto pt-20">
          <div className="m-4" dangerouslySetInnerHTML={createHtml(eventsContent)} />
      </div>  
    </div>
  );
};

export async function getStaticProps() {
  const GET_EVENTS_CONTENT = gql`
    query getEventsContent {
      pages(where: {title: "Events"}) {
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
    query: GET_EVENTS_CONTENT
  });
  const eventsContent = response?.data?.pages?.nodes[0]?.content;
  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;

  return {
    props: {
      eventsContent,
      lcdLogoUrl
    }
  }
}