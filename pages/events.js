import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";
import Header from '../components/common/Header/Header.js';
import PageHeader from '../components/common/PageHeader.js';
import EventList from '../components/events/EventList.js';
import Footer from '../components/common/Footer.js';
import { AnimatedHeader } from '../components/common/AnimatedHeader.js';

const createHtml = (htmlString) => {
  return {__html: htmlString};
}

export default function Events({ eventsContent, lcdLogoUrl, events }) {
  return (
    <div>
      <Header lcdLogoUrl={lcdLogoUrl} />
      <PageHeader name='Events' headerBackgroundImageClass='bg-events' />
      <div className="max-w-6xl m-auto py-20 px-6">
        <div className='grid gap-x-6 grid-cols-1 lg:grid-cols-5'>
          <div className='lg:col-span-3 lg:pr-10'>
            <div className="mb-4" dangerouslySetInnerHTML={createHtml(eventsContent)} />
          </div>
          <div className='lg:col-span-2'>
            <div className='font-bold text-3xl lg:text-4xl pb-6'>Upcoming Events</div>
            <div className='bg-lcdGray border border-slate-300 shadow-xl rounded-md h-96 lg:h-eventWidget overflow-auto'>
              <EventList events={events} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
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
      events(first: 100) {
        nodes {
          events {
            callToActionButtonText
            callToActionLink
            date
            endTime
            eventDescription
            eventLocation
            eventType
            fieldGroupName
            startTime
          }
          title
          slug
        }
      }
    }
  `

  const response = await client.query({
    query: GET_EVENTS_CONTENT,
  });
  const eventsContent = response?.data?.pages?.nodes[0]?.content;
  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;
  (response?.data?.events)
  const events = response?.data?.events?.nodes;

  return {
    props: {
      eventsContent,
      lcdLogoUrl,
      events,
    },
    revalidate: 20,
  }
}