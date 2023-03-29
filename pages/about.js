import Head from 'next/head.js';
import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";
import { parseMembers } from '../util/parseMembers';
import { parseEntities } from '../util/parseEntities';
import { motion } from 'framer-motion';

import Header from '../components/common/Header/Header';
import PageHeader from '../components/common/PageHeader.js';
import BoardOfDirectorsList from '../components/about/BoardOfDirectorsList.js';
import LeadershipWidget from '../components/about/LeadershipWidget.js';
import LogoCloud from '../components/about/LogoCloud.js';
import Footer from '../components/common/Footer.js';

export default function About({ members, affiliateEntities, lcdLogoUrl }) {
  const { executiveDirector, operationsManager, execCommittee, boardOfDirectors } = parseMembers(members);
  const { memberEntities, affiliateOrganizations, lawSchools } = parseEntities(affiliateEntities);

  return (
    <>
      <Head>
        <title>About - Lawyers Collaborative for Diversity (LCD)</title>
        <meta name="description" content="Learn about Lawyers Collaborative for Diversity's mission and people." />
      </Head>
      <Header lcdLogoUrl={lcdLogoUrl} />
      <PageHeader
        title={'Our Mission'} 
        subtitle={'To make Connecticut and Western Massachusetts prime locations for all attorneys, regardless of background, to practice law.'} 
        headerBackgroundImageClass={'bg-about'}
        subtitleSize='text-3xl lg:text-5xl'
        maxWidth={'lg:max-w-4xl'}
      />
      <div className= "flex flex-wrap flex-row m-auto content-center bg-gray-400/5">
        <div className="w-full max-w-7xl px-6 mx-auto py-24 sm:py-36">
          <div className="text-xl sm:text-3xl text-gray-400 font-semibold leading-loose mb-2">Our Story</div>
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1, transition: { duration: 1.0 } }}
            viewport={{ once: true }}
            className="text-3xl lg:text-5xl text-black font-bold leading-snug pb-8 sm:pb-16"
          >
            LCD began in 2003 as The Connecticut Lawyers Group, in response to the need to advance diversity in Connecticut’s legal profession.
          </motion.div>
          <hr className='h-1 bg-black rounded-md' />
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 pt-12 sm:pt-20 pb-12'>
            <motion.div 
              initial={{ opacity: 0.2, x: -100 }} 
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img className='rounded-md my-auto w-full h-auto object-cover shadow-lg' src='leadership.jpg' />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1, transition: { duration: 1.0 } }}
              viewport={{ once: true }}
              className='flex justify-center align-center flex-col leading-relaxed my-auto text-black sm:mx-12 h-full'
            >
              <div className='text-xl sm:text-2xl lg:text-4xl font-bold'>
                Today, we continue to support our members’ efforts to identify, recruit, and retain attorneys of color.
              </div>
              <div className='text-md sm:text-lg pt-4 text-gray-600'>
                As the meaning of diversity has broadened, so has our charge. Increasing recruitment, retention, and promotion of a diverse population of attorneys must be cemented as not just good social policy, but as a necessary practice.
              </div>
            </motion.div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 pt-0 sm:pt-12'>
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1, transition: { duration: 1.0 } }}
              viewport={{ once: true }}
              className='order-last sm:order-first flex justify-center align-center flex-col leading-relaxed my-auto text-black sm:mx-12 h-full'
            >
              <div className='text-xl sm:text-2xl lg:text-4xl font-bold'>
                The students and professionals that have participated in our programs over the years have gone on to have very successful careers.</div>
              <div className='text-md sm:text-lg pt-4 text-gray-600'>
                Whether they are practicing at a law firm, within a corporation, or for a government agency, our program participants credited LCD’s programs with helping to advance their careers. We will continue to champion the development of future lawyers from diverse backgrounds and support our member organizations in creating environments that are authentically inclusive.
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0.2, x: 100 }} 
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img className='order-first sm:order-last rounded-md my-auto w-full h-auto object-cover shadow-lg' src='students.webp' />
            </motion.div>
          </div>
        </div>
        <LeadershipWidget 
          executiveDirector={executiveDirector} 
          operationsManager={operationsManager}
          execCommittee={execCommittee}
        />
        <BoardOfDirectorsList members={boardOfDirectors} />
        <div className='mx-auto py-16'>
          <LogoCloud sectionName={'Members'} entities={memberEntities} />
          <LogoCloud sectionName={'Affiliate Organizations'} entities={affiliateOrganizations} />
          <LogoCloud sectionName={'Law Schools'} entities={lawSchools} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const GET_ABOUT_INFO = gql`
    query GetAboutInfo {
      members(first: 100) {
        nodes {
          member_details {
            category
            description
            email
            phoneNumber
            company
            headshotImage {
              sourceUrl
            }
            lcdPositionTitle
          }
          title
        }
      }
      affiliateEntities(first: 100, where: {orderby: {field: TITLE, order: ASC}}) {
        nodes {
          affiliate_entities {
            fieldGroupName
            type
            url
            logo {
              sourceUrl
            }
          }
          title
        }
      }
      mediaItemBy(id: "cG9zdDoyMzU=") {
        sourceUrl
      }
    }
  `

  const response = await client.query({
    query: GET_ABOUT_INFO,
  });

  const members = response?.data?.members?.nodes; 
  const affiliateEntities = response?.data?.affiliateEntities?.nodes;
  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;

  return {
    props: {
      members,
      affiliateEntities,
      lcdLogoUrl,
    },
    revalidate: 20,
  }
}