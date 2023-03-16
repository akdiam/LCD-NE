import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";
import { parseMembers } from '../util/parseMembers';
import { parseEntities } from '../util/parseEntities';
import Header from '../components/common/Header/Header';
import PageHeader from '../components/common/PageHeader.js';
import BoardOfDirectorsList from '../components/about/BoardOfDirectorsList.js';
import LeadershipWidget from '../components/about/LeadershipWidget.js';
import LogoCloud from '../components/about/LogoCloud.js';
import Footer from '../components/common/Footer.js';

export default function About({ members, affiliateEntities, lcdLogoUrl }) {
  const { executiveDirector, operationsManager, execCommittee, boardOfDirectors } = parseMembers(members);
  const { memberEntities, affiliateOrganizations, lawSchools } = parseEntities(affiliateEntities);

  const name = "Our mission is to make Connecticut and Western Massachusetts prime locations for attorneys of color to practice law.";
  const headerBackgroundImageClass = 'bg-about';

  return (
    <div>
      <Header lcdLogoUrl={lcdLogoUrl} />
      <PageHeader
        title={'Our Mission'} 
        subtitle={'To make Connecticut and Western Massachusetts prime locations for attorneys of color to practice law.'} 
        headerBackgroundImageClass={headerBackgroundImageClass}
        subtitleSize='text-3xl lg:text-7xl'
        maxWidth={'lg:max-w-4xl'}
      />
      <div className= "flex flex-wrap flex-row m-auto content-center bg-gray-400/5">
        <div className="w-full max-w-6xl px-6 mx-auto py-24 sm:py-36">
          <h2 className="text-lg sm:text-3xl text-gray-400 font-normal sm:font-semibold leading-loose mb-4">Our Story</h2>
          <div className="text-4xl lg:text-5xl text-black font-normal leading-snug">
            LCD began in 2003 as The Connecticut Lawyers Group, in response to the need to advance diversity in Connecticut’s legal profession.
          </div>
          <br />
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 pt-12 pb-12'>
            <img className='rounded-md my-auto w-full h-auto object-cover shadow-lg' src='leadership.jpg' />
            <div className='flex justify-center align-center flex-col leading-loose text-xl my-auto font-thin text-black sm:mx-12 h-full border-t-4 border-b-4 border-blue-500 rounded-sm py-4'>
              Today, we continue to support our members’ efforts to identify, recruit, and retain attorneys of color. However, as the meaning of diversity has broadened, so has our charge. Increasing recruitment, retention, and promotion of a diverse population of attorneys must be cemented as not just good social policy, but as a necessary practice.
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 pt-12'>
            <div className='flex justify-center align-center flex-col leading-loose text-lg my-auto font-thin text-black sm:mx-12 h-full border-t-4 border-b-4 border-blue-500 rounded-sm'>
            The students and professionals that have participated in our programs over the years have gone on to have very successful careers. Whether they are practicing at a law firm, within a corporation, or for a government agency, our program participants credited LCD’s programs with helping to advance their careers.

We will continue to champion the development of future lawyers from diverse backgrounds and support our member organizations in creating environments that are authentically inclusive.
            </div>
            <img className='rounded-md my-auto w-full h-auto object-cover shadow-lg' src='students.webp' />
          </div>
        </div>
        <LeadershipWidget 
          executiveDirector={executiveDirector} 
          operationsManager={operationsManager}
          execCommittee={execCommittee}
        />
        <BoardOfDirectorsList members={boardOfDirectors} />
        <LogoCloud sectionName={'Members'} entities={memberEntities} />
      </div>
      <Footer />
    </div>
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

  // Once we get the response back, we need to traverse it to pull out the 
  // data we want to pass into the HomePage
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