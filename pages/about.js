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
      <PageHeader name={name} headerBackgroundImageClass={headerBackgroundImageClass} />
      <div className= "flex flex-wrap flex-row m-auto content-center bg-gray-400/5">
        <div className="w-full m-4 max-w-6xl px-6 mx-auto">
          <h2 className="text-5xl font-bold pt-12 sm:pt-20 pb-6">Our Story</h2>
          <div className="text-2xl font-normal leading-10">
            LCD began in 2003 as The Connecticut Lawyers Group, in response to the need to advance diversity in Connecticut’s legal profession.
          </div>
          <br />
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 py-12'>
            <img className='rounded-md w-full h-auto object-cover' src='leadership.jpg' />
            <div className='leading-8 text-lg my-auto font-thin sm:px-12'>
              Today, we continue to support our members’ efforts to identify, recruit, and retain attorneys of color. However, as the meaning of diversity has broadened, so has our charge. Increasing recruitment, retention, and promotion of a diverse population of attorneys must be cemented as not just good social policy, but as a necessary practice.
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 pt-12 pb-24'>
            <div className='leading-8 text-lg my-auto font-thin sm:px-12'>
            The students and professionals that have participated in our programs over the years have gone on to have very successful careers. Whether they are practicing at a law firm, within a corporation, or for a government agency, our program participants credited LCD’s programs with helping to advance their careers.

We will continue to champion the development of future lawyers from diverse backgrounds and support our member organizations in creating environments that are authentically inclusive.
            </div>
            <img className='rounded-md w-full h-auto object-cover' src='students.webp' />
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
    context: {
      fetchOptions: {
        next:{ revalidate: 20 },
      },
    },
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
      lcdLogoUrl
    }
  }
}