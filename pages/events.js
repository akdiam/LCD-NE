import Head from 'next/head.js';
import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";

import Header from '../components/common/Header/Header.js';
import PageHeader from '../components/common/PageHeader.js';
import EventList from '../components/events/EventList.js';
import Footer from '../components/common/Footer.js';
import { createHtmlString } from '../util/wordpressUtil.js';
import { createCommonStaticProps } from '../util/getCommonStaticProps.js';

export default function Events({ eventsContent, lcdLogoUrl, events, eventsHeader, socials }) {
  return (
    <>
      <Head>
        <title>Events - Lawyers Collaborative for Diversity</title>
        <meta name="description" content="Events for Lawyers Collaborative for Diversity (LCD)." />
      </Head>
      <Header lcdLogoUrl={lcdLogoUrl} />
      <PageHeader 
        title='Events' 
        subtitle={eventsHeader} 
        headerBackgroundImageClass='bg-events'
        subtitleSize={'text-3xl lg:text-5xl'} 
        maxWidth='lg:max-w-4xl'
      />
      <div className="max-w-7xl m-auto py-20 px-6">
        <div className='pb-12 lg:pl-12 lg:w-2/5 lg:pt-2 lg:float-right'>
          <div className='font-bold text-4xl lg:text-5xl pb-6 text-secondary-600'>Upcoming Events</div>
          <div className='bg-lcdGray border border-slate-300 shadow-xl rounded-md h-96 lg:h-eventWidget overflow-auto'>
            <EventList events={events} />
          </div>
        </div>
        <div className='wp-text mb-4 lg:w-full'>
          <div className="mb-4" dangerouslySetInnerHTML={createHtmlString(eventsContent)} />
        </div>
      </div>
      <Footer socials={socials} />
    </>
  );
};

export const getStaticProps = createCommonStaticProps(async () => {
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
      eventsHeader: websiteCopy(id: "header-events", idType: SLUG) {
        slug
        title
        uri
        website_copy {
          sectionContent
        }
      }
    }
  `

  const response = await client.query({
    query: GET_EVENTS_CONTENT,
  });
  const eventsContent = response?.data?.pages?.nodes[0]?.content;
  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;
  const events = response?.data?.events?.nodes;
  const eventsHeader = response?.data?.eventsHeader?.website_copy?.sectionContent + '';

  return {
    props: {
      eventsContent,
      lcdLogoUrl,
      events,
      eventsHeader,
    },
    revalidate: 20,
  }
})