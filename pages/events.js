import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";

const createHtml = (htmlString) => {
  return {__html: htmlString};
}

export default function Events({ eventsContent }) {
  return (
    <div className="max-w-screen-lg m-auto">
      <div dangerouslySetInnerHTML={createHtml(eventsContent)} />
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
    }
  `
  const response = await client.query({
    query: GET_EVENTS_CONTENT
  });
  const eventsContent = response?.data?.pages?.nodes[0]?.content;

  return {
    props: {
      eventsContent
    }
  }
}