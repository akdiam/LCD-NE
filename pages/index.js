import Head from 'next/head.js';
import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";
import { motion } from 'framer-motion';

import Header from '../components/common/Header/Header.js';
import Footer from '../components/common/Footer.js';
import { calcDisplayDate, calcDisplayTimeRange } from '../util/eventsUtil.js';
import YellowButton from '../components/common/YellowButton.js';

const EVENTS_TO_DISPLAY = 3;

export default function Home({ lcdLogoUrl, events }) {
  const eventsForSort = [...events];
  events = eventsForSort.sort((a, b) => {
    const dateA = new Date(a.events.date);
    const dateB = new Date(b.events.date);
    return dateA - dateB;
  });

  let featuredEvents = [];
  for (let i = 0; i < EVENTS_TO_DISPLAY; i++) {
    featuredEvents.push(events[i]);
  }

  return (
    <>
      <Head>
        <title>Lawyers Collaborative for Diversity (LCD) New England</title>
        <meta name="description" content="Helping Connecticut and Western Massachusetts grow a diverse and inclusive legal profession in which all attorneys, regardless of background, are successful at all levels in the private and public sectors." />
      </Head>
      <div className='w-full'>
        <Header lcdLogoUrl={lcdLogoUrl} />
        <div className='h-screen md:h-screen bg-hero bg-cover bg-center bg-top text-center'>
          <motion.div 
            initial={{ opacity: 0, y: -12 }} 
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
            viewport={{ once: true }}
            className='text-white text-3xl lg:text-4xl xl:text-6xl 2xl:text-7xl font-extrabold max-w-7xl mx-auto my-auto pt-96 md:pt-40pcnt lg:pt-30pcnt px-6'
          >
            Dedicated to building a legal community in which all lawyers can thrive and succeed.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -12 }} 
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5, ease: 'easeOut' } }}
            viewport={{ once: true }}
            className='mt-12'
          >
            <YellowButton text='Learn more' href='/about' />
          </motion.div>
        </div>
        <div className='max-w-7xl mx-auto'>
          <div className='px-6 pt-24 pb-12 text-3xl lg:text-5xl font-bold'>Upcoming Events</div>
          <div className='grid lg:grid-cols-3 mb-24'>
            {featuredEvents.map((event, _) => (
              <div className="mb-6 px-6 w-full" key={event.title}>
                <div className="shadow-xl border border-slate-700 rounded-md w-full bg-secondary min-h-64 lg:h-96 text-left px-4 py-3 flex flex-col justify-around">
                  <div className="text-xl lg:text-3xl text-white font-semibold tracking-wide pb-2">
                    {event.title}
                  </div>
                  <div className="">
                    <div className="text-lg lg:text-3xl font-semibold text-yellow-300 pb-2">
                      {calcDisplayDate(event)}
                    </div>
                    <div className="text-sm lg:text-md font-md text-white">
                      {calcDisplayTimeRange(event)}
                    </div>
                    <div className="text-xs lg:text-sm font-md text-gray-400">
                      {event?.events?.eventLocation}
                    </div>
                    <div className="text-xs lg:text-sm font-thin text-gray-400">
                      {event?.events?.eventType === 'Virtual' && event?.events?.eventType}
                    </div>
                    {event?.events?.callToActionLink && 
                    <a href={event?.events?.callToActionLink}>
                      <button className='bg-yellow-300 hover:bg-yellow-400 text-black rounded-md py-2 px-4 mt-3'>
                        {event?.events?.callToActionButtonText}
                      </button>
                    </a>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export async function getStaticProps(){
  const GET_HOME_INFO = gql`
    query GetHomeInfo {
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
    query: GET_HOME_INFO,
  });

  const events = response?.data?.events?.nodes;
  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;

  return {
    props: {
      lcdLogoUrl,
      events,
    },
    revalidate: 20,
  }
}
