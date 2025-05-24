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
import { createCommonStaticProps } from '../util/getCommonStaticProps.js';

export default function About({ 
  members, 
  affiliateEntities, 
  lcdLogoUrl, 
  missionStatement,
  ourStory,
  ourStory1a,
  ourStory1b,
  ourStory2a,
  ourStory2b,
  socials,
}) {
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
        subtitle={missionStatement} 
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
            {ourStory}
          </motion.div>
          <hr className='h-1 bg-black rounded-md' />
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 pt-12 sm:pt-20 pb-12'>
            <motion.div 
              initial={{ opacity: 0, x: -15 }} 
              whileInView={{ opacity: 1, x: 0, transition: { duration: 1.0 } }}
              viewport={{ once: true }}
            >
              <img className='rounded-md my-auto w-full h-auto object-cover shadow-lg' src='leadership.jpg' />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1, transition: { duration: 1.0, ease: 'easeOut' } }}
              viewport={{ once: true }}
              className='flex justify-center align-center flex-col leading-relaxed my-auto text-black sm:mx-12 h-full'
            >
              <div className='text-xl sm:text-2xl lg:text-4xl font-bold'>
                {ourStory1a}
              </div>
              <div className='text-md sm:text-lg pt-4 text-gray-600'>
                {ourStory1b}
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
                {ourStory2a}
              </div>
              <div className='text-md sm:text-lg pt-4 text-gray-600'>
                {ourStory2b}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 15 }} 
              whileInView={{ opacity: 1, x: 0, transition: { duration: 1.0, ease: 'easeOut' } }}
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
      <Footer socials={socials} />
    </>
  )
}

export const getStaticProps = createCommonStaticProps(async () => {
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
      missionStatement: websiteCopy(id: "mission-statement", idType: SLUG) {
        slug
        title
        uri
        website_copy {
          sectionContent
        }
      }
      ourStory: websiteCopy(id: "our-story-about-page", idType: SLUG) {
        slug
        title
        uri
        website_copy {
          sectionContent
        }
      }
      ourStory1a: websiteCopy(id: "our-story-continuation-1a-about-page", idType: SLUG) {
        slug
        title
        uri
        website_copy {
          sectionContent
        }
      }
      ourStory1b: websiteCopy(id: "our-story-continuation-1b-about-page", idType: SLUG) {
        slug
        title
        uri
        website_copy {
          sectionContent
        }
      }
      ourStory2a: websiteCopy(id: "our-story-continuation-2a-about-page", idType: SLUG) {
        slug
        title
        uri
        website_copy {
          sectionContent
        }
      }
      ourStory2b: websiteCopy(id: "our-story-continuation-2b-about-page", idType: SLUG) {
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
    query: GET_ABOUT_INFO,
  });

  const members = response?.data?.members?.nodes; 
  const affiliateEntities = response?.data?.affiliateEntities?.nodes;
  const lcdLogoUrl = response?.data?.mediaItemBy?.sourceUrl;
  const missionStatement = response?.data?.missionStatement?.website_copy?.sectionContent + '';
  const ourStory = response?.data?.ourStory?.website_copy?.sectionContent + '';
  const ourStory1a = response?.data?.ourStory1a?.website_copy?.sectionContent + '';
  const ourStory1b = response?.data?.ourStory1b?.website_copy?.sectionContent + '';
  const ourStory2a = response?.data?.ourStory2a?.website_copy?.sectionContent + '';
  const ourStory2b = response?.data?.ourStory2b?.website_copy?.sectionContent + '';

  return {
    props: {
      members,
      affiliateEntities,
      lcdLogoUrl,
      missionStatement,
      ourStory,
      ourStory1a,
      ourStory1b,
      ourStory2a,
      ourStory2b,
    },
    revalidate: 20,
  }
});